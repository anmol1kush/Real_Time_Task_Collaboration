import { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../auth/authContext";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await axios.post("/auth/login", { email, password });
    login(res.data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <Label>Email</Label>
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />

      <Label className="mt-4">Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={submit} className="w-full mt-6 bg-blue-600 h-10 rounded">
        Login
      </button>
    </div>
  );
}
