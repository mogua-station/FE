import { memo } from "react";
import Dropdown from "../common/Dropdown";
import FilterIcon from "@/assets/images/icons/filter.svg";
import OrderIcon from "@/assets/images/icons/sort.svg";
import { type OrderType } from "@/types/meetup.type";

function FilterControls({
  selectedOrder,
  onOrderChange,
  onOpenFilterModal,
}: {
  selectedOrder: OrderType;
  onOrderChange: (order: OrderType) => void;
  onOpenFilterModal: () => void;
}) {
  return (
    <div className='flex gap-1.5'>
      <button
        onClick={onOpenFilterModal}
        className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'
        aria-label='Filter'
      >
        <FilterIcon className='size-6 fill-gray-300' />
      </button>

      <Dropdown
        defaultSelected={selectedOrder}
        content={[
          {
            label: "최근 등록순",
            value: "latest",
            onClick: () => onOrderChange("latest"),
          },
          {
            label: "모집 마감 임박순",
            value: "deadline",
            onClick: () => onOrderChange("deadline"),
          },
          {
            label: "참여 인원 많은순",
            value: "participant",
            onClick: () => onOrderChange("participant"),
          },
        ]}
      >
        <div className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'>
          <OrderIcon className='size-6 stroke-gray-300' />
        </div>
      </Dropdown>
    </div>
  );
}

export default memo(FilterControls);
