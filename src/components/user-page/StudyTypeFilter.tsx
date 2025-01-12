"use client";

import ArrowDownIcon from "@/assets/images/icons/arrow_left.svg";
import Dropdown from "@/components/common/Dropdown";
import { type StudyType } from "@/types/user-page";

interface StudyTypeFilterProps {
  value: StudyType;
  onChange: (value: StudyType) => void;
}

const STUDY_TYPE_OPTIONS = [
  { label: "스터디", value: "study" },
  { label: "과외", value: "tutoring" },
];

export default function StudyTypeFilter({
  value,
  onChange,
}: StudyTypeFilterProps) {
  return (
    <Dropdown
      align='LL'
      content={STUDY_TYPE_OPTIONS.map((option) => ({
        ...option,
        onClick: (value) => onChange(value as StudyType),
      }))}
      defaultSelected={
        STUDY_TYPE_OPTIONS.find((option) => option.value === value)?.label
      }
    >
      <div className='filter-sm filter-default mb-4 flex cursor-pointer items-center gap-2.5'>
        <span className='text-nowrap'>
          {STUDY_TYPE_OPTIONS.find((option) => option.value === value)?.label}
        </span>
        <ArrowDownIcon className='size-6 -rotate-90 text-gray-500' />
      </div>
    </Dropdown>
  );
}
