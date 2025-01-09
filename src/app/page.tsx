"use client";

import { useState } from "react";
import KakaoIcon from "@/assets/images/icons/kakao.svg";
import ETCButton from "@/components/common/buttons/ETCButton";
import IconButton from "@/components/common/buttons/IconButton";
import OutlinePrimaryButton from "@/components/common/buttons/OutlinePrimaryButton";
import OutlineSecondaryButton from "@/components/common/buttons/OutlineSecondaryButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import Calendar from "@/components/common/Calendar";
import Card from "@/components/common/card/Card";
import Dropdown from "@/components/common/Dropdown";
import {
  CALENDAR_MODAL_TITLE,
  CalendarModal,
} from "@/components/common/modals/CalendarModal";
import FilterModal from "@/components/common/modals/FilterModal";
import Popover from "@/components/common/Popover";
import Review from "@/components/common/review/Review";
import useModal from "@/hooks/useModal";
import { useSelectedDateRange } from "@/hooks/useSelectedDateRange";
import { type CardProps } from "@/types/card";
import { type CityType, type StateType } from "@/types/overlay.type";
import { type ReviewInfo } from "@/types/review";

export default function Home() {
  const cardList: CardProps[] = [
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

  const comments: ReviewInfo[] = [
    {
      rating: 4,
      review:
        "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
      userid: 1,
      username: "모과",
      date: new Date(),
    },
    {
      rating: 2,
      review:
        "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
      userid: 2,
      username: "목목과",
      userprofile:
        "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
      date: new Date(),
    },
    {
      rating: 3,
      title: "모각코 모임",
      review:
        "이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다",
      userid: 3,
      username: "모곽",
      userprofile:
        "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
      date: new Date(),
      isMyReview: true,
      eventId: 14,
      eventType: "tutoring",
    },
  ];

  const { selectedDates, setSelectedDates } = useSelectedDateRange();
  const [state, setState] = useState<StateType>("ALL");
  const [city, setCity] = useState<CityType>("ALL");
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      title: CALENDAR_MODAL_TITLE,
      children: (
        <CalendarModal onDateChange={(date) => setSelectedDates(date)} />
      ),
      isDark: false,
    });
  };

  const handleOpenFilterModal = () => {
    openModal({
      children: (
        <FilterModal
          onDateChange={(date) => setSelectedDates(date)}
          onStateChange={(state) => setState(state)}
          onCityChange={(city) => setCity(city)}
        />
      ),
    });
  };

  return (
    <div>
      <h1>møgua project</h1>
      {/* SVGR */}
      <KakaoIcon className='size-10 text-yellow-400' />

      {/* 버튼 */}
      <div className='my-4 flex flex-col gap-2 bg-black p-4'>
        <p className='text-white'>SolidButton - Primary</p>
        <SolidButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </SolidButton>
        <div className='flex gap-2'>
          <SolidButton size='small'>
            <span>small</span>
          </SolidButton>
          <SolidButton size='small' state='inactive'>
            <span>small</span>
          </SolidButton>
          <SolidButton size='small' state='activated'>
            <span>small</span>
          </SolidButton>
        </div>

        <p className='mt-2 text-white'>SolidButton - Secondary</p>
        <SolidButton hierarchy='secondary'>
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton hierarchy='secondary' state='inactive'>
          large
        </SolidButton>
        <SolidButton hierarchy='secondary' state='activated'>
          large
        </SolidButton>
        <div className='flex gap-2'>
          <SolidButton hierarchy='secondary' size='small'>
            <span>small</span>
          </SolidButton>
          <SolidButton hierarchy='secondary' size='small' state='inactive'>
            <span>small</span>
          </SolidButton>
          <SolidButton hierarchy='secondary' size='small' state='activated'>
            <span>small</span>
          </SolidButton>
        </div>

        <p className='mt-2 text-white'>OutlineButton - Primary</p>
        <OutlinePrimaryButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlinePrimaryButton>
        <OutlinePrimaryButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </OutlinePrimaryButton>
        <div className='flex gap-2'>
          <OutlinePrimaryButton size='small'>
            <span>small</span>
          </OutlinePrimaryButton>
          <OutlinePrimaryButton size='small' state='inactive'>
            <span>small</span>
          </OutlinePrimaryButton>
          <OutlinePrimaryButton size='small' state='activated'>
            <span>small</span>
          </OutlinePrimaryButton>
        </div>

        <p className='mt-2 text-white'>OutlineButton - Secondary</p>
        <div className='it flex flex-wrap gap-2'>
          <OutlineSecondaryButton>large</OutlineSecondaryButton>
          <OutlineSecondaryButton>
            <div className='size-6 rounded-[6px] border border-white' />
            large
          </OutlineSecondaryButton>
          <OutlineSecondaryButton>
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
          <OutlineSecondaryButton>
            <div className='size-6 rounded-[6px] border border-white' />
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
          <OutlineSecondaryButton size='small'>
            <div className='size-6 rounded-[6px] border border-white' />
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
        </div>
        <p className='mt-2 text-white'>IconButton</p>
        <IconButton>
          <div className='size-6 rounded-[6px] border border-white' />
        </IconButton>
        <IconButton size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
        </IconButton>
        <p className='mt-2 text-white'>ETCButton</p>
        <ETCButton>
          <div className='size-6 rounded-[6px] border border-white' />
          label
          <div className='size-6 rounded-[6px] border border-white' />
        </ETCButton>
        <ETCButton state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          label
          <div className='size-6 rounded-[6px] border border-white' />
        </ETCButton>
      </div>

      {/* 타이포그라피 */}
      <h2 className='my-4 text-title-2 font-semibold text-blue-200'>
        Typography
      </h2>
      <ul>
        <li>
          <p className='text-title-1 font-bold text-primary'>
            Title 1 / 24px-Bold
          </p>
        </li>
        <li>
          <p className='text-title-2 font-semibold text-red-200'>
            Title 2 / 22px-Semibold
          </p>
        </li>
        <li>
          <p className='text-heading-1 font-medium'>Heading 1 / 20px-Medium</p>
        </li>
        <li>
          <p className='text-heading-2 font-regular'>
            Heading 2 / 18px-Regular
          </p>
        </li>
        <li>
          <p className='text-body-1-normal font-light'>
            Body 1-Normal / 26x-Light
          </p>
        </li>
        <li>
          <p className='text-body-2-reading font-bold'>
            Body 2-Reading / 18px-Bold
          </p>
        </li>
        <li>
          <p className='text-label-normal font-semibold'>
            Label Normal / 13px-Semibold
          </p>
        </li>
        <li>
          <p className='text-label-reading font-medium'>
            Label Reading / 13px-Medium
          </p>
        </li>
        <li>
          <p className='text-caption-normal font-regular'>
            Caption Normal / 12px-Regular
          </p>
        </li>
        <li>
          <p className='text-caption-reading font-light'>
            Caption Reading / 12px-Light
          </p>
        </li>
      </ul>

      {/* 드롭다운 */}
      <div className='flex justify-center gap-4'>
        <Dropdown
          defaultSelected='Hello, World! 1'
          align='RR'
          content={[
            {
              label: "Hello, World! 1",
              onClick: () => {
                console.log("onClick");
              },
            },
            {
              label: "Hello, World! 2",
              value: "Hello2",
              onClick: () => {
                console.log("onClick");
              },
            },
            {
              label: "Hello, World! 3",
              value: "Hello3",
              onClick: () => {
                console.log("onClick");
              },
            },
          ]}
        >
          <div className='filter-sm filter-default'>{"버튼"}</div>
        </Dropdown>

        <Popover content={<div className='w-max'>팝오버</div>}>
          <div>버튼</div>
        </Popover>
      </div>

      <div className='mt-10 px-5'>
        {cardList.map((item) => {
          return <Card card={item} />;
        })}
      </div>

      {/* calendar */}
      <div className='mx-auto w-fit bg-gray-900'>
        <Calendar onDateChange={(date) => setSelectedDates(date)} />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h1>Selected Date</h1>
        <p>
          {selectedDates.startDate?.toLocaleDateString()} ~{" "}
          {selectedDates.endDate?.toLocaleDateString()}
        </p>
      </div>

      {/* 브레이크 포인트 */}
      <div className='bg-gray-200 text-center'>
        <p className='tablet:hidden'>모바일</p>
        <p className='hidden tablet:block desktop:hidden'>태블릿</p>
        <p className='hidden desktop:block'>데스크탑</p>
      </div>

      {/* modal */}
      <div className='flex items-center gap-6'>
        <button
          onClick={handleOpenModal}
          className='h-24 w-40 bg-gray-700 text-center text-gray-100'
        >
          Open Modal
        </button>

        <button
          onClick={handleOpenFilterModal}
          className='h-24 w-40 bg-gray-700 text-center text-gray-100'
        >
          Open Filter Modal
        </button>

        <p>{state}</p>

        <p>{city}</p>
      </div>

      {/* lorem */}
      <p className='text-body-1-normal'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        laborum labore autem aut maxime quam vel eligendi. Fugiat, earum
        voluptas, eos debitis rerum nostrum quis, quaerat odit labore distinctio
        optio? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Recusandae laborum labore autem aut maxime quam vel eligendi. Fugiat,
        earum voluptas, eos debitis rerum nostrum quis, quaerat odit labore
        distinctio optio? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Recusandae laborum labore autem aut maxime quam vel eligendi.
        Fugiat, earum voluptas, eos debitis rerum nostrum quis, quaerat odit
        labore distinctio optio? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Recusandae laborum labore autem aut maxime quam vel
        eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum quis,
        quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio?
      </p>

      <div className='flex flex-col gap-2'>
        {comments.map((review) => {
          return <Review reviewinfo={review} />;
        })}
      </div>
    </div>
  );
}
