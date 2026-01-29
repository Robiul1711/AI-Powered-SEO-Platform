import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Reset Password Data:", data);
  };

  const newPassword = watch("newPassword");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-orbitron font-semibold text-white">
          Create new Password
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Set a secure password to access your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Current Password
          </label>
          <div className="relative">
            <input
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none pr-12 ${errors.currentPassword ? "border-red-500" : "border-transparent"}`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.currentPassword as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none pr-12 ${errors.newPassword ? "border-red-500" : "border-transparent"}`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.newPassword as any).message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 ml-1 block">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className={`w-full bg-[#1E1E1E] border focus:border-Primary/50 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 transition-all outline-none pr-12 ${errors.confirmPassword ? "border-red-500" : "border-transparent"}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs ml-1">
              {(errors.confirmPassword as any).message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
