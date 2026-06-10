import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

type UseClientProps = {
  queryKey: string[];
  url: string;
  isPrivate?: boolean;
  params?: Record<string, any>;
  enabled?: boolean;
  options?: any;
};

const useClient = <T = any>({
  queryKey,
  url,
  isPrivate = false,
  params,
  enabled = true,
  options = {},
}: UseClientProps) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const axiosClient = isPrivate ? axiosSecure : axiosPublic;

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<T>({
    queryKey: [...queryKey, params],
    enabled,
    retry: 1,
    ...options,

    queryFn: async () => {
      const res = await axiosClient.get(url, { params });
      return res.data as T;
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export default useClient;
