import { useState } from "react";
import axios from "../utils/axios";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await axios.post("/auth/register", { email, password });
    alert("Account created. Login now.");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>

      <Label>Email</Label>
      <Input onChange={(e) => setEmail(e.target.value)} />

      <Label className="mt-4">Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button
        onClick={signup}
        className="w-full mt-6 bg-green-600 h-10 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}