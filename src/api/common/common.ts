import { instance } from "../api";

export const hostingImage = async (data: FormData) => {
  try {
    const response = await instance.post("/photos/profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
