import React from "react";

export const RTCTLogo = ({ size = 30 }) => (
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 32 32"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
    />
  </svg>
);

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5
      C21 6.25329 16.7467 2 11.5 2
      C6.25329 2 2 6.25329 2 11.5
      C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
  </svg>
);