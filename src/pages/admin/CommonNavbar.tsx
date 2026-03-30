import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Command, Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import useClient from "@/hooks/useClient";
interface CommonNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({ open, setOpen }) => {
  const user = useSelector((state: any) => state.ui?.user?.data);
  const location = useLocation();

  // Define content mapping for different routes
  const getHeaderContent = () => {
    const path = location.pathname;

    if (path === "/dashboard") {
      return {
        title: (
          <span>
            Welcome back,{" "}
            <span className="text-[#AC6CFF]">
              {user?.name || user?.full_name || "User"}
            </span>
          </span>
        ),
        subtitle: "Performance analytics and operational synchronization",
      };
    }

    if (path === "/dashboard/reports") {
      return {
        title: "My Reports",
        subtitle: "Access Your Monthly Performance Reports",
      };
    }

    if (path === "/user/services" || path === "/dashboard/my-services") {
      return {
        title: "My Services",
        subtitle: "Manage And Track Your Active Marketing Services",
      };
    }

    if (path === "/dashboard/progress-and-tasks") {
      return {
        title: (
          <span>
            Progress & <span className="text-[#AC6CFF]">Tasks</span>
          </span>
        ),
        subtitle:
          "Track Ongoing Work And Completed Deliverables Across Your Services",
      };
    }

    if (path === "/dashboard/messages") {
      return {
        title: "Messages",
        subtitle: "Direct communication channel for optimized collaboration",
      };
    }

    if (path === "/dashboard/account") {
      return {
        title: "Account Details",
        subtitle: "Manage your personal profile and account security",
      };
    }

    // Default fallback
    return {
      title: (
        <span>
          Welcome back,{" "}
          <span className="text-[#AC6CFF]">
            {user?.name || user?.full_name || "User"}
          </span>
        </span>
      ),
      subtitle: "Performance analytics and operational synchronization",
    };
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="flex items-center justify-between w-full font-inter gap-4">
      {/* Menu Toggle for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/10"
      >
        <Menu className="w-6 h-6" />
      </button>

      <header className="hidden md:block flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold tracking-tight text-white uppercase leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-[10px] md:text-sm uppercase tracking-widest font-light">
              {subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </header>

      {/* Right Section: Notifications & User */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Notifications */}
        {/* <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1A1A1A]"></span>
        </button> */}

        {/* Divider */}
        {/* <div className="h-8 w-px bg-white/10 hidden sm:block"></div> */}

        {/* User Profile */}
        <UserDropdown />
      </div>
    </div>
  );
};

export default CommonNavbar;
