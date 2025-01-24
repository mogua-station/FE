import { type ReviewTabsProps, type MyReviewTab } from "@/types/user-page";

const REVIEW_TABS = [
  { value: "toWrite", label: "작성 가능한 리뷰" },
  { value: "written", label: "작성한 리뷰" },
];

export default function ReviewTabs({ value, onChange }: ReviewTabsProps) {
  return (
    <div
      className='mb-4 mt-2 flex w-full rounded-xl bg-gray-950 p-[5px]'
      role='tablist'
    >
      {REVIEW_TABS.map((tab) => {
        const activeStyle =
          value === tab.value ? "text-gray-100 bg-gray-600" : "text-gray-400";

        return (
          <button
            className={`${activeStyle} flex-1 rounded-xl px-3.5 py-2.5 text-body-2-normal font-medium`}
            role='tab'
            key={tab.value}
            aria-selected={value === tab.value}
            onClick={() => onChange(tab.value as MyReviewTab)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
