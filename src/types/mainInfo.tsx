export type UserInfo = {
  email: string;
  nickName: string;
  profileImage: string;
};
export type SimpleUserInfo = {
  nickName: string;
  profileImage: string;
};

export type DogInfo = {
  name: string;
  birthday: string;
  firstMetAt: Date;
  photo: string;
};
//input에서 작성할 때는 Date 타입이 아니고 string 타입이므로 이를 고려하여 post 타입 재정의
export type PostDogInfo = {
  name: string;
  birthday: Date;
  firstMetAt: Date;
  photo: string;
};
export type SimpleDogInfo = {
  name: string;
  photo: string;
  togetherFor: number;
};
export type Answer = {
  status: number;
  message: string;
  answers: Array<{
    id: string;
    date: number;
  }>;
};
