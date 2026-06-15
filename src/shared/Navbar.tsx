import logo from "@/assets/images/logo.png";
import logoWhite from "@/assets/images/footerLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectIsAuthenticated } from "@/redux/slices/authSlice";
import { selectCurrentUser, setUser } from "@/redux/slices/uiSlice";
import useClient from "@/hooks/useClient";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  const { data , isLoading} = useClient({
    queryKey: ["services"],
    url: "/services",
  });

  const servicesData = Array.isArray(data?.data) ? data.data : (data?.data?.data || []);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "/services",
      subLinks: servicesData.length > 0
        ? servicesData.map((service: any) => ({
          name: service.title,
          path: `/services/${service.slug}`,
          is_campaign: service.is_campaign
        }))
        : [
          { name: "SEO Campaign", path: "/services/seo-campaign", is_campaign: true },
          { name: "Guest Posting", path: "/services/guest-posting", is_campaign: false },
          { name: "Link Building", path: "/services/link-building", is_campaign: false },
          { name: "SMM Marketing", path: "/services/smm-marketing", is_campaign: false },
        ],
    },
    { name: "AI SEO Audit", path: "/ai-seo-audit" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(setUser(null));
    setIsUserDropdownOpen(false);
    closeMobileMenu();
    navigate("/auth/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <>
      <div
        className={`section-padding-x w-full z-50 fixed transition-all duration-300 left-0 right-0 ${isScrolled ? "top-2" : "top-4 sm:top-6"
          }`}
      >
        <div
          className={`flex justify-between items-center px-4 sm:px-6 lg:px-8 rounded-full shadow-custom animate-fade-in-down transition-all duration-300 ${isScrolled
              ? "py-3 bg-white backdrop-blur-lg border border-white/20"
              : " py-3 sm:py-4 bg-white"
            }`}
        >
          {/* Logo Section */}
          <NavLink to="/" className="shrink-0 z-50">
            <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-inter">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                ref={link.subLinks ? dropdownRef : null}
                onMouseEnter={() => link.subLinks && setIsServicesOpen(true)}
                onMouseLeave={() => link.subLinks && setIsServicesOpen(false)}
              >
                {link.subLinks ? (
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`flex items-center gap-1 text-sm xl:text-base font-medium transition-all duration-300 hover:text-[#AC6CFF] ${isServicesOpen ? "text-[#AC6CFF]" : "text-black/80"
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
                      `relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-[#AC6CFF] ${isActive ? "text-[#AC6CFF]" : "text-black/80"
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


                {/* Desktop Dropdown Menu */}
                {link.subLinks && isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-80 z-[100]">
                    <div className="bg-[#1A1A1A] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 animate-in fade-in zoom-in duration-300">
                      <div className="flex flex-col gap-1.5">
                        {isLoading ? (
                          Array.from({ length: 4 }).map((_, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/5 animate-pulse"
                            >
                              <div className="h-4 bg-white/10 rounded w-28"></div>
                              {index === 0 && (
                                <div className="h-4 bg-white/10 rounded-full w-14"></div>
                              )}
                            </div>
                          ))
                        ) : (
                          link.subLinks.map((subLink: any) => (
                            <NavLink
                              key={subLink.name}
                              to={subLink.path}
                              onClick={() => setIsServicesOpen(false)}
                              className={({ isActive }) =>
                                `group/item flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                  ? "bg-white/10 text-[#AC6CFF] border border-[#AC6CFF]/30"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                                }`
                              }
                            >
                              <span>{subLink.name}</span>
                              {subLink.is_campaign && (
                                <span className="text-[10px] bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(172,108,255,0.4)]">
                                  Campaign
                                </span>
                              )}
                            </NavLink>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action Buttons / User Profile */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-bg-custom flex items-center justify-center text-white overflow-hidden border-2 border-[#AC6CFF]/20">
                    {user?.data?.avatar_url ? (
                      <img
                        src={user.data.avatar_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // <User size={20} />
                      <User size={20} />
                    )}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 text-black/60 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 pt-4 w-56 z-50 font-inter">
                    <div className="bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.data?.name || user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.data?.email || user?.email || "User"}
                        </p>
                      </div>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#AC6CFF] rounded-xl transition-all"
                      >
                        <User size={18} />
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <CommonButton
                  as="link"
                  to="/auth/register"
                  className="bg-transparent! text-black! border border-[#CDCDCD] hover:border-[#AC6CFF] hover:text-[#AC6CFF]! px-4! xl:px-8! text-sm! xl:text-base!"
                >
                  Sign Up
                </CommonButton>
                <CommonButton to="/ai-seo-audit" as="link" className="bg-bg-custom text-white! hover:bg-[#9D56FF]! shadow-[0_0_20px_rgba(172,108,255,0.3)] px-4! xl:px-8! text-sm! xl:text-base!">
                  Free AI Audit
                </CommonButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-50 p-2 text-black hover:text-[#AC6CFF] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm text-white bg-black/60 backdrop-blur-sm z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <img src={logoWhite} alt="Logo" className="h-8 w-auto" />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white hover:text-[#AC6CFF] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-6 font-inter">
            <div className="flex flex-col gap-2">
              {isAuthenticated && (
                <div className="mb-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-bg-custom flex items-center justify-center text-white overflow-hidden">
                      {user?.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold truncate">
                        {user?.full_name || user?.name || "User"}
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 w-full py-3 px-4 mb-2 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <User size={18} />
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full py-3 px-4 text-sm font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}

              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.subLinks ? (
                    <div>
                      <button
                        onClick={() =>
                          setIsMobileServicesOpen(!isMobileServicesOpen)
                        }
                        className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white/80 hover:text-[#AC6CFF] hover:bg-gray-50 rounded-xl transition-all"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {/* Mobile Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-96 mt-2" : "max-h-0"
                          }`}
                      >
                        <div className="flex flex-col gap-1.5 pl-4">
                          {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/5 animate-pulse"
                              >
                                <div className="h-4 bg-white/10 rounded w-28"></div>
                                {index === 0 && (
                                  <div className="h-4 bg-white/10 rounded-full w-14"></div>
                                )}
                              </div>
                            ))
                          ) : (
                            link.subLinks.map((subLink: any) => (
                              <NavLink
                                key={subLink.name}
                                to={subLink.path}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                  `flex items-center justify-between py-3.5 px-5 text-sm font-medium rounded-xl transition-all ${isActive
                                    ? "bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                  }`
                                }
                              >
                                <span>{subLink.name}</span>
                                {subLink.is_campaign && (
                                  <span className="text-[9px] bg-[#AC6CFF] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                                    Campaign
                                  </span>
                                )}
                              </NavLink>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block py-3 px-4 text-base font-medium rounded-xl transition-all ${isActive
                          ? "bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20"
                          : "text-white hover:bg-gray-50 hover:text-[#AC6CFF]"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="p-6 border-t border-gray-200 flex  gap-4 ">
            {!isAuthenticated && (
              <CommonButton
                as="link"
                to="/auth/register"
                onClick={closeMobileMenu}
                className="w-full! bg-transparent! text-white! text-center border border-[#CDCDCD] hover:border-[#AC6CFF] hover:text-[#AC6CFF]! py-3!"
              >
                Sign Up
              </CommonButton>
            )}
            <CommonButton
              onClick={closeMobileMenu}
              className="w-full! bg-bg-custom text-white! hover:bg-[#9D56FF]! shadow-[0_0_20px_rgba(172,108,255,0.3)] py-3!"
            >
              Free AI Audit
            </CommonButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
