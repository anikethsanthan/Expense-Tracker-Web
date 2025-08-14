import React, { useState } from "react";
import Header from "../components/Header/Header";
import usePostQuery from "../hooks/postQuery.hook";
import { apiUrls } from "../apis/index";

const AddExpensePage = ({ onBack, onSuccess }) => {
  const { postQuery, loading } = usePostQuery();
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    category: "food",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "utilities", label: "Utilities" },
    { value: "other", label: "Other" },
  ];

  const currencies = [{ value: "USD", label: "USD ($)" }];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount is required and must be greater than 0";
    }

    if (!formData.currency) {
      newErrors.currency = "Currency is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transactionData = {
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      category: formData.category,
      description: formData.description.trim() || "",
    };

    await postQuery({
      url: apiUrls.expenses.addexpenses,
      data: transactionData,
      onSuccess: (response) => {
        console.log("Transaction added successfully:", response);
        // Reset form
        setFormData({
          amount: "",
          currency: "USD",
          category: "food",
          description: "",
        });
        setErrors({});

        if (onSuccess) {
          onSuccess();
        }

        // Show success message or navigate back
        alert("Expense added successfully!");
        if (onBack) {
          onBack();
        }
      },
      onFail: (error) => {
        console.error("Failed to add transaction:", error);
        alert("Failed to add expense. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "Quicksand", fontWeight: 700 }}
              >
                Add New Expense
              </h1>
              <p
                className="text-gray-600"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                Track your spending by adding a new expense
              </p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Dashboard</span>
              </button>
            )}
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Field */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Amount *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                />
                {errors.amount && (
                  <p
                    className="text-red-500 text-sm mt-1"
                    style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                  >
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* Currency Field */}
              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Currency *
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.currency ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <p
                    className="text-red-500 text-sm mt-1"
                    style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                  >
                    {errors.currency}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p
                    className="text-red-500 text-sm mt-1"
                    style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                  >
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter description (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-sky-600 hover:shadow-lg hover:scale-105"
                  }`}
                  style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    "Add Expense"
                  )}
                </button>

                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    style={{ fontFamily: "Quicksand", fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
