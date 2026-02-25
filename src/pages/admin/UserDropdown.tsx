import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/uiSlice";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.ui.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = user?.data?.name || user?.name || "John Doe";
  const userEmail = user?.data?.email || "johndoe@example.com";
  const userAvatar =
    user?.data?.avatar_url ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-white">{userName}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 p-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl"
          >
            <div className="p-2 border-b border-white/5 mb-2">
              <p className="text-xs text-white/50">Signed in as</p>
              <p className="text-sm font-medium text-white truncate">
                {userEmail}
              </p>
            </div>

            <div className="space-y-1">
              <Link
                to="/dashboard/account"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              {/* <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link> */}
            </div>

            <div className="mt-2 pt-2 border-t border-white/5">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  dispatch(clearAuth());
                  dispatch(setUser(null));
                  navigate("/auth/login");
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
