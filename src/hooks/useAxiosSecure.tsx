import { clearAuth, selectCurrentToken } from "@/redux/slices/authSlice";
import axios, { AxiosHeaders } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAuthStore } from "@/providers/useAuthStore";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const token = useSelector(selectCurrentToken);
  const { logout } = useAuthStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosSecure.interceptors.request.use((config) => {
    if (token) {
      config.headers = new AxiosHeaders({
        ...config.headers,
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  });

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Clear both Zustand and Redux auth states
        logout();
        dispatch(clearAuth());
        navigate("/auth/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
