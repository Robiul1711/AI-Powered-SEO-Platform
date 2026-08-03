import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useMutationClient from "@/hooks/useMutationClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const token = location.state?.token;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutationClient({
    url: "/auth/reset-password",
    method: "post",
  });

  const onSubmit = (data: any) => {
    mutate(
      {
        data: {
          email,
          token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      },
      {
        onSuccess: () => {
          navigate("/auth/login");
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
          Create new Password
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Set a secure password to access your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: "New password is required",
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
          className="w-full bg-linear-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
