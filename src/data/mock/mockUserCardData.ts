import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";

// 목록 O
export const myStudyList: CardProps[] = [
  {
    id: 1,
    status: "진행중",
    itemType: "study",
    title: "알고리즘 스터디 모집합니다",
    location: "강남",
    participants: 3,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-11"),
      endDate: new Date("2025-02-11"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 2,
    status: "진행중",
    itemType: "study",
    title: "알고리즘 스터디 모집합니다",
    location: "강남",
    participants: 3,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-11"),
      endDate: new Date("2025-02-11"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 3,
    status: "진행중",
    itemType: "study",
    title: "알고리즘 스터디 모집합니다",
    location: "강남",
    participants: 3,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-11"),
      endDate: new Date("2025-02-11"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 4,
    status: "모집중",
    itemType: "study",
    title: "자료구조 스터디",
    location: "강남",
    participants: 2,
    recruitmentPeriod: {
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-02-01"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-02"),
      endDate: new Date("2025-05-01"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 5,
    status: "모집중",
    itemType: "study",
    title: "자료구조 스터디",
    location: "강남",
    participants: 2,
    recruitmentPeriod: {
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-02-01"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-02"),
      endDate: new Date("2025-05-01"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 6,
    status: "모집중",
    itemType: "study",
    title: "자료구조 스터디",
    location: "강남",
    participants: 2,
    recruitmentPeriod: {
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-02-01"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-02"),
      endDate: new Date("2025-05-01"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 7,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 8,
    status: "종료",
    itemType: "study",
    title: "모각코 구해요",
    location: "서울대입구",
    participants: 4,
    recruitmentPeriod: {
      startDate: new Date("2024-12-26"),
      endDate: new Date("2024-12-27"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 9,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 10,
    status: "종료",
    itemType: "study",
    title: "모각코 구해요",
    location: "서울대입구",
    participants: 4,
    recruitmentPeriod: {
      startDate: new Date("2024-12-26"),
      endDate: new Date("2024-12-27"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 11,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 12,
    status: "종료",
    itemType: "study",
    title: "모각코 구해요",
    location: "서울대입구",
    participants: 4,
    recruitmentPeriod: {
      startDate: new Date("2024-12-26"),
      endDate: new Date("2024-12-27"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
];
export const myTutoringList: CardProps[] = [
  {
    id: 13,
    status: "모집중",
    itemType: "tutoring",
    title: "React 1:1 과외",
    location: "신촌",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-30"),
    },
    eventPeriod: {
      startDate: new Date("2024-03-10"),
      endDate: new Date("2024-06-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 14,
    status: "모집중",
    itemType: "tutoring",
    title: "TypeScript 과외",
    location: "사당",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-20"),
    },
    eventPeriod: {
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-03-01"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 15,
    status: "진행중",
    itemType: "tutoring",
    title: "코딩테스트 비법전수",
    location: "목동",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-11"),
      endDate: new Date("2024-01-25"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 16,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 17,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 18,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 19,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 20,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 21,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 22,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
  {
    id: 23,
    status: "종료",
    itemType: "tutoring",
    title: "이력서 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-03"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-06"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  },
];
export const reviewableStudyList: CardProps[] = [
  {
    id: 24,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 25,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 26,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 27,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 28,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 29,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 30,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 31,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 32,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 33,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
  {
    id: 34,
    status: "종료",
    itemType: "study",
    title: "모각코 하실분",
    location: "강남",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-10"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isReview: true,
  },
];
export const reviewableTutoringList: CardProps[] = [
  {
    id: 35,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 36,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 37,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 38,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 39,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 40,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 41,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 42,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 43,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 44,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
  {
    id: 45,
    status: "종료",
    itemType: "tutoring",
    title: "면접 코칭",
    location: "용인",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-30"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    isReview: true,
  },
];
export const writtenReviews: ReviewInfo[] = [
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 8,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 9,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 10,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 11,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 12,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 13,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 14,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 15,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 16,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 17,
    eventType: "study",
  },
  {
    rating: 2,
    title: "모각코 구해요",
    review: "모각코 즐거웠습니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 18,
    eventType: "study",
  },
];
export const writtenTutoringReviews: ReviewInfo[] = [
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 9,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 10,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 11,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 12,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 13,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 14,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 15,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 16,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 17,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 18,
    eventType: "tutoring",
  },
  {
    rating: 1,
    title: "이력서 코칭",
    review: "이력서 첨삭 잘 해주셔서 감사합니다.",
    userid: 1,
    username: "모과씨",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
    isMyReview: true,
    eventId: 19,
    eventType: "tutoring",
  },
];
export const createdStudyList: CardProps[] = [
  {
    id: 10,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 11,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 12,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 13,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 14,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 15,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 16,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 17,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 18,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 19,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
  {
    id: 20,
    status: "진행중",
    itemType: "study",
    title: "비전공자를 위한 CS 스터디",
    location: "판교",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-14"),
    },
    eventPeriod: {
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-02-10"),
    },
    image: "/images/temp.png",
  },
];
export const createdTutoringList: CardProps[] = [
  {
    id: 11,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
  {
    id: 12,
    status: "종료",
    itemType: "tutoring",
    title: "CSS 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-09"),
      endDate: new Date("2024-12-09"),
    },
    image: "/images/temp.png",
  },
  {
    id: 13,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
  {
    id: 14,
    status: "종료",
    itemType: "tutoring",
    title: "CSS 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-09"),
      endDate: new Date("2024-12-09"),
    },
    image: "/images/temp.png",
  },
  {
    id: 15,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
  {
    id: 16,
    status: "종료",
    itemType: "tutoring",
    title: "CSS 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-09"),
      endDate: new Date("2024-12-09"),
    },
    image: "/images/temp.png",
  },
  {
    id: 17,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
  {
    id: 18,
    status: "종료",
    itemType: "tutoring",
    title: "CSS 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-09"),
      endDate: new Date("2024-12-09"),
    },
    image: "/images/temp.png",
  },
  {
    id: 19,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
  {
    id: 20,
    status: "종료",
    itemType: "tutoring",
    title: "CSS 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-09"),
      endDate: new Date("2024-12-09"),
    },
    image: "/images/temp.png",
  },
  {
    id: 21,
    status: "종료",
    itemType: "tutoring",
    title: "HTML 쉽게 배우기",
    location: "홍대",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-07"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-08"),
      endDate: new Date("2024-12-08"),
    },
    image: "/images/temp.png",
  },
];
export const classReviews: ReviewInfo[] = [
  {
    rating: 1,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 2,
    title: "CSS 쉽게 배우기",
    review: "어려운 CSS를 쉽게 배울 수 있었습니다.",
    userid: 2,
    username: "학생2",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 0,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 1,
    title: "CSS 쉽게 배우기",
    review: "어려운 CSS를 쉽게 배울 수 있었습니다.",
    userid: 2,
    username: "학생2",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 2,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 0,
    title: "CSS 쉽게 배우기",
    review: "어려운 CSS를 쉽게 배울 수 있었습니다.",
    userid: 2,
    username: "학생2",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 1,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 2,
    title: "CSS 쉽게 배우기",
    review: "어려운 CSS를 쉽게 배울 수 있었습니다.",
    userid: 2,
    username: "학생2",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 0,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 1,
    title: "CSS 쉽게 배우기",
    review: "어려운 CSS를 쉽게 배울 수 있었습니다.",
    userid: 2,
    username: "학생2",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
  {
    rating: 2,
    title: "HTML 쉽게 배우기",
    review: "기초부터 차근차근 설명해주셔서 이해하기 쉬웠어요",
    userid: 3,
    username: "학생3",
    userprofile: "/images/temp.png",
    date: new Date(),
  },
];

// 목록 X
/* export const myStudyList = [];
export const myTutoringList = [];
export const reviewableStudyList = [];
export const reviewableTutoringList = [];
export const writtenReviews = [];
export const writtenTutoringReviews = [];
export const createdStudyList = [];
export const createdTutoringList = [];
export const classReviews = []; */
