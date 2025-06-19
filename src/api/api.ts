import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isHandlingUnauthorized = false;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true;
      localStorage.removeItem("accessToken");
      alert("다시 로그인 해주세요.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
