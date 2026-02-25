import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function HoverBorderGradient({
  children,
  as: Tag = "button",
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

  const rotate = () => {
    const index = directions.indexOf(direction);
    const next = clockwise
      ? (index - 1 + directions.length) % directions.length
      : (index + 1) % directions.length;
    setDirection(directions[next]);
  };

  useEffect(() => {
    if (!hovered) {
      const i = setInterval(rotate, duration * 1000);
      return () => clearInterval(i);
    }
  }, [hovered]);

  const map = {
    TOP: "radial-gradient(20% 50% at 50% 0%, white, transparent)",
    LEFT: "radial-gradient(20% 50% at 0% 50%, white, transparent)",
    BOTTOM: "radial-gradient(20% 50% at 50% 100%, white, transparent)",
    RIGHT: "radial-gradient(20% 50% at 100% 50%, white, transparent)",
  };

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative rounded-full p-px overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("relative z-10 bg-black text-white px-4 py-2 rounded-full", className)}>
        {children}
      </div>

      <motion.div
        className="absolute inset-0"
        style={{ filter: "blur(2px)" }}
        animate={{ background: hovered ? map[direction] : map[direction] }}
        transition={{ duration }}
      />
    </Tag>
  );
}