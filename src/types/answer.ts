type Question = {
  id: string;
  text: string;
};

type Answer = {
  id: string;
  answerText: string;
  photoUrls: string[];
  isDraft: boolean;
};

export type TodayAnswerResponse = {
  status: number;
  message: string;
  question: Question;
  answer: Answer;
};

export type EditAnswerForm = {
  answer: string;
  image: FileList | string | null;
};

export type Name = {
  name: string;
};

export type Text = {
  text?: string;
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
