import { answerId } from "@/types/answer";
import { instance } from "../api";

export const deleteAnswer = async ({ answerId }: answerId) => {
  const response = await instance.delete(`/answers/${answerId}`);
  const data = response.data;
  if (data.status == 1 || data.status == 2) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};
