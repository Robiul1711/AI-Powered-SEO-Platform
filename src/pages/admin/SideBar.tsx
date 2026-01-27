import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";

/* =======================
   Types
======================= */
export interface SubLink {
  id: number;
  path: string;
  text: string;
}

export interface SidebarItem {
  id: number;
  text: string;
  path?: string;
  activePaths?: string[] | string;
  icon?: React.ReactNode;
  sublink?: SubLink[];
}

interface SideBarProps {
  sidebar: SidebarItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

/* =======================
   Component
======================= */
const SideBar: React.FC<SideBarProps> = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);

  /* =======================
     Detect active sub menu
  ======================= */
  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink?.length) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname
        );
        if (activeSub) setActiveParentIndex(index);
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (paths?: string[] | string) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.includes(location.pathname);
  };

  const toggleSubmenu = (index: number) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 xl:hidden z-50 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed xl:static top-0 h-full w-[320px] xl:w-[350px] bg-[#F5FBEF] px-4 lg:px-8 py-6 flex flex-col transition-all duration-300 z-[220] shadow-lg
        ${open ? "left-0" : "-left-full"}`}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <div className="flex justify-center items-center mb-6">
            <FaReact size={40} className="text-black animate-spin-slow" />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 flex-1">
          {sidebar.map((item, index) => {
            const parentActive =
              item.sublink?.some((sub) => isActive(sub.path)) ||
              isActive(item.activePaths);

            /* =======================
               Simple Link
            ======================= */
            if (!item.sublink?.length) {
              return (
                <Link
                  key={item.id}
                  to={item.path || "/"}
                  onClick={() => {
                    setActiveParentIndex(null);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300
                  ${
                    isActive(item.activePaths)
                      ? "bg-[linear-gradient(129deg,#108A00_6.67%,#C8E7A6_116%)] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#E8F5E1]"
                  }`}
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  {item.text}
                </Link>
              );
            }

            /* =======================
               Parent + Submenu
            ======================= */
            return (
              <div key={item.id} className="space-y-1">
                <div
                  onClick={() => toggleSubmenu(index)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
                  ${
                    parentActive
                      ? "bg-[linear-gradient(129deg,#108A00_6.67%,#C8E7A6_116%)] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#E8F5E1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <span className="font-medium">{item.text}</span>
                  </div>

                  <MdKeyboardArrowDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      activeParentIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Sublinks */}
                <div
                  className={`overflow-hidden transition-all duration-300 rounded-lg bg-white
                  ${
                    activeParentIndex === index
                      ? "max-h-[400px] opacity-100 p-2"
                      : "max-h-0 opacity-0 p-0"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {item.sublink.map((sub) => (
                      <Link
                        key={sub.id}
                        to={sub.path}
                        onClick={() => setOpen(false)}
                        className={`px-4 py-2 rounded-md transition-all duration-200
                        ${
                          isActive(sub.path)
                            ? "bg-[linear-gradient(129deg,#108A00_6.67%,#C8E7A6_116%)] text-white font-medium"
                            : "text-gray-600 hover:bg-[#F0F4FF]"
                        }`}
                      >
                        {sub.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Logout (Fixed & Clean) */}
        <div className="mt-auto pt-6 border-t">
          <button
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-300
            text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            <IoLogOutOutline size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
