export const apiBaseUrl = "http://localhost:7777";
// export const apiBaseUrl = "https://bunnybloom-backend.vercel.app";

export const apiUrls = {
  auth: {
    login: "/expense-tracker/user/login",
  },
  expenses: {
    getexpenses: "/expense-tracker/transaction/get-transaction",
    addexpenses: "/expense-tracker/transaction/store-transaction",
  },
};
