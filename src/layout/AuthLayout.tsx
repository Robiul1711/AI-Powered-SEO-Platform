import { Link, Outlet } from "react-router-dom";
import authBg from "@/assets/images/authBg1.webp";
import logo from "@/assets/images/footerLogo.png";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-[550px] flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img src={logo} alt="Gajura Logo" className="h-12 w-auto" />
        </Link>

        {/* Auth Card */}
        <div className="w-full border border-white/5 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
