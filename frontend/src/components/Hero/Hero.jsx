import React from "react";
import { Link } from "react-router-dom";
import { RTCTLogo } from "../Logos/Logos";
import { useAuth } from "../../auth/authContext";

// SVG grid background inline
const gridBg = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/%3E%3C/svg%3E\")",
};

export default function Hero() {
  const { user } = useAuth();

  return (
    <div
      id="scroll-to-home"
      className="min-h-[90vh] bg-black flex items-center justify-center relative overflow-hidden"
      style={gridBg}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 px-[7vw] w-full max-w-7xl mx-auto py-20">
        {/* Left: Text */}
        <div className="flex-1">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight font-mono">
            Collaborate<br />
            seamlessly, create<br />
            effortlessly
          </h1>
          <p className="text-base text-gray-400 mt-6 max-w-md font-mono leading-relaxed">
            Transform collaboration with real-time editing of code, documents,
            and spreadsheets. Enjoy intuitive task management, chat, video
            calls, and secure cloud deployment. Accomplish more, together.
          </p>

          <Link to={user ? "/dashboard" : "/login"} className="inline-block mt-8">
            <button className="px-6 py-3 rounded-full border border-white/30 text-white font-mono text-sm hover:bg-white/5 transition-colors">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right: Logo */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <RTCTLogo size="400" />
        </div>
      </div>
    </div>
  );
}