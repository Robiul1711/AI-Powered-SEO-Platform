import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import footerLogo from "@/assets/images/footerLogo.png";
import useClient from "@/hooks/useClient";
import { Zap, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/redux/slices/authSlice";
import { setUser } from "@/redux/slices/uiSlice";
import { useAuthStore } from "@/providers/useAuthStore";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuthStore();
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

  // Fetch active service
  const { data: serviceResponse, isLoading: isLoadingService } = useClient({
    queryKey: ["sidebar-active-service"],
    url: "/user/services",
    isPrivate: true,
  }) as any;

  const activeService = serviceResponse?.data?.[0];

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
        className={`fixed font-inter xl:static rounded-[32px] top-0 h-full w-[260px] xl:w-[280px] bg-[#151515] backdrop-blur-sm px-4 lg:px-5 py-5 flex flex-col transition-all duration-300 z-[220] shadow-lg
        ${open ? "left-0" : "-left-full"}`}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} className="pb-4">
         
            <img src={footerLogo} alt="Logo" />
      
        </Link>



        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 flex-1 py-4 border-t border-[#EBEBEB]/10 overflow-y-auto no-scrollbar">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive(item.activePaths)
                      ? "bg-[#F7F7F7]/10 text-[#AC6CFF] shadow-sm border-l-4 border-[#AC6CFF] hover:bg-[#F7F7F7]/15"
                      : "text-[#99A1AF] hover:bg-[#F7F7F7]/10 hover:text-[#AC6CFF] "
                  }`}
                >
                  {item.icon && <span className="text-base">{item.icon}</span>}
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300 text-sm
                  ${
                    parentActive
                      ? "bg-[#F7F7F7]/10 text-white shadow-sm border-l-4 border-[#AC6CFF]"
                      : "text-[#99A1AF] hover:bg-[#F7F7F7]/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="text-base">{item.icon}</span>}
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
                  className={`overflow-hidden transition-all duration-300 rounded-lg bg-white/5
                  ${
                    activeParentIndex === index
                      ? "max-h-[400px] opacity-100 p-1.5 mt-1"
                      : "max-h-0 opacity-0 p-0 m-0"
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
        <div className="mt-auto pt-6 border-t border-[#EBEBEB]/19">
          <button
            onClick={() => {
              dispatch(clearAuth());
              dispatch(setUser(null));
              logout();
              navigate("/auth/login");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-300
            text-[#AC6CFF]   hover:bg-[#AC6CFF]/13 hover:text-[#AC6CFF] cursor-pointer"
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
