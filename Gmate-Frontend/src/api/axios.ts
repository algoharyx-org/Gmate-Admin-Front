import axios, { AxiosError } from "axios";
import cookie from "react-cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
});

export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/health`, {
      timeout: 3000,
    });
    return true;
  } catch {
    return false;
  }
};

export class ApiError extends Error {
  statusCode?: number;
  isNetworkError: boolean;

  constructor(
    message: string,
    statusCode?: number,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.code === "ECONNREFUSED" || axiosError.code === "ERR_CONNECTION_REFUSED" || !axiosError.response) {
      throw new ApiError("Unable to connect to server. Please ensure the backend is running.", undefined, true);
    }
    
    const statusCode = axiosError.response?.status;
    const data = axiosError.response?.data as { message?: string } | undefined;
    const message = data?.message || axiosError.message || "An error occurred";
    
    throw new ApiError(message, statusCode);
  }
  
  throw new ApiError("An unexpected error occurred");
};

api.interceptors.request.use(
  (config) => {
    const accessToken = cookie.load("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = cookie.load("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {
              refreshToken,
            },
          );
          const newAccessToken = response.data.data;
          cookie.save("accessToken", newAccessToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60),
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        cookie.remove("accessToken", { path: "/" });
        cookie.remove("refreshToken", { path: "/" });
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export { handleApiError };
export default api;
