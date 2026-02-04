import React, { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Camera, Eye, EyeOff } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

type PasswordKeys = keyof ShowPasswords;

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
  toggleKey?: PasswordKeys;
}

const Account = () => {
  // 1. Setup React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "John Smith",
      email: "john@company.com",
      companyName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. States for Image and Password Visibility
  const [profileImg, setProfileImg] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  );
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle eye icons
  const toggleVisibility = (field: PasswordKeys) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle Image Change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: any) => console.log("Profile Data:", data);
  const onPasswordSubmit = (data: any) => console.log("Password Data:", data);

  // Reusable Input Component with Eye Toggle
  const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    placeholder,
    type = "text",
    isPassword = false,
    toggleKey,
  }) => (
    <div className="flex flex-col gap-3 w-full relative">
      <label className="font-orbitron text-sm font-bold text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          {...(register as any)(name)}
          type={
            isPassword && toggleKey
              ? showPasswords[toggleKey]
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-[#242424] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all font-inter"
        />
        {isPassword && toggleKey && (
          <button
            type="button"
            onClick={() => toggleVisibility(toggleKey)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPasswords[toggleKey] ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className=" font-inter pb-10">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl xs:text-4xl font-orbitron font-bold text-white">
          Account Settings
        </h1>
        <p className="text-gray-400 mt-2 text-xs sm:text-sm">
          Manage Your Profile And Account Preferences
        </p>
      </header>

      <div className="space-y-6 sm:space-y-8">
        {/* Profile Section */}
        <section className="bg-[#1A1A1A] border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10">
          <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 sm:mb-8 text-white">
            Profile Information
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="relative group w-fit">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-purple-500/30">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#AC6CFF] p-1.5 sm:p-2 rounded-full border-2 border-[#1A1A1A] hover:scale-110 transition-transform shadow-lg"
              >
                <Camera size={12} className="text-white sm:size-3.5" />
              </button>
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-[13px] sm:text-sm mb-1 text-white">
                Profile Photo
              </h4>
              <p className="text-gray-500 text-[11px] sm:text-xs">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onProfileSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="John Smith"
              />
              <InputField
                label="Email Address"
                name="email"
                placeholder="john@company.com"
              />
            </div>
            <InputField
              label="Company Name"
              name="companyName"
              placeholder="Example.........."
            />
            <div className="pt-6">
              <CommonButton
                type="submit"
                className="bg-bg-custom w-full sm:w-auto"
              >
                Save Changes
              </CommonButton>
            </div>
          </form>
        </section>

        {/* Password Section */}
        <section className="bg-[#1A1A1A] border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10">
          <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 sm:mb-8 text-white">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit(onPasswordSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            <InputField
              label="Current Password"
              name="currentPassword"
              isPassword
              toggleKey="current"
              placeholder="••••••••••••"
            />
            <InputField
              label="New Password"
              name="newPassword"
              isPassword
              toggleKey="new"
              placeholder="••••••••••••"
            />
            <InputField
              label="Confirm New Password"
              name="confirmPassword"
              isPassword
              toggleKey="confirm"
              placeholder="••••••••••••"
            />
            <div className="pt-6">
              <CommonButton
                type="submit"
                className="bg-bg-custom w-full sm:w-auto"
              >
                Save Changes
              </CommonButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Account;
