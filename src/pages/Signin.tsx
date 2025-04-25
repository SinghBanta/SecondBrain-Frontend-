import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
      {
        username,
        password,
      }
    );
    // console.log(response);
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/");
    toast.success("Logged in successfully!");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <h1 className="flex justify-center items-center text-2xl mb-3">
          Sign In
        </h1>
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="Signin"
            fullWidth={true}
          />
        </div>

        <div className="text-blue-500 text-center block mt-4">
          <span className="text-black mr-1">Don't have an account?</span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}
