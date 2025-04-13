import { instance } from "../api";

export const getUserSimpleInfo = async () => {
  const response = await instance.get("/users/me");
  return response.data;
};
export const getDogSimpleInfo = async () => {
  const response = await instance.get("/dogs");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await instance.get("/users/me/detail");
  return response.data;
};
export const getDogInfo = async () => {
  const response = await instance.get("/dogs/detail");
  return response.data;
};
