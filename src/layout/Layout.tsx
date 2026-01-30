import React, { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import useUserProfile from "@/hooks/fetchUserProfile";
import GridBackgroundView from "../components/common/GridBackgroundView";
import authBg from "@/assets/images/authBg1.png";
import Preloader from "@/components/common/Preloader";
import { AnimatePresence } from "motion/react";

const Layout: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useUserProfile();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="">
      <ScrollRestoration />

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-700 ease-in-out`}
      >
        {location.pathname === "/" ? (
          <div className="fixed inset-0 -z-10 h-full w-full">
            {/* Background Layer */}
            <GridBackgroundView />
          </div>
        ) : (
          <div className="fixed inset-0 -z-10">
            <img src={authBg} alt="" className="w-full h-full object-cover  " />
          </div>
        )}
        {/* Background Image */}

        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
