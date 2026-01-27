import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import CommonNavbar from "../pages/admin/CommonNavbar";
import SideBar, { type SidebarItem } from "../pages/admin/SideBar";
import { MdDashboard } from "react-icons/md";
import useUserProfile from "@/hooks/fetchUserProfile";

const AdminLayout: React.FC = () => {
    useUserProfile();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const sideBar: SidebarItem[] = [
    {
      id: 1,
      icon: <MdDashboard />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard", "/dashboard/settings", "/dashboard/analytics"],
    },
    {
      id: 2,
      icon: <MdDashboard />,
      text: "Admin Management",
      path: "/dashboard/admin-list",
      sublink: [
        { id: 1, text: "Admin List", path: "/dashboard/admin-list" },
        { id: 2, text: "Add New Admin", path: "/dashboard/asdasd" },
      ],
    },
  ];

  return (
    <>
      <ScrollRestoration />
      <div className="flex h-screen min-h-screen w-full">
        <SideBar open={open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className="flex flex-col lg:gap-10 gap-5 lg:py-6 py-3 lg:px-[30px] px-2.5 sm:px-5">
            <CommonNavbar open={open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
