import { PostDogInfo } from "@/types/mainInfo";
import { instance } from "../api";

export const postDogInfo = async (data: PostDogInfo) => {
  const response = await instance.post("/dogs", data);
  return response.data;
};
