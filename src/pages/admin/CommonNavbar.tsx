import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

interface CommonNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between w-full py-3 md:py-6 px-0 rounded-2xl">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>
        <p className="text-black text-3xl font-bold">Admin Header</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        <IoIosNotifications color="black" size={24} />
        <CgProfile color="black" size={24} />
      </div>
    </div>
  );
};

export default CommonNavbar;
