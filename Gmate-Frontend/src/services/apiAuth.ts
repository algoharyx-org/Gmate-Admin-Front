import api from "@/api/axios";
import cookie from "react-cookies";

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

export const register = async ({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await api.post(`/auth/register`, {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
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
  const resetToken = cookie.load("resetToken");
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
  const resetToken = cookie.load("resetToken");
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

export const refreshToken = async () => {
  const refreshToken = cookie.load("refreshToken");
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
