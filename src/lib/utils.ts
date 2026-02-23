import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Tostyfy 
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message);
};

export const updateToastSuccess = (toastId: string, message = "Success!") => {
  toast.success(message, { id: toastId });
};

export const updateToastError = (toastId: string, message = "Something went wrong!") => {
  toast.error(message, { id: toastId });
};