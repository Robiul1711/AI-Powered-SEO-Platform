import React from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/images/footerLogo.png";
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "AI Audit", path: "/ai-seo-audit" },
        { name: "Pricing", path: "/pricing" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "API", path: "/api" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/docs" },
        { name: "Help Center", path: "/help" },
        { name: "Case Studies", path: "/case-studies" },
        { name: "SEO Guide", path: "/seo-guide" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie-policy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, path: "#", color: "hover:text-sky-400" },
    { icon: <FaLinkedinIn />, path: "#", color: "hover:text-blue-600" },
    { icon: <FaGithub />, path: "#", color: "hover:text-gray-400" },
    { icon: <FaDiscord />, path: "#", color: "hover:text-indigo-500" },
  ];

  return (
   <footer
  className="relative w-full 
  rounded-t-[24px]
  border-[1.5px] border-white/15
  bg-[rgba(12,12,12,0.70)]
  shadow-[inset_2px_4px_16px_0_rgba(172,108,255,0.27)]
  backdrop-blur-[50px]"
>

      <div className="section-padding-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 xl:col-span-4 flex flex-col gap-6">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="h-8 md:h-10 lg:h-12 xl:h-14 w-auto"
              />
            </NavLink>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-inter">
              AI-powered SEO platform that automates your growth and delivers
              measurable results.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  className={`w-10 h-10  rounded-full border bg-[#AC6CFF]/9 border-white/10 flex items-center justify-center text-Primary transition-all duration-300 hover:border-[#AC6CFF] hover:bg-[#AC6CFF]/10 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className="lg:col-span-1 xl:col-span-2 flex flex-col gap-6"
            >
              <h4 className="text-white font-semibold text-lg font-orbitron tracking-tight">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <NavLink
                      to={link.path}
                      className="text-white/50 text-sm hover:text-[#AC6CFF] transition-colors duration-300 font-inter"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider and Copyright */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-white/15 flex flex-col items-center gap-4">
          <p className="text-white/40 text-sm font-inter">
            © {new Date().getFullYear()} GAJURA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
