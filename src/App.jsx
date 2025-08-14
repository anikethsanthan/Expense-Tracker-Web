import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/SignInPage";
import { ToastContainer } from "./components/Toast/CustomToast";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
