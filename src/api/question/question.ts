import { instance } from "../api";

export const getAnswerByDate = async (year: number, month: number) => {
  const response = await instance.get(
    `/answers/calendar?year=${year}&month=${month}`
  );
  return response.data;
};
