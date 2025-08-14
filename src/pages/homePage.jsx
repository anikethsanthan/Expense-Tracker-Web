import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "../components/Header/Header";
import AddExpensePage from "./AddExpensePage";
import useGetQuery from "../hooks/getQuery.hook";
import { apiUrls } from "../apis/index";

const HomePage = () => {
  const { getQuery, loading } = useGetQuery();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentMonthStats, setCurrentMonthStats] = useState({});
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fetchTransactions = useCallback(
    async (page = 1, category = "all") => {
      const categoryParam = category !== "all" ? `&category=${category}` : "";
      await getQuery({
        url: `${apiUrls.expenses.getexpenses}?page=${page}&limit=10${categoryParam}`,
        onSuccess: (response) => {
          if (response) {
            setTransactions(response.data.transactions);
            setPagination(response.data.pagination);
            setCurrentMonthStats({
              totalTransactions: response.data.currentMonthTransactions,
              totalExpense: response.data.currentMonthTotalExpenseINR,
            });
          }
        },
        onFail: (error) => {
          console.error("Failed to fetch transactions:", error);
        },
      });
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchTransactions(1, selectedCategory);
  }, [fetchTransactions, selectedCategory]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page) => {
    fetchTransactions(page, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    fetchTransactions(1, category);
  };

  const categories = [
    { value: "", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },

    { value: "utilities", label: "Utilities" },
    { value: "others", label: "Others" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryIcon = () => {
    return "";
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: "bg-orange-100 text-orange-800",
      travel: "bg-blue-100 text-blue-800",
      entertainment: "bg-purple-100 text-purple-800",
      shopping: "bg-pink-100 text-pink-800",
      healthcare: "bg-red-100 text-red-800",
      education: "bg-green-100 text-green-800",
      utilities: "bg-yellow-100 text-yellow-800",
      others: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleAddExpenseSuccess = () => {
    // Refresh transactions after adding expense
    fetchTransactions(1, selectedCategory);
    setShowAddExpense(false);
  };

  if (showAddExpense) {
    return (
      <AddExpensePage
        onBack={() => setShowAddExpense(false)}
        onSuccess={handleAddExpenseSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2"
            style={{ fontFamily: "Quicksand", fontWeight: 700 }}
          >
            Welcome to Your Dashboard
          </h1>
          <p
            className="text-gray-600 text-lg"
            style={{ fontFamily: "Quicksand", fontWeight: 500 }}
          >
            Track and manage your expenses efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm text-gray-600 mb-1"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  This Month's Expenses
                </p>
                <p
                  className="text-2xl font-bold text-blue-600"
                  style={{ fontFamily: "Quicksand", fontWeight: 700 }}
                >
                  {formatCurrency(currentMonthStats.totalExpense || 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-sky-600 rounded-full">
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
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm text-gray-600 mb-1"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  Total Transactions
                </p>
                <p
                  className="text-2xl font-bold text-blue-600"
                  style={{ fontFamily: "Quicksand", fontWeight: 700 }}
                >
                  {currentMonthStats.totalTransactions || 0}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm text-gray-600 mb-1"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  Average per Transaction
                </p>
                <p
                  className="text-2xl font-bold text-blue-600"
                  style={{ fontFamily: "Quicksand", fontWeight: 700 }}
                >
                  {formatCurrency(
                    currentMonthStats.totalTransactions > 0
                      ? currentMonthStats.totalExpense /
                          currentMonthStats.totalTransactions
                      : 0
                  )}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-gray-800"
                style={{ fontFamily: "Quicksand", fontWeight: 700 }}
              >
                Recent Transactions
              </h2>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-600"
                  >
                    <path d="M3 6h18l-2 9H5L3 6zM3 6l-.5-2H1" />
                    <circle cx="9" cy="19" r="1" />
                    <circle cx="20" cy="19" r="1" />
                  </svg>
                  <span className="text-blue-700">
                    {
                      categories.find((cat) => cat.value === selectedCategory)
                        ?.label
                    }
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-blue-600 transition-transform duration-200 ${
                      showCategoryDropdown ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>

                {showCategoryDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-200 ${
                            selectedCategory === category.value
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700"
                          }`}
                          style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3
                className="text-xl font-semibold text-gray-600 mb-2"
                style={{ fontFamily: "Quicksand", fontWeight: 600 }}
              >
                No transactions found
              </h3>
              <p
                className="text-gray-500"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                Start tracking your expenses by adding your first transaction!
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-blue-50">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="p-6 hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">
                            {getCategoryIcon(transaction.category)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p
                              className="text-lg font-semibold text-gray-900 truncate"
                              style={{
                                fontFamily: "Quicksand",
                                fontWeight: 600,
                              }}
                            >
                              {transaction.description
                                ? transaction.description
                                : "No description"}
                            </p>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                                transaction.category
                              )}`}
                              style={{
                                fontFamily: "Quicksand",
                                fontWeight: 500,
                              }}
                            >
                              {transaction.category}
                            </span>
                          </div>
                          <p
                            className="text-sm text-gray-500"
                            style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                          >
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className="text-lg font-bold text-red-600"
                          style={{ fontFamily: "Quicksand", fontWeight: 700 }}
                        >
                          -{formatCurrency(transaction.INRconvertedAmount)}
                        </p>
                        {transaction.currency !== "INR" && (
                          <p
                            className="text-sm text-gray-500"
                            style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                          >
                            {transaction.amount} {transaction.currency}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p
                        className="text-sm text-gray-700"
                        style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                      >
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </p>
                      <span
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                      >
                        ({pagination.totalTransactions} total transactions)
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPrevPage}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          pagination.hasPrevPage
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          pagination.hasNextPage
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-gradient-to-r from-blue-500 to-sky-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
