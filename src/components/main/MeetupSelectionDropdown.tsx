import { memo } from "react";
import Dropdown from "../common/Dropdown";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import { type MeetupType } from "@/types/meetup.type";

function MeetupSelectionDropdown({
  selectedMeetup,
  onSelectMeetup,
}: {
  selectedMeetup: MeetupType;
  onSelectMeetup: (meetup: MeetupType) => void;
}) {
  return (
    <Dropdown
      defaultSelected={selectedMeetup}
      align='LL'
      content={[
        {
          label: "스터디",
          value: "STUDY",
          onClick: () => onSelectMeetup("STUDY"),
        },
        {
          label: "과외",
          value: "TUTORING",
          onClick: () => onSelectMeetup("TUTORING"),
        },
      ]}
    >
      <div className='filter-sm filter-default min-w-[6.1875rem] gap-2.5'>
        <span className='grow text-body-2-normal font-semibold text-gray-200'>
          {selectedMeetup === "STUDY" ? "스터디" : "과외"}
        </span>
        <ArrowDownIcon className='size-6 fill-gray-300' />
      </div>
    </Dropdown>
  );
}

export default memo(MeetupSelectionDropdown);
