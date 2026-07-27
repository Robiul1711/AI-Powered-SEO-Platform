import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/authSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location.state?.email;
  const from = location.state?.from;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutate: verifyEmail, isPending: isVerifying } = useMutationClient({
    url: "/auth/verify-email",
    method: "post",
  });

  const { mutate: resendOtp, isPending: isResending } = useMutationClient({
    url: "/auth/resend-otp",
    method: "post",
    successMessage: "OTP resent successfully!",
  });

  const onSubmit = (data: any) => {
    const otp = Object.values(data).join("");
    verifyEmail(
      { data: { email, otp } },
      {
        onSuccess: (res: any) => {
          if (from === "forgot-password") {
            navigate("/auth/reset-password", { state: { email, otp } });
          } else {
            // Save token and navigate to dashboard
            const token = res?.data?.access_token;
            if (token) {
              dispatch(setToken({ token }));
              navigate("/dashboard");
            } else {
              navigate("/auth/login");
            }
          }
        },
      },
    );
  };

  const handleResend = () => {
    if (email) {
      resendOtp({ data: { email } });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value && target.nextElementSibling) {
      (target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (
      e.key === "Backspace" &&
      !target.value &&
      target.previousElementSibling
    ) {
      (target.previousElementSibling as HTMLInputElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const otpValue = pastedData.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5);

    if (otpValue.length > 0) {
      otpValue.split("").forEach((char, index) => {
        setValue(`otp${index}`, char);
      });

      const lastFocusedIndex = Math.min(otpValue.length - 1, 4);
      const nextInput = document.querySelector(`input[name="otp${lastFocusedIndex}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-orbitron font-semibold text-white">
          Verify Email
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Enter the 5-digit code sent to your email
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              {...register(`otp${i}`, { required: true })}
              type="text"
              maxLength={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              autoComplete="off"
              className={`w-12 h-16 bg-[#1E1E1E] border focus:border-Primary rounded-2xl text-center text-2xl font-bold text-white outline-none transition-all px-0 ${errors[`otp${i}`] ? "border-red-500" : "border-transparent"}`}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-400">
          Didn't receive code?{" "}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-Primary font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </p>
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

export default VerifyEmail;
