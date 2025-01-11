import { useState, useEffect } from "react";
import SolidButton from "../buttons/SolidButton";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import useModal from "@/hooks/useModal";
import { type CityType } from "@/types/meetup.type";

export default function CityModal({
  selectedCity,
  onCityChange,
}: {
  selectedCity: CityType;
  onCityChange: (city: CityType) => void;
}) {
  const { closeModal } = useModal();
  const [currentCity, setCurrentCity] = useState<CityType>(selectedCity);

  useEffect(() => {
    setCurrentCity(selectedCity);
  }, [selectedCity]);

  const handleCityReset = () => {
    onCityChange("ALL");
    setCurrentCity("ALL");
  };

  const handleComplete = () => {
    onCityChange(currentCity);
    closeModal();
  };

  const cityMap = {
    ALL: "전체",
    Capital: "수도권",
    DAEJEON: "대전",
    JEONJU: "전주",
    GWANGJU: "광주",
    BUSAN: "부산",
    DAEGU: "대구",
    GANGNEUNG: "강릉",
  };

  const renderCity = (city: CityType) => {
    const selectedStyle =
      city === currentCity ? "text-orange-300" : "text-gray-400";

    return (
      <button
        key={city}
        className={`flex h-16 w-full items-center gap-2.5 rounded-2xl border px-6 py-4 ${city === currentCity ? "border-gray-700 bg-gray-900" : "border-gray-800 bg-gray-800"}`}
        onClick={() => {
          setCurrentCity(city as CityType);
        }}
      >
        <span
          className={`w-full text-center text-body-2-normal font-medium ${selectedStyle}`}
        >
          {cityMap[city as CityType]}
        </span>
      </button>
    );
  };

  return (
    <div className='flex w-full grow flex-col items-center justify-between pt-4'>
      <div className='grid w-full grid-cols-2 gap-x-[.4375rem] gap-y-[.6875rem] px-3'>
        {Object.keys(cityMap).map((city) => renderCity(city as CityType))}
      </div>

      <div className='flex h-60 w-[23.4375rem] items-end justify-center gap-[.6875rem] px-5 py-4'>
        <SolidButton
          variant='secondary'
          className='w-fit px-6 py-4'
          onClick={handleCityReset}
        >
          <ResetIcon className='size-6 stroke-gray-400' />
        </SolidButton>

        <SolidButton state='activated' onClick={handleComplete}>
          완료
        </SolidButton>
      </div>
    </div>
  );
}
