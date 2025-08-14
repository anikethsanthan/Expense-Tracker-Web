import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "antd/dist/reset.css"; // Ant Design CSS
import "./index.css";
import App from "./App.jsx";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
