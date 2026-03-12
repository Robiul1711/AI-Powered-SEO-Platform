import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import CommonNavbar from "../pages/admin/CommonNavbar";
import SideBar, { type SidebarItem } from "../pages/admin/SideBar";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import useUserProfile from "@/hooks/fetchUserProfile";
import {
  AccountIcon,
  DashboardIcon,
  MessagesIcon,
  ProgressIcon,
  ReportIcon,
  ServiceIcon,
} from "@/components/common/DashboardSVG";
import authBg from "@/assets/images/authBg.png";
const AdminLayout: React.FC = () => {
  useUserProfile();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const sideBar: SidebarItem[] = [
    {
      id: 1,
      icon: <DashboardIcon />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: [
        "/dashboard",
        "/dashboard/settings",
        "/dashboard/analytics",
      ],
    },
    {
      id: 2,
      icon: <ServiceIcon />,
      text: "My Services",
      path: "/user/services",
      activePaths: ["/user/services"],
    },
    {
      id: 3,
      icon: <ReportIcon />,
      text: "Reports",
      path: "/dashboard/reports",
      activePaths: ["/dashboard/reports"],
    },
    {
      id: 4,
      icon: <ProgressIcon />,
      text: "Progress & Tasks",
      path: "/dashboard/progress-and-tasks",
      activePaths: ["/dashboard/progress-and-tasks"],
    },
    {
      id: 5,
      icon: <MessagesIcon />,
      text: "Messages",
      path: "/dashboard/messages",
      activePaths: ["/dashboard/messages"],
    },
    {
      id: 6,
      icon: <AccountIcon />,
      text: "Account",
      path: "/dashboard/account",
      activePaths: ["/dashboard/account"],
    },
  ];

  return (
    <>
      <ScrollRestoration />
      <div
        className="flex h-screen min-h-screen w-full p-6"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <SideBar open={open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className="flex flex-col lg:gap-10 gap-5 lg:py-6  lg:px-[30px]  ">
            <CommonNavbar open={open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
