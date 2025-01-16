import { type CardProps } from "@/types/card";
import { type MeetProps } from "@/types/meetDetail";
import { type ReviewInfo } from "@/types/review";

export const cardList: CardProps[] = [
  {
    id: 1,
    status: "모집중",
    itemType: "study",
    title: "모각각코",
    location: "집",
    participants: 10,
    recruitmentPeriod: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-20"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
  },
  {
    id: 2,
    status: "모집중",
    itemType: "study",
    title: "모집집코",
    location: "집",
    participants: 8,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
  },
  {
    id: 3,
    status: "진행중",
    itemType: "study",
    title: "코딩공부",
    location: "집",
    participants: 8,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-05"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-02-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
  },
  {
    id: 4,
    status: "종료",
    itemType: "tutoring",
    title: "게임코칭",
    location: "pc방",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-05"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-02-05"),
    },
    image:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    isReview: true,
  },
];

export const comments: ReviewInfo[] = [
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "A",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "B",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "C",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "D",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "E",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "F",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
];

export const meetDetailMock: MeetProps[] = [
  {
    meetupId: 1,
    meetingType: "STUDY",
    status: "RECRUITING",
    location: "DAEJEON",
    title: "코딩공부",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentStartDate: new Date("2025-01-07"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    hostId: 33,
    hostNickname: "조수아",
    online: false,
    participants: [
      {
        userId: 1,
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
  },
  {
    meetupId: 2,
    meetingType: "STUDY",
    status: "RECRUITING",
    location: "DAEJEON",
    title: "코딩공부",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentStartDate: new Date("2025-01-07"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    hostId: 33,
    hostNickname: "조수아",
    online: false,
    participants: [
      {
        userId: 1,
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
  },
  {
    meetupId: 3,
    meetingType: "TUTORING",
    status: "RECRUITING",
    location: "DAEJEON",
    title: "코딩공부",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentStartDate: new Date("2025-01-07"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    hostId: 33,
    hostNickname: "조수아",
    online: true,
    participants: [
      {
        userId: 1,
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
      {
        userId: 6,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
  },
  {
    meetupId: 4,
    meetingType: "TUTORING",
    status: "RECRUITING",
    location: "DAEJEON",
    title: "게임코칭",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentStartDate: new Date("2025-01-07"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    hostId: 33,
    hostNickname: "조수아",
    online: false,
    participants: [
      {
        userId: 1,
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
      {
        userId: 6,
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
  },
];

export const reviews: ReviewInfo[] = [
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "A",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "B",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "C",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "D",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
  {
    rating: 0,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 1,
    username: "E",
    date: new Date(),
  },
  {
    rating: 1,
    review:
      "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
    userid: 2,
    username: "F",
    userprofile:
      "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
    date: new Date(),
  },
];

export const participants = [
  {
    userId: 1,
    userProfile:
      "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
  },
  {
    userId: 2,
    userProfile:
      "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
  },
  {
    userId: 3,
    userProfile:
      "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
  },
  {
    userId: 4,
    userProfile:
      "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
  },
  {
    userId: 5,
    userProfile:
      "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
  },
];
