import { type CardProps } from "@/types/card";

export const mockCardData: CardProps[] = [
  {
    meetupId: 1,
    meetupStatus: "IN_PROGRESS",
    meetingType: "STUDY",
    title: "영어 회화 스터디",
    location: "DAEGU",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
      {
        userId: 7,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-01"),
    recruitmentEndDate: new Date("2025-01-10"),
    meetingStartDate: new Date("2025-01-15"),
    meetingEndDate: new Date("2025-02-15"),
    thumbnail: "https://via.placeholder.com/300x200?text=영어+회화+스터디",
    isOnline: false,
  },
  {
    meetupId: 2,
    meetupStatus: "IN_PROGRESS",
    meetingType: "TUTORING",
    title: "프로그래밍 개인 과외",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-01"),
    recruitmentEndDate: new Date("2024-12-15"),
    meetingStartDate: new Date("2024-12-20"),
    meetingEndDate: new Date("2025-01-20"),
    thumbnail: "https://via.placeholder.com/300x200?text=프로그래밍+개인+과외",
    isOnline: false,
  },
  {
    meetupId: 3,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "수학 문제 풀이 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-11-01"),
    recruitmentEndDate: new Date("2024-11-10"),
    meetingStartDate: new Date("2024-11-15"),
    meetingEndDate: new Date("2024-12-15"),
    thumbnail: "https://via.placeholder.com/300x200?text=수학+문제+풀이+스터디",
    isOnline: false,
  },
  {
    meetupId: 4,
    meetupStatus: "RECRUITING",
    meetingType: "TUTORING",
    title: "초등학교 과학 과외",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-05"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-03-01"),

    thumbnail: "https://via.placeholder.com/300x200?text=초등학교+과학+과외",
    isOnline: false,
  },
  {
    meetupId: 5,
    meetupStatus: "IN_PROGRESS",
    meetingType: "STUDY",
    title: "웹 개발 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-10"),
    recruitmentEndDate: new Date("2024-12-25"),
    meetingStartDate: new Date("2025-01-01"),
    meetingEndDate: new Date("2025-02-01"),

    thumbnail: "https://via.placeholder.com/300x200?text=웹+개발+스터디",
    isOnline: false,
  },
  {
    meetupId: 6,
    meetupStatus: "RECRUITING",
    meetingType: "STUDY",
    title: "프랑스어 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-02-01"),
    recruitmentEndDate: new Date("2025-02-10"),
    meetingStartDate: new Date("2025-02-15"),
    meetingEndDate: new Date("2025-03-15"),

    thumbnail: "https://via.placeholder.com/300x200?text=프랑스어+스터디",
    isOnline: false,
  },
  {
    meetupId: 7,
    meetupStatus: "IN_PROGRESS",
    meetingType: "TUTORING",
    title: "고등학교 수학 과외",
    location: "DAEGU",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-15"),
    recruitmentEndDate: new Date("2024-12-25"),
    meetingStartDate: new Date("2024-12-30"),
    meetingEndDate: new Date("2025-02-15"),

    thumbnail: "https://via.placeholder.com/300x200?text=고등학교+수학+과외",
    isOnline: false,
  },
  {
    meetupId: 8,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "글쓰기 워크숍",
    location: "DAEJEON",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-10-01"),
    recruitmentEndDate: new Date("2024-10-10"),
    meetingStartDate: new Date("2024-10-15"),
    meetingEndDate: new Date("2024-11-15"),

    thumbnail: "https://via.placeholder.com/300x200?text=글쓰기+워크숍",
    isOnline: false,
  },
  {
    meetupId: 9,
    meetupStatus: "RECRUITING",
    meetingType: "TUTORING",
    title: "기초 일본어 과외",
    location: "GWANGJU",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-02-20"),
    recruitmentEndDate: new Date("2025-02-28"),
    meetingStartDate: new Date("2025-03-05"),
    meetingEndDate: new Date("2025-04-05"),

    thumbnail: "https://via.placeholder.com/300x200?text=기초+일본어+과외",
    isOnline: false,
  },
  {
    meetupId: 10,
    meetupStatus: "IN_PROGRESS",
    meetingType: "STUDY",
    title: "데이터 분석 스터디",
    location: "BUSAN",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-10"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-25"),

    thumbnail: "https://via.placeholder.com/300x200?text=데이터+분석+스터디",
    isOnline: false,
  },
  {
    meetupId: 11,
    meetupStatus: "COMPLETED",
    meetingType: "TUTORING",
    title: "중학교 영어 과외",
    location: "JEONJU",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-11-20"),
    recruitmentEndDate: new Date("2024-11-30"),
    meetingStartDate: new Date("2024-12-05"),
    meetingEndDate: new Date("2025-01-05"),
    thumbnail: "https://via.placeholder.com/300x200?text=데이터+분석+스터디",
    isOnline: false,
  },
  {
    meetupId: 12,
    meetupStatus: "RECRUITING",
    meetingType: "STUDY",
    title: "인공지능 기초 스터디",
    location: "DAEJEON",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-03-01"),
    recruitmentEndDate: new Date("2025-03-10"),
    meetingStartDate: new Date("2025-03-15"),
    meetingEndDate: new Date("2025-04-15"),

    thumbnail: "https://via.placeholder.com/300x200?text=인공지능+기초+스터디",
    isOnline: false,
  },
  {
    meetupId: 13,
    meetupStatus: "IN_PROGRESS",
    meetingType: "TUTORING",
    title: "대학교 논문 첨삭",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-15"),
    recruitmentEndDate: new Date("2025-01-25"),
    meetingStartDate: new Date("2025-01-30"),
    meetingEndDate: new Date("2025-02-28"),
    thumbnail: "https://via.placeholder.com/300x200?text=대학교+논문+첨삭",
    isOnline: false,
  },
  {
    meetupId: 14,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "기초 피트니스 그룹",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-09-10"),
    recruitmentEndDate: new Date("2024-09-20"),
    meetingStartDate: new Date("2024-09-25"),
    meetingEndDate: new Date("2024-10-25"),
    thumbnail: "https://via.placeholder.com/300x200?text=기초+피트니스+그룹",
    isOnline: false,
  },
  {
    meetupId: 15,
    meetupStatus: "RECRUITING",
    meetingType: "STUDY",
    title: "비즈니스 영어 회화",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-02-01"),
    recruitmentEndDate: new Date("2025-02-15"),
    meetingStartDate: new Date("2025-02-20"),
    meetingEndDate: new Date("2025-03-20"),
    thumbnail: "https://via.placeholder.com/300x200?text=비즈니스+영어+회화",
    isOnline: false,
  },
  {
    meetupId: 16,
    meetupStatus: "IN_PROGRESS",
    meetingType: "TUTORING",
    title: "기초 회계 과외",
    location: "GANGNEUNG",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-10"),
    recruitmentEndDate: new Date("2024-12-20"),
    meetingStartDate: new Date("2024-12-25"),
    meetingEndDate: new Date("2025-01-25"),
    thumbnail: "https://via.placeholder.com/300x200?text=기초+회계+과외",
    isOnline: false,
  },
  {
    meetupId: 17,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "영화 감상 및 토론",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-10-01"),
    recruitmentEndDate: new Date("2024-10-10"),
    meetingStartDate: new Date("2024-10-15"),
    meetingEndDate: new Date("2024-11-15"),
    thumbnail: "https://via.placeholder.com/300x200?text=영화+감상+및+토론",
    isOnline: false,
  },
  {
    meetupId: 18,
    meetupStatus: "RECRUITING",
    meetingType: "TUTORING",
    title: "중급 중국어 회화",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-05"),
    recruitmentEndDate: new Date("2025-01-15"),
    meetingStartDate: new Date("2025-01-20"),
    meetingEndDate: new Date("2025-02-20"),
    thumbnail: "https://via.placeholder.com/300x200?text=중급+중국어+회화",
    isOnline: false,
  },
  {
    meetupId: 19,
    meetupStatus: "IN_PROGRESS",
    meetingType: "STUDY",
    title: "헬스 트레이닝 그룹",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-11-20"),
    recruitmentEndDate: new Date("2024-11-30"),
    meetingStartDate: new Date("2024-12-05"),
    meetingEndDate: new Date("2025-01-05"),
    thumbnail: "https://via.placeholder.com/300x200?text=헬스+트레이닝+그룹",
    isOnline: false,
  },
  {
    meetupId: 20,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "창업 아이디어 개발",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-09-10"),
    recruitmentEndDate: new Date("2024-09-20"),
    meetingStartDate: new Date("2024-09-25"),
    meetingEndDate: new Date("2024-10-25"),
    thumbnail: "https://via.placeholder.com/300x200?text=창업+아이디어+개발",
    isOnline: false,
  },
  {
    meetupId: 21,
    meetupStatus: "RECRUITING",
    meetingType: "STUDY",
    title: "비즈니스 전략 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-20"),
    recruitmentEndDate: new Date("2025-01-30"),
    meetingStartDate: new Date("2025-02-05"),
    meetingEndDate: new Date("2025-03-05"),
    thumbnail: "https://via.placeholder.com/300x200?text=비즈니스+전략+스터디",
    isOnline: false,
  },
  {
    meetupId: 22,
    meetupStatus: "IN_PROGRESS",
    meetingType: "TUTORING",
    title: "전문 사진 촬영 과외",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-02-01"),
    recruitmentEndDate: new Date("2025-02-10"),
    meetingStartDate: new Date("2025-02-15"),
    meetingEndDate: new Date("2025-03-15"),
    thumbnail: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isOnline: false,
  },
  {
    meetupId: 23,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "프론트엔드 개발 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-01"),
    recruitmentEndDate: new Date("2024-12-10"),
    meetingStartDate: new Date("2024-12-15"),
    meetingEndDate: new Date("2025-01-15"),
    thumbnail: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isOnline: false,
  },
  {
    meetupId: 24,
    meetupStatus: "BEFORE_START",
    meetingType: "STUDY",
    title: "백엔드 개발 스터디",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-01"),
    recruitmentEndDate: new Date("2024-12-10"),
    meetingStartDate: new Date("2025-01-17"),
    meetingEndDate: new Date("2025-01-20"),
    thumbnail: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isOnline: false,
  },

  {
    meetupId: 25,
    meetupStatus: "COMPLETED",
    meetingType: "STUDY",
    title: "백엔드 개발 스터디2",
    location: "CAPITAL",
    participants: [
      {
        userId: 3,
        profileImageUrl: "",
      },
      {
        userId: 5,
        profileImageUrl: "",
      },
    ],
    minParticipants: 4,
    recruitmentStartDate: new Date("2024-12-01"),
    recruitmentEndDate: new Date("2024-12-10"),
    meetingStartDate: new Date("2025-01-15"),
    meetingEndDate: new Date("2025-01-16"),
    thumbnail: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isOnline: false,
    isMypage: true,
    isReview: true,
  },
];
