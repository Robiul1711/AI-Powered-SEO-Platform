import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutationClient({
    url: "/auth/forgot-password",
    method: "post",
  });

  const onSubmit = (data: any) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          navigate("/auth/verify-otp", {
            state: { email: data.email, from: "forgot-password" },
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-orbitron font-semibold text-white">
          Reset your password
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Enter your email and we'll send you reset instructions
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-linear-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send Reset OTP"}
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
