import "../assets/styles/login-form.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signin() {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      }
    );
    console.log(response);
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    setLoading(false);
    navigate("/");
    toast.success("Login successfull");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <form className="form">
        <div className="title">
          Welcome,
          <br />
          <span>sign in to continue</span>
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
        <button className="button-confirm" onClick={signin} disabled={loading}>
          Sign In →
        </button>
      </form>
      <div className="text-center mt-2 ">
        <span className="text-gray-500">Don't have an account?</span>
        <a href="/signup" className="text-blue-500 ml-2">
          Sign Up
        </a>
      </div>
    </div>
  );
};
