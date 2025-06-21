export type answerId = {
  answerId: string;
};

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
  mood: string;
  order: number;
};

export type TodayAnswerResponse = {
  status: number;
  message: string;
  question: Question;
  answer: Answer;
};

export type EditAnswerForm = {
  answerText: string;
  photoIds?: string[] | null;
  mood?: string | null;
};

export type MoodSelect = {
  mood?: string | null;
  onMoodSelect?: (mood: string) => void;
};

export type Text = {
  text?: string;
};

export type Info = {
  count: number;
  date: string | undefined;
};

export type ImagePreviewControl = {
  previewImage: string | null;
  previewSize?: string | null;
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
  mood: string;
  order: number;
};

export type getAnswerDetailResponse = {
  status: number;
  message: string;
  answer: getAnswerDetail;
};

export type DeleteConfirm = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
