import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";
import { AxiosResponse, AxiosInstance } from "axios";

interface MutationParams {
  url: string;
  method?: "post" | "put" | "patch" | "delete";
  isPrivate?: boolean;
  invalidateKeys?: any[][];
  successMessage?: string;
  redirectTo?: string;
}

interface MutationData {
  data?: any;
  config?: any;
}

const useMutationClient = ({
  url,
  method = "post",
  isPrivate = false,
  invalidateKeys = [],
  successMessage = "Action successful!",
  redirectTo,
}: MutationParams): UseMutationResult<AxiosResponse<any>, any, MutationData> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const client: AxiosInstance = isPrivate ? useAxiosSecure() : useAxiosPublic();

  return useMutation({
    mutationFn: async ({ data, config }: MutationData) => {
      if (method === "delete") {
        return await client.delete(url, config);
      }
      return await client[method](url, data, config);
    },

    onSuccess: (res) => {
      const responseData = res?.data;
      
      // 1. Global Success Feedback
      toast.success(responseData?.message || successMessage);

      // 2. Cache Invalidation
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      // 3. Navigation
      if (redirectTo) navigate(redirectTo);
    },

    onError: (error: any) => {
      // Extract error message for the toast
      const msg = error?.response?.data?.message || error.message || "An error occurred";
      toast.error(msg);
    },
  });
};

export default useMutationClient;

// const { mutate, isLoading } = useMutationClient({
//   url: "/update-profile",
//   method: "put",
//   invalidateKeys: [["user-profile"]],
// });
// const onSubmit = (formData) => {
//   mutate(
//     { data: formData },
//     {
//       onSuccess: (res) => {
//         console.log("Custom success logic here:", res.data);
//         // Do something specific like closing a modal
//       },
//       onError: (err) => {
//         const serverErrors = err?.response?.data?.errors;
//         // Handle your UI errors here locally in the component!
//         setLocalError(serverErrors);
//       },
//     }
//   );
// };