import { EditAnswerForm } from "@/types/answer";
import { instance } from "../api";

export const uploadPhoto = async (formData: FormData) => {
  const response = await instance.post("/photos/answer", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = response.data;
  if (data.error_code === 6001) {
    const err = new Error(data.message);
    throw err;
  }

  if (data.error_code === 6002) {
    const err = new Error(data.message);
    throw err;
  }

  return data;
};

export const postTodayAnswer = async (formData: EditAnswerForm) => {
  const response = await instance.post(`/answers/today`, formData);

  const data = response.data;
  if (data.status !== 0) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};
