import logo from "@/assets/images/logo.png";
import { NavLink } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "/services",
      subLinks: [
        { name: "Monthly SEO", path: "/services/monthly-seo" },
        { name: "Local SEO", path: "/services/local-seo" },
        { name: "PPC Campaigns", path: "/services/ppc-campaigns" },
        { name: "Content Writing", path: "/services/content-writing" },
      ],
    },
    { name: "AI SEO Audit", path: "/ai-seo-audit" },
    { name: "Pricing", path: "/pricing" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Contact", path: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`section-padding-x w-full z-50 fixed transition-all duration-300 left-0 right-0 ${
        isScrolled ? "top-2" : "top-8"
      }`}
    >
      <div
        className={`flex justify-between items-center px-8 rounded-full shadow-custom animate-fade-in-down transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white backdrop-blur-lg border border-white/20"
            : "py-4 bg-white"
        }`}
      >
        {/* Logo Section */}
        <NavLink to="/" className="shrink-0">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-inter">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              ref={link.subLinks ? dropdownRef : null}
            >
              {link.subLinks ? (
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-all duration-300 hover:text-[#AC6CFF] ${
                    isServicesOpen ? "text-[#AC6CFF]" : "text-black/80"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1 ">
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </div>
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-[#AC6CFF] ${
                      isActive ? "text-[#AC6CFF]" : "text-black/80"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div className="flex flex-col items-center">
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute -bottom-2 w-1.5 h-1.5 bg-[#AC6CFF] rounded-full shadow-[0_0_8px_#AC6CFF]"></span>
                      )}
                    </div>
                  )}
                </NavLink>
              )}

              {/* Dropdown Menu */}
              {link.subLinks && isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-[#1A1A1A] rounded-3xl p-4 shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-200 z-100">
                  <div className="flex flex-col gap-2">
                    {link.subLinks.map((subLink) => (
                      <NavLink
                        key={subLink.name}
                        to={subLink.path}
                        onClick={() => setIsServicesOpen(false)}
                        className={({ isActive }) =>
                          `px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-transparent border border-[#AC6CFF] text-white"
                              : "text-white/90 hover:bg-white/10"
                          }`
                        }
                      >
                        {subLink.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <CommonButton
            as="link"
            to="/auth/register"
            className="bg-transparent! text-black! border border-[#CDCDCD] hover:border-[#AC6CFF] hover:text-[#AC6CFF]! px-4! sm:px-8!"
          >
            Sign Up
          </CommonButton>
          <CommonButton className="bg-bg-custom text-white! hover:bg-[#9D56FF]! shadow-[0_0_20px_rgba(172,108,255,0.3)] px-4! sm:px-8!">
            Free AI Audit
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
