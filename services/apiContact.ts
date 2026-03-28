import api from '@/api/axios';

export const getIndex = async () => {
  try {
    const res = await api.get("/contact");
    return res.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const markContactRead = async (id: string) => {
  try {
    await api.put(`/contact/${id}`);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const markAllContactRead = async () => {
  try {
    await api.put(`/contact`);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const deleteContact = async (id: string) => {
  try {
    await api.delete(`/contact/${id}`);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};

export const getContactById = async (id: string) => {
  try {
    const res = await api.get(`/contact/${id}`);
    return res.data;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};