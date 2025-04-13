import UserImg from "../../../public/icons/person.png";
import DogImg from "../../../public/icons/dogIcon.png";
import QaImg from "../../../public/icons/question.png";
import LogoutImg from "../../../public/icons/sign-out.png";
import DeleteImg from "../../../public/icons/trash.png";

export const mypageList = {
  userInfo: {
    label: "보호자 정보",
    icon: UserImg,
    fields: [
      {
        label: "이메일",
      },
      {
        label: "닉네임",
      },
    ],
  },
  dogInfo: {
    label: "반려동물 정보",
    icon: DogImg,
    fields: [
      {
        label: "이름",
      },
      {
        label: "생년월일",
      },
      {
        label: "첫 만남 날짜",
      },
    ],
  },
  qa: {
    label: "문의하기",
    icon: QaImg,
  },
  logout: {
    label: "로그아웃",
    icon: LogoutImg,
  },
  deleteAccount: {
    label: "회원탈퇴",
    icon: DeleteImg,
  },
};
