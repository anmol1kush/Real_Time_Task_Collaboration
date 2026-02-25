import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RTCTLogo } from "../Logos/Logos";

export default function Footer() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  const allowedPaths = ["/"];

  useEffect(() => {
    if (allowedPaths.includes(location.pathname)) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [location.pathname]);

  const scrollToFunc = (scrollToId) => {
    const element = document.getElementById(scrollToId);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className={`w-full ${hidden ? "hidden" : ""}`}>
      <div className="px-[6%]">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          {/* Logo section */}
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <div className="flex justify-center lg:justify-start items-center gap-2">
              <RTCTLogo />
              <h1 className="text-xl font-bold">RTCT</h1>
            </div>
            <p className="py-8 text-sm text-[--darkText2] lg:max-w-xs text-center lg:text-left">
              Trusted by top developers all over the world. Have any query?
            </p>
            <div className="py-2.5 px-5 h-9 w-fit bg-[--darkBtn] rounded-full shadow-sm text-xs text-[darkText1] mx-auto lg:mx-0 hover:bg-indigo-700 transition">
              Contact us
            </div>
          </div>

          {/* RTCT links */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-[--darkText1] font-medium mb-7">RTCT</h4>
            <ul className="text-sm">
              <li className="mb-6 cursor-pointer" onClick={() => scrollToFunc("scroll-to-home")}>
                Home
              </li>
              <li className="mb-6 cursor-pointer" onClick={() => scrollToFunc("scroll-to-features")}>
                Features
              </li>
              <li className="cursor-pointer" onClick={() => scrollToFunc("scroll-to-feedback")}>
                Feedback
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-[--darkText1] font-medium mb-7">Products</h4>
            <ul className="text-sm">
              <li className="mb-6">Collaborative coding</li>
              <li className="mb-6">Task Management</li>
              <li>Progress Tracking</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-[--darkText1] font-medium mb-7">Resources</h4>
            <ul className="text-sm">
              <li className="mb-6">FAQs</li>
              <li className="mb-6">Quick Start</li>
              <li>Documentation</li>
            </ul>
          </div>

          {/* Blogs */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-[--darkText1] font-medium mb-7">Blogs</h4>
            <ul className="text-sm">
              <li className="mb-6">Tips & Tricks</li>
              <li className="mb-6">Latest Updates</li>
              <li>Events</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <a
              href="https://www.linkedin.com/in/maanassehgal"
              target="_blank"
              rel="noreferrer"
              className="text-sm underline"
            >
              © RTCT 2024, All rights reserved.
            </a>

            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/maanassehgal/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-indigo-600"
              >
                in
              </a>

              <a
                href="https://www.instagram.com/maanas1605"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-indigo-600"
              >
                ig
              </a>

              <a
                href="https://www.youtube.com/channel/UClkCw-5GSwAxVIDgYUDqR3A"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-indigo-600"
              >
                yt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}