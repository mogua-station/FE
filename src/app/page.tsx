"use client";

import { useState } from "react";
import KakaoIcon from "@/assets/images/icons/kakao.svg";
import ETCButton from "@/components/common/buttons/ETCButton";
import IconButton from "@/components/common/buttons/IconButton";
import OutlineButton from "@/components/common/buttons/OutlineButton";
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
import { cardList, comments } from "@/data/mockList";
import useModal from "@/hooks/useModal";
import { useSelectedDateRange } from "@/hooks/useSelectedDateRange";
import { type CityType, type StateType } from "@/types/overlay.type";

export default function Home() {
  const { selectedDates, setSelectedDates } = useSelectedDateRange();
  const [state, setState] = useState<StateType>("ALL");
  const [city, setCity] = useState<CityType>("ALL");
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      title: CALENDAR_MODAL_TITLE,
      children: (
        <CalendarModal
          selectedDates={selectedDates}
          onDateChange={(date) => setSelectedDates(date)}
        />
      ),
      isDark: false,
    });
  };

  const handleOpenFilterModal = () => {
    openModal({
      children: (
        <FilterModal
          selectedFilter={{ city, state: state, date: selectedDates }}
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
        <SolidButton>large</SolidButton>

        <SolidButton size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
          <span>small</span>
        </SolidButton>
        <SolidButton size='small' state='inactive'>
          <span>small</span>
        </SolidButton>
        <SolidButton size='small' state='activated'>
          <span>small</span>
        </SolidButton>

        <p className='mt-2 text-white'>SolidButton - Secondary</p>
        <SolidButton variant='secondary'>
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton variant='secondary' state='inactive'>
          large
        </SolidButton>
        <SolidButton variant='secondary' state='activated'>
          large
        </SolidButton>
        <SolidButton variant='secondary' size='small'>
          <span>small</span>
        </SolidButton>
        <SolidButton variant='secondary' size='small' state='inactive'>
          <span>small</span>
        </SolidButton>
        <SolidButton variant='secondary' size='small' state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          <span>small</span>
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>

        <p className='mt-2 text-white'>OutlineButton - Primary</p>
        <OutlineButton state='activated'>large</OutlineButton>
        <OutlineButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </OutlineButton>
        <OutlineButton size='small'>small</OutlineButton>
        <OutlineButton size='small' state='inactive'>
          small
        </OutlineButton>
        <OutlineButton size='small' state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          small
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>

        <p className='mt-2 text-white'>OutlineButton - Secondary</p>
        <OutlineButton className='h-[54px]' variant='secondary'>
          new
        </OutlineButton>
        <OutlineButton variant='secondary'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
        </OutlineButton>
        <OutlineButton variant='secondary'>
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>
        <OutlineButton variant='secondary'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>
        <OutlineButton variant='secondary' size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>

        <p className='mt-2 text-white'>IconButton</p>
        <IconButton>
          <KakaoIcon className='size-6' />
        </IconButton>
        <IconButton size='small'>
          <KakaoIcon className='size-6' />
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

        <p className='mt-2 text-white'>스페샬🥲</p>
        <SolidButton mode='special'>label</SolidButton>
        <IconButton mode='special'>
          <KakaoIcon className='size-6' />
        </IconButton>
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
          return <Review reviewInfo={review} />;
        })}
      </div>
    </div>
  );
}
