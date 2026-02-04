import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Command, Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";

interface CommonNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({ open, setOpen }) => {
  return (
    <div className="flex items-center justify-between w-full font-inter ">
      {/* Left Section: Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-white/70 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative group flex-1 max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/40 group-focus-within:text-white/70 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-16 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/30"
            placeholder="Search Here..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-1 pointer-events-none">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/40 font-mono">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Notifications & User */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1A1A1A]"></span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

        {/* User Profile */}
        <UserDropdown />
      </div>
    </div>
  );
};

export default CommonNavbar;
