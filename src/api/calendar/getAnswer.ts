import { instance } from "../api";

export const getMonthAnswer = async (year: number, month: number) => {
  const response = await instance.get(
    `/answers/calendar?year=${year}&month=${month}`
  );
  const data = response.data;
  if (data.status == 2) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};

export const getQuestion = async (answerId: string) => {
  const response = await instance.get(`/answers/calendar/summary/${answerId}`);
  const data = response.data;
  if (data.status !== 0) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};
