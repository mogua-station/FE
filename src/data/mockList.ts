import { type CardProps } from "@/types/card";
import { type MeetProps } from "@/types/meetDetail";
import { type ReviewInfo } from "@/types/review";

export const cardList: CardProps[] = [
  {
    meetupId: 1,
    status: "IN_PROGRESS",
    meetingType: "STUDY",
    title: "모각각코",
    location: "CAPITAL",
    participants: [],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-01"),
    recruitmentEndDate: new Date("2025-01-05"),
    meetingStartDate: new Date("2025-01-15"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    online: false,
  },
  {
    meetupId: 2,
    status: "RECRUITING",
    meetingType: "STUDY",
    title: "모집집코",
    location: "CAPITAL",
    participants: [],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-01"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    online: true,
  },
  {
    meetupId: 3,
    status: "RECRUITING",
    meetingType: "STUDY",
    title: "코딩공부",
    location: "CAPITAL",
    participants: [],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-01"),
    recruitmentEndDate: new Date("2025-01-20"),
    meetingStartDate: new Date("2025-01-25"),
    meetingEndDate: new Date("2025-02-05"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    online: true,
  },
  {
    meetupId: 4,
    status: "COMPLETED",
    meetingType: "TUTORING",
    title: "게임코칭",
    location: "CAPITAL",
    participants: [],
    minParticipants: 4,
    recruitmentStartDate: new Date("2025-01-01"),
    recruitmentEndDate: new Date("2025-01-10"),
    meetingStartDate: new Date("2025-01-11"),
    meetingEndDate: new Date("2025-01-15"),
    thumbnail:
      "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    online: false,
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
    id: 1,
    meetingType: "TUTORING",
    isOnline: false,
    meetingState: "RECRUITING",
    location: "DAEJEON",
    title: "모각각코",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentDate: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-20"),
    },
    meetingDate: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isWishlist: false,
    host: {
      userId: 33,
      userName: "모과씨",
      userProfile:
        "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
    },
    users: [
      {
        userId: 1,
        userName: "A",
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userName: "B",
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userName: "C",
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userName: "D",
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userName: "E",
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
    reviews: [
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
    ],
  },
  {
    id: 2,
    meetingType: "TUTORING",
    isOnline: false,
    meetingState: "RECRUITING",
    location: "DAEJEON",
    title: "모집집코",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentDate: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-20"),
    },
    meetingDate: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isWishlist: false,
    host: {
      userId: 33,
      userName: "모과씨",
      userProfile:
        "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
    },
    users: [
      {
        userId: 1,
        userName: "A",
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userName: "B",
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userName: "C",
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userName: "D",
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userName: "E",
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
    reviews: [
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
    ],
  },
  {
    id: 3,
    meetingType: "TUTORING",
    isOnline: false,
    meetingState: "RECRUITING",
    location: "DAEJEON",
    title: "코딩공부",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentDate: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-20"),
    },
    meetingDate: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isWishlist: false,
    host: {
      userId: 33,
      userName: "모과씨",
      userProfile:
        "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
    },
    users: [
      {
        userId: 1,
        userName: "A",
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userName: "B",
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userName: "C",
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userName: "D",
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userName: "E",
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
    reviews: [
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
    ],
  },
  {
    id: 4,
    meetingType: "TUTORING",
    isOnline: false,
    meetingState: "RECRUITING",
    location: "DAEJEON",
    title: "게임코칭",
    content: "test1234123412",
    maxParticipants: 10,
    minParticipants: 3,
    recruitmentDate: {
      startDate: new Date("2025-01-07"),
      endDate: new Date("2025-01-20"),
    },
    meetingDate: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-05"),
    },
    thumbnail:
      "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    isWishlist: false,
    host: {
      userId: 33,
      userName: "모과씨",
      userProfile:
        "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
    },
    users: [
      {
        userId: 1,
        userName: "A",
        userProfile:
          "https://cdn.pixabay.com/photo/2023/05/03/10/37/character-7967244_640.png",
      },
      {
        userId: 2,
        userName: "B",
        userProfile:
          "https://cdn.pixabay.com/photo/2024/02/10/15/03/flowers-8564948_640.png",
      },
      {
        userId: 3,
        userName: "C",
        userProfile:
          "https://cdn.pixabay.com/photo/2022/09/05/16/17/baltic-sea-7434540_640.jpg",
      },
      {
        userId: 4,
        userName: "D",
        userProfile:
          "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_640.jpg",
      },
      {
        userId: 5,
        userName: "E",
        userProfile:
          "https://cdn.pixabay.com/photo/2020/05/19/13/21/star-5190776_640.jpg",
      },
    ],
    reviews: [
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
    ],
  },
];
