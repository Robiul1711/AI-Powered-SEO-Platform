import React from "react";
import { AiStars } from "./SVG";

const TagLines = ({ children,className,glowColor }: { children: React.ReactNode,className?:string,glowColor?:boolean }) => {
  return (
    <div className={`relative inline-block px-4 py-2.5 rounded-[103px]  bg-white/10 backdrop-blur-[2px] text-white text-sm font-medium  animate-fade-in-down overflow-hidden ${className}`}>
      <div className={`absolute top-0 h-[5px] left-0 right-0 bottom-0  ${glowColor ? "bg-[radial-gradient(50%_50%_at_50%_50%,#FFF_0%,rgba(156,156,156,0)_100%)]" : "bg-[radial-gradient(50%_50%_at_50%_50%,#8673FF_0%,rgba(21,20,24,0)_100%)]"}`} ></div>
      <span className="relative z-10 flex items-center gap-2"><AiStars/>{children}</span>
    </div>
  );
};

export default TagLines;
