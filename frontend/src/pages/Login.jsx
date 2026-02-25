import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Nav/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />

      <div className="h-[calc(100vh-64px)] w-full bg-black relative flex items-center justify-center dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        {/* Background mask */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black 
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        ></div>

        <LoginForm />
      </div>
    </>
  );
}
