import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Combine the values into a single OTP string
    const otp = Object.values(data).join("");
    console.log("OTP Data:", otp);
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-orbitron font-semibold text-white">
          Verify OTP
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              {...register(`otp${i}`, { required: true })}
              type="text"
              maxLength={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className={`w-12 h-16 bg-[#1E1E1E] border focus:border-Primary rounded-2xl text-center text-2xl font-bold text-white outline-none transition-all px-0 ${errors[`otp${i}`] ? "border-red-500" : "border-transparent"}`}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(172,108,255,0.3)] active:scale-[0.98] text-lg"
        >
          Verify OTP
        </button>
      </form>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-400">
          Didn't receive code?{" "}
          <button className="text-Primary font-semibold hover:underline">
            Resend
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

export default VerifyOtp;
