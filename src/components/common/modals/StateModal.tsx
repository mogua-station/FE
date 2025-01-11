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
  const stateMap = {
    ALL: "모든 모임 보기",
    RECRUITING: "모집 중이에요",
    IN_PROGRESS: "진행 중이에요",
    COMPLETED: "종료된 모임이에요",
  };

  const renderState = (state: StateType) => {
    const selectedStyle =
      state === selectedState ? "text-orange-300" : "text-gray-400";

    const stateIconMap = {
      ALL: <PlanetIcon className={`size-6 ${selectedStyle}`} />,
      RECRUITING: <RecruitingIcon className={`size-6 ${selectedStyle}`} />,
      IN_PROGRESS: <FireIcon className={`size-6 ${selectedStyle}`} />,
      COMPLETED: <HandIcon className={`size-6 ${selectedStyle}`} />,
    };

    return (
      <button
        key={state}
        className={`flex h-16 w-full items-center gap-2.5 rounded-2xl border px-6 py-4 ${state === selectedState ? "border-gray-700 bg-gray-900" : "border-gray-800 bg-gray-800"}`}
        onClick={() => {
          onStateChange(state);
        }}
      >
        {stateIconMap[state]}

        <span className={`text-body-2-normal font-medium ${selectedStyle}`}>
          {stateMap[state]}
        </span>
      </button>
    );
  };

  return (
    <div className='flex w-full grow flex-col items-center justify-between'>
      <div className='flex w-full grow flex-col gap-[.6875rem] px-3 pt-4'>
        {Object.keys(stateMap).map((state) => renderState(state as StateType))}
      </div>
    </div>
  );
}
