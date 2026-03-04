import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Nav/Navbar";

export default function Login() {
  // SVG grid pattern
  const gridPattern = "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')";

  return (
    <>
      <Navbar />

      <div
        className="min-h-[calc(100vh-64px)] w-full bg-black relative flex items-center justify-center font-mono"
        style={{ backgroundImage: gridPattern }}
      >
        <div className="relative z-10 w-full px-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
