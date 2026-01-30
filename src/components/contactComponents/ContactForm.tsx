import { useForm } from "react-hook-form";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";

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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Handle submitting logic here
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/30 blur-[80px] rounded-full pointer-events-none -z-10" />

      <div className="mb-8">
        <Title level="title32" className="text-white font-orbitron lowercase">
          send us a message
        </Title>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="First name"
              {...register("firstName", { required: true })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-colors"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs pl-2">
                First name is required
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-colors"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs pl-2">
                Last name is required
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
              {...register("email", { required: true })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-colors"
            />
            {errors.email && (
              <span className="text-red-500 text-xs pl-2">
                Email is required
              </span>
            )}
          </div>

          {/* Number */}
          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Number"
              {...register("number", { required: true })}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-colors"
            />
            {errors.number && (
              <span className="text-red-500 text-xs pl-2">
                Number is required
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <textarea
            placeholder="Message"
            rows={5}
            {...register("message", { required: true })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-colors resize-none"
          />
          {errors.message && (
            <span className="text-red-500 text-xs pl-2">
              Message is required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <CommonButton
          type="submit"
          className="bg-bg-custom w-full"
        >
          Send Message
        </CommonButton>
      </form>
    </div>
  );
};

export default ContactForm;
