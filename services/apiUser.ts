import api from "@/api/axios";

export const getAllUsers = async (params: Record<string, string | number | boolean>) => {
  try {
    const response = await api.get(`/users`, {params});
    return response.data.data;
  } catch (error) {
    console.error("Get all users failed:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete user failed:", error);
    throw error;
  }
};

export const updateUser = async (id: string, data: {name?: string, email?: string, role?: string, active?: boolean}) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update user failed:", error);
    throw error;
  }
};

export const createUser = async (data: {name: string, email: string, password: string, role: string}) => {
  try {
    const response = await api.post(`/users`, data);
    return response.data;
  } catch (error) {
    console.error("Create user failed:", error);
    throw error;
  }
};

export const changeActive = async (id: string) => {
  try {
    const response = await api.put(`/auth/changeActive/${id}`);
    return response.data;
  } catch (error) {
    console.error("Change active failed:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export const updateProfile = async ({
  name,
  bio,
}: {
  name: string;
  bio: string;
}) => {
  try {
    const res = await api.put("/auth/updateProfile", {
      name,
      bio,
    });
    return res.data.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export const updateAvatar = async ({avatar}: {avatar: File}) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await api.put("/auth/uploadAvatar", formData);
    return res.data.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export const changePassword = async ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}: {
  oldPassword: string;
    newPassword: string;
  confirmNewPassword: string;
}) => {
  try {
    const res = await api.put("/auth/changePassword", {
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
    return res.data.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}