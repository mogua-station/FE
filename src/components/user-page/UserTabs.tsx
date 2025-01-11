"use client";

import { useState, useEffect } from "react";
import MeetingList from "./MeetingList";
import ReviewTabs from "./ReviewTabs";
import StudyTypeFilter from "./StudyTypeFilter";
import TabList from "./TabList";
import { type ReviewInfo } from "@/types/review";
import {
  type UserTabsProps,
  type UserPageSection,
  type StudyType,
  type MyReviewTab,
} from "@/types/user-page";

// 목데이터
const myStudyList = [
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
    id: 3,
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
    id: 4,
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
const myTutoringList = [
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
const reviewableStudyList = [
  {
    id: 3,
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
const reviewableTutoringList = [
  {
    id: 8,
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
const writtenReviews: ReviewInfo[] = [
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
];
const writtenTutoringReviews: ReviewInfo[] = [
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
];
const createdStudyList = [
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
];
const createdTutoringList = [
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
];
const classReviews: ReviewInfo[] = [
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
];

export default function UserTabs({ isInstructor = false }: UserTabsProps) {
  const [currentTab, setCurrentTab] = useState<UserPageSection>("myMeeting");
  const [studyType, setStudyType] = useState<StudyType>("study");
  const [reviewTab, setReviewTab] = useState<MyReviewTab>("toWrite");

  // 필터 표시 여부 조건 수정
  const showStudyTypeFilter =
    currentTab === "myMeeting" || // 내 모임에서는 항상 보임
    (currentTab === "createdMeeting" && isInstructor) || // 만든 모임에서는 과외선생님일 때만 보임
    currentTab === "myReview"; // 내 리뷰에서는 항상 보임 (작성 가능한 리뷰/작성한 리뷰 모두)

  // 현재 선택된 스터디 타입 결정
  const currentStudyType =
    currentTab === "classReview"
      ? "tutoring" // 수강평은 항상 tutoring
      : !isInstructor && currentTab === "createdMeeting"
        ? "study" // 과외선생님이 아닐 때 만든 모임은 항상 study
        : studyType; // 그 외에는 선택된 필터 값 사용

  // 3. 탭 변경시 필터 초기화
  const handleTabChange = (tab: UserPageSection) => {
    setCurrentTab(tab);
    if (tab !== "classReview") {
      setStudyType("study");
    }
    if (tab !== "myReview") {
      setReviewTab("toWrite");
    }
  };

  useEffect(() => {
    console.log("Current State:", {
      tab: currentTab,
      studyType: currentStudyType,
      reviewTab: currentTab === "myReview" ? reviewTab : undefined,
      showFilter: showStudyTypeFilter,
      setReviewTab,
    });
  }, [currentTab, studyType, reviewTab, showStudyTypeFilter, setReviewTab]);

  return (
    <>
      <TabList
        currentTab={currentTab}
        onChange={handleTabChange}
        isInstructor={isInstructor}
      />
      <div
        className='mt-[23.5px] desktop:mt-8'
        role='tabpanel'
        id={`${currentTab}-panel`}
        aria-labelledby={`${currentTab}-tab`}
      >
        {showStudyTypeFilter && (
          <StudyTypeFilter
            key={currentTab}
            value={currentStudyType}
            onChange={setStudyType}
          />
        )}
        {currentTab === "myReview" && (
          <ReviewTabs value={reviewTab} onChange={setReviewTab} />
        )}

        {/* 각 탭별로 studyType에 맞는 목데이터 전달 */}
        {currentTab === "myMeeting" && (
          <MeetingList
            items={currentStudyType === "study" ? myStudyList : myTutoringList}
            variant='myMeeting'
          />
        )}
        {currentTab === "createdMeeting" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? createdStudyList
                : isInstructor
                  ? createdTutoringList
                  : [] // 과외 선생님이 아닐 경우 빈 배열
            }
            variant='createdMeeting'
          />
        )}
        {currentTab === "myReview" && reviewTab === "toWrite" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? reviewableStudyList
                : reviewableTutoringList
            }
            variant={{ type: "myReview", tab: reviewTab }}
          />
        )}
        {currentTab === "myReview" && reviewTab === "written" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? writtenReviews
                : writtenTutoringReviews
            }
            variant={{ type: "myReview", tab: reviewTab }}
          />
        )}
        {currentTab === "classReview" && isInstructor && (
          <MeetingList items={classReviews} variant='classReview' />
        )}
      </div>
    </>
  );
}
