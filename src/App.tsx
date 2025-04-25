import { Dashboard } from "./pages/dashboard"; // Ensure this path and export are correct
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserBrain from "./pages/UserBrain";
import { ToastContainer } from "react-toastify";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share/:hash" element={<UserBrain />} />
      </Routes>
      <ToastContainer
        toastStyle={{
          backgroundColor: "white",
          color: "black",
          fontSize: "14px",
          borderRadius: "8px",
        }}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
