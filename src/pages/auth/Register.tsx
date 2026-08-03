import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { useEffect } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutationClient({
    url: "/auth/register",
    method: "post",
  });
  const onSubmit = (formData: any) => {
    mutate(
      { data: formData },
      {
        onSuccess: () => {
          navigate("/auth/verify-email", {
            state: { email: formData.email, from: "register" },
          });
        },
        onError: (err) => {
          const serverErrors = err?.response?.data?.errors;
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              setError(key as any, {
                type: "server",
                message: serverErrors[key][0],
              });
            });
          }
        },
      },
    );
  };

  const password = watch("password");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-orbitron font-semibold text-white">
          Create Your Account
        </h1>
        <p className="text-gray-400 text-sm mt-2">Access Your SEO Dashboard</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Full Name
          </label>
          <input
            {...register("name", { required: "Full name is required" })}
            type="text"
            placeholder="John Doe"
            className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none ${errors.name ? "border-red-500" : "border-transparent"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.name as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="john@company.com"
            className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none ${errors.email ? "border-red-500" : "border-transparent"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.email as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none pr-12 ${errors.password ? "border-red-500" : "border-transparent"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.password as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("password_confirmation", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none pr-12 ${errors.password_confirmation ? "border-red-500" : "border-transparent"}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.password_confirmation as any).message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center text-gray-400 text-sm">
        Already Have An Account?{" "}
        <Link
          to="/auth/login"
          className="text-Primary font-semibold hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
