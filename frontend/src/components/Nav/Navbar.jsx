import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RTCTLogo } from "../Logos/Logos";
import { useAuth } from "../../auth/authContext";

export default function NavbarComponent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full h-16 bg-black border-b border-zinc-900 flex items-center justify-between px-6 lg:px-10 font-mono sticky top-0 z-50">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2 text-white">
        <RTCTLogo />
        <span className="font-bold text-lg hidden sm:block tracking-widest">RTCT</span>
      </Link>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
          Dashboard
        </Link>
        <Link to="/chat" className="text-sm text-gray-300 hover:text-white transition-colors">
          Community
        </Link>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <span className="text-xs text-zinc-500 truncate max-w-[140px]">{user.email}</span>
            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-gray-300 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black border-b border-zinc-800 flex flex-col gap-4 p-6 md:hidden z-50">
          <Link to="/dashboard" className="text-sm text-gray-300" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/chat" className="text-sm text-gray-300" onClick={() => setMenuOpen(false)}>Community</Link>
          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm text-red-400 text-left">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-300" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="text-sm text-white bg-indigo-600 px-4 py-1.5 rounded-full w-fit" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}