"use client";

import KakaoIcon from "@/assets/images/icons/kakao.svg";
import Card from "@/components/common/Card";
import Dropdown from "@/components/common/Dropdown";
import Popover from "@/components/common/Popover";

export default function Home() {
  const cardList = [
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
      review: true,
    },
  ];

  return (
    <div>
      <h1>møgua project</h1>
      <KakaoIcon className='size-10 text-yellow-400' />
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
          return (
            <Card
              id={item.id}
              status={item.status}
              itemType={item.itemType}
              title={item.title}
              location={item.location}
              participants={item.participants}
              recruitmentPeriod={item.recruitmentPeriod}
              eventPeriod={item.eventPeriod}
              image={item.image}
              review={item.review}
            />
          );
        })}
      </div>
    </div>
  );
}
