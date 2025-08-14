import { apiUrls } from "../apis";
import CustomToast from "../components/Toast/CustomToast";

const razorpayFunction = async (
  orderId,
  navigate,
  postQuery,
  setIsProcessing,
  user
) => {
  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      // Create script element
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        if (window.Razorpay) {
          resolve(true);
        } else {
          reject(new Error("Razorpay SDK failed to load"));
        }
      };

      script.onerror = () => {
        reject(new Error("Failed to load Razorpay SDK"));
      };

      document.head.appendChild(script);
    });
  };

  postQuery({
    url: apiUrls?.razorpay.createRazorpayOrder,
    postData: { orderId },
    onSuccess: async (res) => {
      try {
        // Load Razorpay script first
        await loadRazorpayScript();

        const options = {
          key: res.key,
          amount: res.amount,
          order_id: res.razorpayOrderId,
          currency: "INR",
          name: "Bunny Bloom",
          description: "Your Bunny Bloom Order",
          image: "https://example.com/your_logo",
          prefill: {
            name: user?.firstName || "Customer",
            email: user?.emailId,
          },
          notes: {
            address: "Bunny Bloom Order",
          },
          theme: {
            color: "#e91e63",
          },
          handler: function (response) {
            console.log("Payment successful:", response);
            setIsProcessing(false);
            CustomToast({
              type: "success",
              content: "Order placed successfully!",
            });
            // Navigate to home or order confirmation page
            navigate("/", { replace: true });
          },
          error: function (error) {
            console.error("Payment failed:", error);
            setIsProcessing(false);
            CustomToast({
              type: "error",
              content: "Payment failed. Please try again.",
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              CustomToast({ type: "info", content: "Payment cancelled" });
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error with Razorpay:", error);
        setIsProcessing(false);
        CustomToast({
          type: "error",
          content: "Payment gateway unavailable. Please try again later.",
        });
      }
    },
    onFail: (error) => {
      console.error("Failed to create Razorpay order:", error);
      setIsProcessing(false);
      CustomToast({ type: "error", content: "Failed to initiate payment" });
    },
  });
};

export default razorpayFunction;
