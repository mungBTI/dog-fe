import { PostDogInfo, UpdateDogInfo, UpdateUserInfo } from "@/types/mainInfo";
import { instance } from "../api";

export const postDogInfo = async (data: PostDogInfo) => {
  const response = await instance.post("/dogs", data);
  return response.data;
};
export const editUserInfo = async (data: UpdateUserInfo) => {
  const response = await instance.patch("/users/me", data);
  return response.data;
};
export const editDogInfo = async (data: UpdateDogInfo) => {
  const response = await instance.patch("/dogs", data);
  return response.data;
};
