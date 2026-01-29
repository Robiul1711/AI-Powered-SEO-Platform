import React, { useState, useEffect } from "react";

const GridBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      setMousePosition({
        x,
        y,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      // UPDATED:
      // 1. Added text-[#f2f3f5] for light mode grid color
      // 2. Added dark:text-slate-800 for dark mode grid color
      className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-300 ease-out text-Primary/10"
      style={{
        // UPDATED: Replaced hex code with 'currentColor' to inherit from the className above
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        animation: "moveGrid 20s linear infinite",
        transform: `translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px)`,
      }}
    ></div>
  );
};

export default function GridBackgroundView() {
  return (
    // UPDATED: Added dark:bg-slate-950 to switch background to dark in dark mode
    <div className="relative w-full h-screen ">
      <div className="w-[871px] h-screen bg-[rgba(181,_124,_255,_0.45)] rounded-[871px] opacity-[1] blur-[403px] absolute top-[-20%] left-[-20%] "></div>
      <div className="w-[871px] h-screen bg-[rgba(181,_124,_255,_0.45)] rounded-[871px] opacity-[1] blur-[403px] absolute top-[-20%] right-[-20%] "></div>
      <GridBackground />
    </div>
  );
}
