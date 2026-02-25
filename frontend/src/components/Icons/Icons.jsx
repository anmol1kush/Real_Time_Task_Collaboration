import React from "react";

export const MoonIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13
      8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66
      c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11
      a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99
      10 10 0 002.89.55c.16.01.32.02.48.02
      a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a1 1 0 01-1-.96V22a1 1 0 012 0 1 1 0 01-1 .96z" />
    </g>
  </svg>
);