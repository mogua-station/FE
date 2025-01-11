import RecruitingIcon from "@/assets/images/icons/announcement-megaphone.svg";
import FireIcon from "@/assets/images/icons/fire.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import HandIcon from "@/assets/images/icons/waving-hand.svg";
import { type StateType } from "@/types/meetup.type";

export default function StateModal({
  selectedState,
  onStateChange,
}: {
  selectedState: StateType;
  onStateChange: (state: StateType) => void;
}) {
  const states = [
    {
      key: "ALL",
      label: "모든 모임 보기",
      icon: PlanetIcon,
    },
    {
      key: "RECRUITING",
      label: "모집 중이에요",
      icon: RecruitingIcon,
    },
    {
      key: "IN_PROGRESS",
      label: "진행 중이에요",
      icon: FireIcon,
    },
    {
      key: "COMPLETED",
      label: "종료된 모임이에요",
      icon: HandIcon,
    },
  ];

  const getButtonStyle = (state: string) =>
    state === selectedState
      ? "border-gray-700 bg-gray-900 text-orange-300"
      : "border-gray-800 bg-gray-800 text-gray-400";

  return (
    <div className='flex w-full grow flex-col items-center justify-between'>
      <div className='flex w-full grow flex-col gap-[.6875rem] px-3 pt-4'>
        {states.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`flex h-16 w-full items-center gap-2.5 rounded-2xl border px-6 py-4 ${getButtonStyle(
              key,
            )}`}
            onClick={() => onStateChange(key as StateType)}
          >
            <Icon className='size-6' />
            <span className='text-body-2-normal font-medium'>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
