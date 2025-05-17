export type NewAnswerForm = {
  answer: string;
  image: FileList | null;
};

export type EditAnswerForm = {
  answer: string;
  image: FileList | string | null;
};

export type Name = {
  name: string;
};

export type Text = {
  text: string;
};

export type Info = {
  count: number;
  date: string;
};

export type ImagePreviewControl = {
  previewImage: string;
  onRemove: () => void;
};

export type getAnswerDetail = {
  userId: string;
  questionId: string;
  questionText: string;
  answerText: string;
  isDraft: boolean;
  dateKey: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  photoUrls: string[];
};
