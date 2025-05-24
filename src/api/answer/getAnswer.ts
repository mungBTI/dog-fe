import { instance } from "../api";

export const getTodayAnswer = async () => {
  const response = await instance.get("/answers/today");
  const data = response.data;
  if (data.status !== 0) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};

export const getDetailAnswer = async (answerId: string) => {
  const response = await instance.get(`/answers/${answerId}/detail`);
  const data = response.data;
  if (data.status !== 0) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};
