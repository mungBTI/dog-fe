export type Answers = {
  id: string;
  date: number;
  isDraft: boolean;
};

export type AnswerResponse = {
  status: number;
  message: string;
  answers: Answers[];
};

export type Question = {
  id: string;
  questionText: string;
  createdAt: string;
};

export type QuestionResponse = {
  status: number;
  message: string;
  answer: Question;
};
