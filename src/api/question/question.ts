import { instance } from "../api";

export const getAnswerToday = async () => {
  const response = await instance.get(`/answers/today`);
  return response.data;
};
