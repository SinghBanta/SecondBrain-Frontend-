import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`,
      {
        username,
        password,
      }
    );
    console.log(response);
    navigate("/signin");
    toast.success("Account created successfully!");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <h1 className="flex justify-center items-center text-2xl mb-3">
          Sign Up
        </h1>
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>

        <div className="text-blue-500 text-center block mt-4">
          <span className="text-black mr-1">Already have an account? </span>
          <a href="/signin">Sign in</a>
        </div>
      </div>
    </div>
  );
}
