import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Camera, Eye, EyeOff, User, KeyRound, Info, Lock } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";
import { useSelector } from "react-redux";
import useMutationClient from "@/hooks/useMutationClient";

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
  const user = useSelector((state: any) => state.ui.user);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Setup Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
  } = useForm({
    defaultValues: {
      name: user?.data?.name || user?.name || user?.userdata?.name || "",
      phone: user?.data?.phone || user?.phone || user?.userdata?.phone || "",
      gender: user?.data?.gender || user?.gender || user?.userdata?.gender || "",
    },
  });

  // 2. Setup Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    const userData = user?.data || user?.userdata || user;
    if (userData) {
      resetProfile({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
      });
      if (userData.avatar_url) {
        setProfileImg(userData.avatar_url);
      }
    }
  }, [user, resetProfile]);

  // Mutations
  const profileMutation = useMutationClient({
    url: "/profile/setup",
    method: "post",
    isPrivate: true,
    invalidateKeys: [["userProfile"]],
    successMessage: "Profile updated successfully!",
  });

  const passwordMutation = useMutationClient({
    url: "/profile/update-password",
    method: "post",
    isPrivate: true,
    successMessage: "Password changed successfully!",
  });

  // Toggle eye icons
  const toggleVisibility = (field: PasswordKeys) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle Image Change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    profileMutation.mutate({ data: formData });
  };

  const onPasswordSubmit = (data: any) => {
    passwordMutation.mutate(
      { data },
      {
        onSuccess: () => {
          resetPassword();
        },
      },
    );
  };

  // Reusable Compact Input Component
  const InputField: React.FC<InputFieldProps & { register: any }> = ({
    label,
    name,
    placeholder,
    type = "text",
    isPassword = false,
    toggleKey,
    register,
  }) => (
    <div className="flex flex-col gap-1.5 w-full relative">
      <label className="font-inter text-xs font-bold text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type={
            isPassword && toggleKey
              ? showPasswords[toggleKey]
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full h-9 bg-[#242424] border border-white/10 rounded-md px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all font-inter"
        />
        {isPassword && toggleKey && (
          <button
            type="button"
            onClick={() => toggleVisibility(toggleKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPasswords[toggleKey] ? (
              <EyeOff size={15} />
            ) : (
              <Eye size={15} />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="font-inter pb-8 w-full">
      {/* 2-COLUMN COMPACT GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT COLUMN: Profile Information */}
        <section className="bg-[#1A1A1A] border border-white/10 rounded-md p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF]">
                  <User size={16} />
                </div>
                <h2 className="text-sm font-bold text-white">
                  Profile Information
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Personal Details</span>
            </div>

            {/* Avatar & Photo Upload */}
            <div className="flex items-center gap-4 mb-5 p-3 rounded-md bg-[#242424]/50 border border-white/5">
              <div className="relative group shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#AC6CFF]/40 bg-[#242424]">
                  <img
                    src={
                      profileImg ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  className="absolute bottom-0 right-0 bg-[#AC6CFF] p-1 rounded-full border border-[#1A1A1A] hover:scale-110 transition-transform shadow-md"
                >
                  <Camera size={11} className="text-black" />
                </button>
              </div>
              <div>
                <h4 className="font-bold text-xs mb-0.5 text-white">
                  Profile Photo
                </h4>
                <p className="text-gray-400 text-[11px]">
                  Allowed JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Your Full Name"
                  register={registerProfile}
                />
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-inter text-xs font-bold text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.data?.email || user?.email || user?.userdata?.email || ""}
                    disabled
                    className="w-full h-9 bg-[#242424] border border-white/10 rounded-md px-3 text-xs text-gray-500 cursor-not-allowed font-inter"
                  />
                </div>
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Phone Number"
                  register={registerProfile}
                />
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-inter text-xs font-bold text-gray-300">
                    Gender
                  </label>
                  <select
                    {...registerProfile("gender")}
                    className="w-full h-9 bg-[#242424] border border-white/10 rounded-md px-3 text-xs text-white focus:outline-none focus:border-[#AC6CFF] transition-all font-inter appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#242424] text-gray-400">Select Gender</option>
                    <option value="male" className="bg-[#242424] text-white">Male</option>
                    <option value="female" className="bg-[#242424] text-white">Female</option>
                    <option value="other" className="bg-[#242424] text-white">Other</option>
                  </select>
                </div>
              </div>

              {/* Informational Note Box */}
              <div className="p-3 rounded-md bg-[#242424]/40 border border-white/5 flex items-start gap-2 text-xs text-gray-400 mb-5">
                <Info size={15} className="text-[#AC6CFF] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  Ensure your phone and personal info are kept up-to-date for notification alerts and invoice records.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={profileMutation.isPending}
                  className="h-9 px-5 rounded-md bg-[#AC6CFF] text-black font-bold text-xs hover:bg-[#9655EF] transition-all disabled:opacity-50"
                >
                  {profileMutation.isPending ? "Saving..." : "Save Profile Changes"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: Change Password */}
        <section className="bg-[#1A1A1A] border border-white/10 rounded-md p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF]">
                  <KeyRound size={16} />
                </div>
                <h2 className="text-sm font-bold text-white">
                  Update Security Password
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Account Security</span>
            </div>

            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
              <InputField
                label="Current Password"
                name="current_password"
                isPassword
                toggleKey="current"
                placeholder="••••••••••••"
                register={registerPassword}
              />
              <InputField
                label="New Password"
                name="password"
                isPassword
                toggleKey="new"
                placeholder="••••••••••••"
                register={registerPassword}
              />
              <InputField
                label="Confirm New Password"
                name="password_confirmation"
                isPassword
                toggleKey="confirm"
                placeholder="••••••••••••"
                register={registerPassword}
              />

              <div className="p-3 rounded-md bg-[#242424]/40 border border-white/5 flex items-start gap-2 text-xs text-gray-400 my-4">
                <Lock size={15} className="text-[#AC6CFF] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  Use a strong password with letters, numbers, and special characters to protect your account.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordMutation.isPending}
                  className="h-9 px-5 rounded-md bg-[#AC6CFF] text-black font-bold text-xs hover:bg-[#9655EF] transition-all disabled:opacity-50"
                >
                  {passwordMutation.isPending ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
