import React from "react";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowText = ({
  children,
  className = "",
  glowColor = "#AC6CFF",
}: GlowTextProps) => {
  const glowStyle = {
    color: "#fff",
    textShadow: `
      0 0 5px #fff,
      0 0 5px ${glowColor},
      0 0 5px ${glowColor}
    `,
  };

  return (
    <span
      className={`font-orbitron tracking-wider ${className}`}
      style={glowStyle}
    >
      {children}
    </span>
  );
};

export default GlowText;
