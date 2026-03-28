import api from "@/api/axios";

export const contactApi = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
  }) => {
  try {
    const res = await api.post("/contact", {
      name,
      email,
      message,
    });
    return res.data;
  } catch (error) {
    console.log("ERROR", error);
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
}

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