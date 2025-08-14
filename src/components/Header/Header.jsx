import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [showLogout, setShowLogout] = useState(false);

  const handleUserIconClick = () => {
    navigate("/signin");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/signin");
  };

  const handleTrackClick = () => {
    navigate("/track-orders");
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100 h-20">
      {/* Left side - Title */}
      <div className="flex-1 cursor-pointer">
        <h1
          className="text-3xl  font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent hover:from-rose-500 hover:to-pink-700 transition-all duration-300"
          style={{ fontFamily: "Quicksand", fontWeight: 700 }}
          onClick={() => navigate("/")}
        >
          BunnyBloom
        </h1>
      </div>

      {/* Center section - Navigation Items */}
      <div className="flex-2 flex justify-center px-12">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-full px-6 py-3 min-h-12 w-full max-w-md border border-pink-200 flex items-center justify-center gap-8 shadow-sm">
          <button
            className="text-gray-700 hover:text-rose-600 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group"
            style={{ fontFamily: "Quicksand", fontWeight: 600 }}
          >
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="text-gray-700 hover:text-rose-600 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group"
            style={{ fontFamily: "Quicksand", fontWeight: 600 }}
          >
            Best Seller
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={handleTrackClick}
            className="text-gray-700 hover:text-rose-600 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group"
            style={{ fontFamily: "Quicksand", fontWeight: 600 }}
          >
            Track
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </div>

      {/* Right side - Icons */}
      <div className="flex-1 flex justify-end">
        <div className="flex gap-2 items-center">
          {/* Search Icon */}
          <button className="p-3 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110 group">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-700 group-hover:text-rose-600 transition-colors duration-300"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="m21 21-6-6" />
            </svg>
          </button>

          {/* Heart Icon (changed from star) */}
          <button className="p-3 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110 group">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-700 group-hover:text-rose-600 transition-colors duration-300"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <button
            onClick={handleCartClick}
            className="p-3 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110 group relative"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-700 group-hover:text-rose-600 transition-colors duration-300"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cart.totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {cart.totalQuantity}
              </span>
            )}
          </button>

          {/* User Section - Show greeting if logged in, otherwise show user icon */}
          {userData ? (
            <div className="relative">
              <div className="flex items-center">
                <span
                  onClick={() => setShowLogout(!showLogout)}
                  className="text-gray-700 font-semibold px-3 py-2 rounded-full bg-pink-50 border border-pink-200 cursor-pointer hover:bg-pink-100 transition-all duration-300"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  {/* Hello{" "} */}
                  {"🐰 " + userData?.user?.firstName || "User"}
                </span>
              </div>

              {/* Logout Button - appears on click */}
              {showLogout && (
                <div className="absolute top-full right-0 mt-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg shadow-lg hover:bg-red-50 hover:border-red-300 transition-all duration-300 font-semibold text-sm whitespace-nowrap"
                    style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleUserIconClick}
              className="p-3 rounded-full hover:bg-pink-50 transition-all duration-300 hover:scale-110 group"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-gray-700 group-hover:text-rose-600 transition-colors duration-300"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
