import { EditAnswerForm } from "@/types/answer";
import { instance } from "../api";

type PatchAnswerArgs = {
  answerId: string;
  formData: EditAnswerForm;
};

export const patchAnswer = async ({ answerId, formData }: PatchAnswerArgs) => {
  const response = await instance.patch(`/answers/${answerId}`, formData);

  const data = response.data;
  if (data.status !== 0) {
    const err = new Error(data.message);
    throw err;
  }
  return data;
};
