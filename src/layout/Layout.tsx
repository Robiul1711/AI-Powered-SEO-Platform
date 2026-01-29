import React from "react";
import Footer from "../shared/Footer"; 
import Navbar from "../shared/Navbar"; 
import { Outlet, ScrollRestoration } from "react-router-dom";
import useUserProfile from "@/hooks/fetchUserProfile";
import GridBackgroundView from "../components/common/GridBackgroundView";
const Layout: React.FC = () => {
      useUserProfile();
  return (
    <div className="">
      <ScrollRestoration />
          {/* Background Layer */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <GridBackgroundView
         />
      </div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
