import { PostDogInfo, SimpleUserInfo } from "@/types/mainInfo";
import { instance } from "../api";

export const postDogInfo = async (data: PostDogInfo) => {
  const response = await instance.post("/dogs", data);
  return response.data;
};
export const editUserInfo = async (data: SimpleUserInfo) => {
  const response = await instance.patch("/users/me", data);
  return response.data;
};
export const editDogInfo = async (data: PostDogInfo) => {
  const response = await instance.patch("/dogs", data);
  return response.data;
};
