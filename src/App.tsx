import { Dashboard } from "./pages/dashboard"; // Ensure this path and export are correct
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserBrain from "./pages/UserBrain";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path={`/share/:hash`} element={<UserBrain />} />
      </Routes>
    </BrowserRouter>
  );
}
