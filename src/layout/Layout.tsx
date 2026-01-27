import React from "react";
import Footer from "../shared/Footer"; 
import Navbar from "../shared/Navbar"; 
import { Outlet } from "react-router-dom";
import useUserProfile from "@/hooks/fetchUserProfile";

const Layout: React.FC = () => {
      useUserProfile();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
