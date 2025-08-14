import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import usePostQuery from "../hooks/postQuery.hook";
import { apiUrls } from "../apis/index";
import CustomToast from "../components/Toast/CustomToast";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { productData, quantity, selectedSize, redirectTo } =
    location.state || {};
  const { postQuery } = usePostQuery(); // Remove loading from here
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false); // Separate loading for email verification
  const [otpLoading, setOtpLoading] = useState(false); // Separate loading for OTP verification
  const [submitLoading, setSubmitLoading] = useState(false); // Separate loading for form submission
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerifyEmail = () => {
    console.log("handleVerifyEmail called");
    if (!formData.email) {
      console.log("No email, showing error toast");
      CustomToast({ type: "error", content: "Please enter your email first!" });
      return;
    }

    setEmailLoading(true);
    setShowOtpInput(true);

    postQuery({
      url: apiUrls.auth.registerEmail,
      postData: {
        emailId: formData.email,
      },
      onSuccess: (res) => {
        console.log("Sign Up successful:", res);
        setIsEmailVerified(true);
        console.log("Showing success toast");
        CustomToast({ type: "success", content: "OTP sent to your email!" });
        setEmailLoading(false);
      },
      onFail: () => {
        console.log("Showing error toast");
        CustomToast({ type: "error", content: "Failed to send OTP!" });
        setEmailLoading(false);
      },
    });
  };

  const handleVerifyOtp = () => {
    if (!otpValue) {
      CustomToast({ type: "error", content: "Please enter the OTP!" });
      return;
    }

    setOtpLoading(true);

    postQuery({
      url: apiUrls.auth.verifyEmail,
      postData: {
        emailId: formData.email,
        otp: Number(otpValue),
      },
      onSuccess: () => {
        setIsOtpVerified(true);
        CustomToast({ type: "success", content: "OTP verified successfully!" });
        setOtpLoading(false);
      },
      onFail: (err) => {
        CustomToast({
          type: "error",
          content: err.message || "Failed to verify OTP!",
        });
        setOtpLoading(false);
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        CustomToast({ type: "error", content: "Passwords do not match!" });
        setSubmitLoading(false);
        return;
      }
      // Sign Up logic
      postQuery({
        url: apiUrls.auth.signup,
        postData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.email,
          password: formData.password,
        },
        onSuccess: (res) => {
          console.log("Sign Up successful:", res);
          dispatch(addUser(res));
          CustomToast({ type: "success", content: "Sign Up successful!" });

          // Navigate back to product detail page if came from there
          if (productData) {
            navigate("/product", {
              state: {
                productData: productData,
                quantity: quantity,
                selectedSize: selectedSize,
              },
            });
          } else if (redirectTo) {
            navigate(redirectTo);
          } else {
            navigate("/");
          }
          setSubmitLoading(false);
        },
        onFail: () => {
          CustomToast({ type: "error", content: "Failed to login" });
          setSubmitLoading(false);
        },
      });
    } else {
      // Login logic
      postQuery({
        url: apiUrls.auth.login,
        postData: {
          emailId: formData.email,
          password: formData.password,
        },
        onSuccess: (res) => {
          console.log("Login successful:", res);
          dispatch(addUser(res));
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          CustomToast({ type: "success", content: "Login successful!" });

          // Navigate back to product detail page if came from there
          if (productData) {
            navigate("/product", {
              state: {
                productData: productData,
                quantity: quantity,
                selectedSize: selectedSize,
              },
            });
          } else if (redirectTo) {
            navigate(redirectTo);
          } else {
            navigate("/");
          }
          setSubmitLoading(false);
        },
        onFail: () => {
          CustomToast({ type: "error", content: "Failed to login" });
          setSubmitLoading(false);
        },
      });
    }
  };

  const handleGoogleAuth = () => {
    // Add Google authentication logic here
    console.log(`Google ${isSignUp ? "sign up" : "sign in"} clicked`);
    // You can integrate with Google OAuth API here
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form data when switching modes
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    // Reset verification states
    setIsEmailVerified(false);
    setIsOtpVerified(false);
    setShowOtpInput(false);
    setOtpValue("");
    // Reset password visibility states
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: "Quicksand", fontWeight: 700 }}
            >
              BunnyBloom
            </h1>
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "Quicksand", fontWeight: 500 }}
            >
              {isSignUp
                ? "Create your account to get started"
                : "Welcome back! Sign in to your account"}
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields - Only show for Sign Up */}
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-all duration-300 bg-pink-50/50"
                      placeholder="First name"
                      required
                      style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-all duration-300 bg-pink-50/50"
                      placeholder="Last name"
                      required
                      style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isEmailVerified}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${"border-pink-100 focus:border-rose-400 bg-pink-50/50"}`}
                  placeholder="Enter your email"
                  required
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                />

                {/* Verify Email Text - Only show for Sign Up */}
                {isSignUp && (
                  <div className="mt-2 text-right">
                    <span
                      onClick={!emailLoading ? handleVerifyEmail : undefined}
                      className={`text-xs font-semibold transition-colors duration-300 cursor-pointer ${
                        emailLoading
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-rose-600 hover:text-rose-700"
                      }`}
                      style={{ fontFamily: "Quicksand", fontWeight: 800 }}
                    >
                      {emailLoading ? "Sending OTP..." : "Verify Email"}
                    </span>
                  </div>
                )}

                {/* OTP Input - Only visible when showOtpInput is true and isSignUp */}
                {isSignUp && showOtpInput && (
                  <div className="mt-3">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      disabled={isOtpVerified}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${"border-pink-100 focus:border-rose-400 bg-pink-50/50"}`}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                    />
                    <div className="mt-2 text-right">
                      {isOtpVerified ? (
                        <span
                          className="text-xs text-green-600 font-semibold"
                          style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                        >
                          ✓ OTP Verified
                        </span>
                      ) : (
                        <span
                          onClick={!otpLoading ? handleVerifyOtp : undefined}
                          className={`text-xs font-semibold transition-colors duration-300 cursor-pointer ${
                            otpLoading
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-rose-600 hover:text-rose-700"
                          }`}
                          style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                        >
                          {otpLoading ? "Verifying..." : "Verify OTP"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-all duration-300 bg-pink-50/50"
                    placeholder={
                      isSignUp ? "Create a password" : "Enter your password"
                    }
                    required
                    style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-rose-600 transition-colors duration-200 cursor-pointer focus:outline-none"
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input - Only show for Sign Up */}
              {isSignUp && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-pink-100 focus:border-rose-400 focus:outline-none transition-all duration-300 bg-pink-50/50"
                      placeholder="Confirm your password"
                      required
                      style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-rose-600 transition-colors duration-200 cursor-pointer focus:outline-none"
                      tabIndex="-1"
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password Link - Only show for Sign In */}
              {!isSignUp && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-300 cursor-pointer focus:outline-none"
                    style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitLoading || (isSignUp && !isOtpVerified)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${
                  submitLoading || (isSignUp && !isOtpVerified)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-400 to-pink-600 text-white hover:from-rose-500 hover:to-pink-700 hover:scale-105"
                }`}
                style={{ fontFamily: "Quicksand", fontWeight: 600 }}
              >
                {submitLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>{isSignUp ? "Create Account" : "Sign In"}</>
                )}
              </button>

              {/* Email Verification Reminder - Only show for Sign Up when OTP is not verified */}
              {isSignUp && !isOtpVerified && (
                <div className="mt-3 text-center">
                  <p
                    className="text-sm text-rose-600"
                    style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                  >
                    Verify your email first to register
                  </p>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
              <span
                className="px-4 text-gray-500 text-sm"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
            </div>

            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white border-2 border-pink-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-pink-50 hover:border-rose-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-md cursor-pointer focus:outline-none"
              style={{ fontFamily: "Quicksand", fontWeight: 600 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Toggle Mode Link */}
            <div className="mt-6 text-center">
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-300 cursor-pointer focus:outline-none"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-rose-600 text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              style={{ fontFamily: "Quicksand", fontWeight: 600 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
