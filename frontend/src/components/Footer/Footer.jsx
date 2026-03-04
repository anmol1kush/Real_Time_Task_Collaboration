import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RTCTLogo } from "../Logos/Logos";

export default function Footer() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHidden(location.pathname !== "/");
  }, [location.pathname]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className={`w-full bg-black border-t border-zinc-900 font-mono ${hidden ? "hidden" : ""}`}>
      <div className="px-[6%] py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 gap-y-10">

          {/* Logo section */}
          <div className="col-span-full lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <RTCTLogo />
              <h1 className="text-white font-bold text-lg tracking-widest">RTCT</h1>
            </div>
            <p className="text-sm text-zinc-400 lg:max-w-xs leading-relaxed mb-6">
              Trusted by top developers all over the world. Have any query?
            </p>
            <button className="py-2 px-5 rounded-full border border-indigo-600 text-indigo-400 text-xs hover:bg-indigo-600 hover:text-white transition-colors">
              Contact us
            </button>
          </div>

          {/* RTCT links */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm text-white font-bold mb-5 tracking-widest">RTCT</h4>
            <ul className="text-sm text-zinc-400 space-y-4">
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollTo("scroll-to-home")}>Home</li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollTo("scroll-to-features")}>Features</li>
              <li className="cursor-pointer hover:text-white transition-colors" onClick={() => scrollTo("scroll-to-feedback")}>Feedback</li>
            </ul>
          </div>

          {/* Products */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm text-white font-bold mb-5 tracking-widest">Products</h4>
            <ul className="text-sm text-zinc-400 space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">Collaborative coding</li>
              <li className="hover:text-white transition-colors cursor-pointer">Task Management</li>
              <li className="hover:text-white transition-colors cursor-pointer">Progress Tracking</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm text-white font-bold mb-5 tracking-widest">Resources</h4>
            <ul className="text-sm text-zinc-400 space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">FAQs</li>
              <li className="hover:text-white transition-colors cursor-pointer">Quick Start</li>
              <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
            </ul>
          </div>

          {/* Blogs */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-sm text-white font-bold mb-5 tracking-widest">Blogs</h4>
            <ul className="text-sm text-zinc-400 space-y-4">
              <li className="hover:text-white transition-colors cursor-pointer">Tips &amp; Tricks</li>
              <li className="hover:text-white transition-colors cursor-pointer">Latest Updates</li>
              <li className="hover:text-white transition-colors cursor-pointer">Events</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-4">
          <a
            href="https://www.linkedin.com/in/maanassehgal"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-500 hover:text-white underline transition-colors"
          >
            @RTCT 2024, All rights reserved.
          </a>

          <div className="flex space-x-3">
            <a href="https://www.linkedin.com/in/maanassehgal/" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-colors text-xs">
              in
            </a>
            <a href="https://www.instagram.com/maanas1605" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-colors text-xs">
              ig
            </a>
            <a href="https://www.youtube.com/channel/UClkCw-5GSwAxVIDgYUDqR3A" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-colors text-xs">
              yt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}