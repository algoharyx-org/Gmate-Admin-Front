import api from "@/api/axios";
import Cookies from "js-cookie";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  try {
    const response = await api.post(`/auth/refresh`, {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const response = await api.post(`/auth/forgotPassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Forgot password failed:", error);
    throw error;
  }
};

export const verifyResetPasswordCode = async ({
  resetCode,
}: {
  resetCode: string;
}) => {
  const resetToken = Cookies.get("resetToken");
  try {
    const response = await api.post(
      `/auth/verifyResetPasswordCode`,
      {
        resetCode,
      },
      {
        headers: { authorization: `Bearer ${resetToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Verify reset password code failed:", error);
    throw error;
  }
};

export const resetPassword = async ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  const resetToken = Cookies.get("resetToken");
  try {
    const response = await api.put(
      `/auth/resetPassword`,
      {
        password,
        confirmPassword,
      },
      {
        headers: { authorization: `Bearer ${resetToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
};