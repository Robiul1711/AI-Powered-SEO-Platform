import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect } from "react";
import { setUser } from "@/redux/slices/uiSlice";

export const useUserProfile = () => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ["userProfile", token],
    queryFn: async () => {
      if (!token) return null;
      const res = await axiosSecure.get("/get-profile");
      return res.data.userdata || res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync with Redux whenever data is fetched
  useEffect(() => {
    if (query.data) {
      dispatch(setUser(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useUserProfile;