import React, { useState, useEffect } from "react";
import "./Toast.css";

let showToastFunction = null;

// Custom Toast Component
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToastFunction = (toast) => {
      const id = Date.now();
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration (3 seconds for better readability)
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastStyles = (type) => {
    const baseStyles =
      "px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] max-w-[400px] transform transition-all duration-500 ease-out backdrop-blur-sm border animate-slideInRight";

    switch (type) {
      case "success":
        return `${baseStyles} bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-300/30 shadow-emerald-500/25`;
      case "error":
        return `${baseStyles} bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-300/30 shadow-rose-500/25`;
      case "warning":
        return `${baseStyles} bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300/30 shadow-amber-500/25`;
      case "info":
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-300/30 shadow-blue-500/25`;
      default:
        return `${baseStyles} bg-gradient-to-r from-gray-500 to-slate-500 text-white border-gray-300/30 shadow-gray-500/25`;
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={getToastStyles(toast.type)}
          style={{
            fontFamily: "Quicksand",
            fontWeight: 500,
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex-1">
            <p className="text-sm pt-3 leading-relaxed">{toast.content}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white hover:text-white/80 flex-shrink-0 ml-2"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

// Toast function to call from anywhere
const CustomToast = ({ type = "success", content }) => {
  console.log("CustomToast called with:", { type, content });

  if (showToastFunction) {
    showToastFunction({ type, content });
  } else {
    console.error("Toast container not mounted");
  }
};

export default CustomToast;
