import { useForm } from "react-hook-form";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import useMutationClient from "@/hooks/useMutationClient";
import { Loader2 } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { isPending, mutate } = useMutationClient({
    url: "/contact",
    method: "post",
    successMessage: "Thank you! Your message has been sent successfully.",
  });

  const onSubmit = (data: FormData) => {
    // Map frontend camelCase to backend snake_case
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: data.number,
      message: data.message,
    };

    mutate(
      { data: payload },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/30 blur-[80px] rounded-full pointer-events-none -z-10" />

      <div className="mb-8 font-orbitron">
        <Title level="title32" className="text-white">
          send us a message
        </Title>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-light">
          We'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="First name"
              disabled={isPending}
              {...register("firstName", { required: "First name is required" })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all disabled:opacity-50"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs pl-2">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Last name"
              disabled={isPending}
              {...register("lastName", { required: "Last name is required" })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all disabled:opacity-50"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs pl-2">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              disabled={isPending}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all disabled:opacity-50"
            />
            {errors.email && (
              <span className="text-red-500 text-xs pl-2">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Number */}
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Number"
              disabled={isPending}
              {...register("number", { required: "Phone number is required" })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all disabled:opacity-50"
            />
            {errors.number && (
              <span className="text-red-500 text-xs pl-2">
                {errors.number.message}
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <textarea
            placeholder="Message"
            rows={5}
            disabled={isPending}
            {...register("message", { required: "Message is required" })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all disabled:opacity-50 resize-none font-inter leading-relaxed"
          />
          {errors.message && (
            <span className="text-red-500 text-xs pl-2">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <CommonButton
          type="submit"
          className="bg-bg-custom w-full h-[58px] relative overflow-hidden group shadow-lg shadow-purple-900/20"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
               <Loader2 className="w-5 h-5 animate-spin" />
               <span className="uppercase tracking-widest text-sm">Transmitting Data...</span>
            </div>
          ) : (
            <span className="uppercase tracking-widest text-sm">Send Message</span>
          )}
        </CommonButton>
      </form>
    </div>
  );
};

export default ContactForm;
