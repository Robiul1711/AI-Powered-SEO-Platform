import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Camera, Eye, EyeOff } from "lucide-react";
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
      name: user?.data?.name || "",
      phone: user?.data?.phone || "",
      gender: user?.data?.gender || "",
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
    if (user?.data) {
      resetProfile({
        name: user.data.name || "",
        phone: user.data.phone || "",
        gender: user.data.gender || "",
      });
      if (user.data.avatar_url) {
        setProfileImg(user.data.avatar_url);
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

  // Reusable Input Component
  const InputField: React.FC<InputFieldProps & { register: any }> = ({
    label,
    name,
    placeholder,
    type = "text",
    isPassword = false,
    toggleKey,
    register,
  }) => (
    <div className="flex flex-col gap-3 w-full relative">
      <label className="font-orbitron text-sm font-bold text-gray-200">
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
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-purple-500/30 bg-[#242424]">
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

          <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <InputField
                label="Full Name"
                name="name"
                placeholder="Your Name"
                register={registerProfile}
              />
              <div className="flex flex-col gap-3 w-full">
                <label className="font-orbitron text-sm font-bold text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.data?.email || ""}
                  disabled
                  className="w-full bg-[#242424] border border-white/5 rounded-2xl px-6 py-4 text-gray-500 cursor-not-allowed font-inter"
                />
              </div>
              <InputField
                label="Phone"
                name="phone"
                placeholder="Your Phone"
                register={registerProfile}
              />
              <InputField
                label="Gender"
                name="gender"
                placeholder="Your Gender"
                register={registerProfile}
              />
            </div>
            <div className="pt-6">
              <CommonButton
                type="submit"
                className="bg-bg-custom w-full sm:w-auto"
                disabled={profileMutation.isPending}
              >
                {profileMutation.isPending ? "Saving..." : "Save Changes"}
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
            onSubmit={handleSubmitPassword(onPasswordSubmit)}
            className="space-y-6 sm:space-y-8"
          >
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
            <div className="pt-6">
              <CommonButton
                type="submit"
                className="bg-bg-custom w-full sm:w-auto"
                disabled={passwordMutation.isPending}
              >
                {passwordMutation.isPending ? "Changing..." : "Save Changes"}
              </CommonButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Account;
