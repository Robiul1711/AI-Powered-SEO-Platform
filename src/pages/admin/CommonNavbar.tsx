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

  // Define professional title case content mapping for routes
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
        subtitle: "Real-time performance analytics and operational overview",
      };
    }

    if (path === "/dashboard/reports") {
      return {
        title: "My Reports",
        subtitle: "Access your monthly performance & audit reports",
      };
    }

    if (path === "/user/services" || path === "/dashboard/my-services") {
      return {
        title: "My Services",
        subtitle: "Manage and track your active marketing services & subscriptions",
      };
    }

    if (path === "/dashboard/my-plan") {
      return {
        title: "My Active Plan",
        subtitle: "Overview of your subscribed package tier and features",
      };
    }

    if (path === "/dashboard/progress-and-tasks") {
      return {
        title: (
          <span>
            Progress & <span className="text-[#AC6CFF]">Tasks</span>
          </span>
        ),
        subtitle: "Track ongoing work and completed deliverables across your services",
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
        subtitle: "Manage your personal profile and account security settings",
      };
    }

    if (path === "/dashboard/my-campaigns") {
      return {
        title: "My Campaigns",
        subtitle: "Manage and monitor your active marketing campaigns",
      };
    }

    if (path.startsWith("/dashboard/my-campaigns/")) {
      return {
        title: "Campaign Details",
        subtitle: "Detailed overview of your campaign deliverables & progress",
      };
    }

    if (path === "/dashboard/payment-history") {
      return {
        title: "Payment History",
        subtitle: "Review your past transactions, invoices & receipts",
      };
    }

    if (path === "/dashboard/booking-history") {
      return {
        title: "Booking History",
        subtitle: "Track all your past service bookings and orders",
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
      subtitle: "Performance analytics and operational overview",
    };
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="flex items-center justify-between w-full font-inter gap-4">
      {/* Menu Toggle for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all border border-white/10"
      >
        <Menu className="w-5 h-5" />
      </button>

      <header className="hidden md:block flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-xl md:text-2xl font-inter font-bold tracking-tight text-white leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 mt-1 text-xs md:text-sm font-normal">
              {subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </header>

      {/* Right Section: Notifications & User */}
      <div className="flex items-center gap-2 sm:gap-6">
        <UserDropdown />
      </div>
    </div>
  );
};

export default CommonNavbar;
