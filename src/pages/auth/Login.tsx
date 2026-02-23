import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutationClient({
    url: "/auth/login",
    method: "post",
  });

  const onSubmit = (formData: any) => {
    mutate(
      { data: formData },
      {
        onSuccess: (res: any) => {
          const token = res?.data?.access_token;
          if (token) {
            dispatch(setToken({ token }));
            navigate("/dashboard");
          }
        },
        onError: (err: any) => {
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-orbitron font-semibold text-white">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Login to your SEO dashboard
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center ml-1 mb-2">
            <label className="text-sm font-medium text-white/90 block">
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-Primary hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-Primary font-semibold hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
