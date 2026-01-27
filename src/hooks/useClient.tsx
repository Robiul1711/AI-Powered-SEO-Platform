import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

type UseClientProps = {
  queryKey: string[];
  url: string;
  isPrivate?: boolean;
  params?: Record<string, any>;
  enabled?: boolean;
};

const useClient = <T = any>({
  queryKey,
  url,
  isPrivate = false,
  params,
  enabled = true,
}: UseClientProps) => {
  const axiosClient = isPrivate ? useAxiosSecure() : useAxiosPublic();

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [...queryKey, params],
    enabled,
    retry: 1,

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
  {/* const { data, refetch, isFetching } = useClient({
    queryKey: ["products"],
    url: "/product/all-products",
  }); */}