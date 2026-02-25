import React from "react";
import { Link } from "react-router-dom";

import { RTCTLogo } from "../Logos/Logos";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useAuth } from "../../auth/authContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <div
      id="scroll-to-home"
      className="h-[90vh] bg-black flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row gap-10 px-[7vw]">
        <div>
          <h1 className="text-6xl font-bold text-white">
            Collaborate seamlessly, create effortlessly
          </h1>
          <p className="text-xl text-gray-300 mt-4">
            Real-time code, docs, tasks, chat, and video calls.
          </p>

          <Link to={user ? "/dashboard" : "/login"}>
            <HoverBorderGradient>Get Started</HoverBorderGradient>
          </Link>
        </div>

        <div className="hidden lg:block">
          <RTCTLogo size="400" />
        </div>
      </div>
    </div>
  );
}