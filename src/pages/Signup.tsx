import "../assets/styles/login-form.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    setLoading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
      }
    );
    console.log(response);
    setLoading(false);
    navigate("/signin");

    toast.success("Account created successfully!");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <form className="form">
        <div className="title">
          Welcome,
          <br />
          <span>sign up to continue</span>
        </div>
        <input
          ref={usernameRef}
          className="input"
          name="username"
          placeholder="Username"
          type="text"
        />
        <input
          ref={passwordRef}
          className="input"
          name="password"
          placeholder="Password"
          type="password"
        />
        <button className="button-confirm" onClick={signup} disabled={loading}>
          Sign Up →
        </button>
      </form>
      <div className="text-center mt-2">
        <span className="text-gray-500">Already have an account? </span>
        <a className="text-blue-500 ml-2" href="/signin">
          Sign in
        </a>
      </div>
    </div>
  );
};
