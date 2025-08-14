import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-sky-600 rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h1
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent"
              style={{ fontFamily: "Quicksand", fontWeight: 700 }}
            >
              Expense Tracker
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              style={{ fontFamily: "Quicksand", fontWeight: 500 }}
            >
              Dashboard
            </button>
            <button
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              style={{ fontFamily: "Quicksand", fontWeight: 500 }}
            >
              Add Expense
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-sky-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              style={{ fontFamily: "Quicksand", fontWeight: 600 }}
            >
              Profile
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
