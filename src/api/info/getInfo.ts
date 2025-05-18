import { instance } from "../api";

export const getUserSimpleInfo = async () => {
  try {
    const response = await instance.get("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDogSimpleInfo = async () => {
  try {
    const response = await instance.get("/dogs");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserInfo = async () => {
  try {
    const response = await instance.get("/users/me/detail");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDogInfo = async () => {
  try {
    const response = await instance.get("/dogs/detail");
    return response.data;
  } catch (error) {
    throw error;
  }
};
