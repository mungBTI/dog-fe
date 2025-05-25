export type getAnswerId = {
  params: Promise<{
    id: string;
  }>;
};

export type file = File[] | null;

export type UploadPhotoResponse = {
  status: number;
  message: string;
  photos: UploadedPhoto[];
};

export type UploadedPhoto = {
  id: string;
  parUrl: string;
};

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
  answerText: string;
  photoIds: string[] | null;
};

export type Text = {
  text?: string;
};

export type Info = {
  count: number;
  date: string | undefined;
};

export type ImagePreviewControl = {
  previewImage: string | undefined;
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

export type getAnswerDetailResponse = {
  status: number;
  message: string;
  answer: getAnswerDetail;
};
