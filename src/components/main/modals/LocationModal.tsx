import { type LocationType } from "@/types/meetup.type";

export default function LocationModal({
  selectedLocation,
  onLocationChange,
}: {
  selectedLocation: LocationType;
  onLocationChange: (location: LocationType) => void;
}) {
  const cities = [
    { key: "ALL", label: "전체" },
    { key: "CAPITAL", label: "수도권" },
    { key: "DAEJEON", label: "대전" },
    { key: "JEONJU", label: "전주" },
    { key: "GWANGJU", label: "광주" },
    { key: "BUSAN", label: "부산" },
    { key: "DAEGU", label: "대구" },
    { key: "GANGNEUNG", label: "강릉" },
  ];

  const getButtonStyle = (location: string) =>
    location === selectedLocation
      ? "border-gray-700 bg-gray-900 text-orange-300"
      : "border-gray-800 bg-gray-800 text-gray-400";

  return (
    <div className='flex w-full grow flex-col items-center justify-between pt-4'>
      <div className='grid w-[23.4375rem] grid-cols-2 gap-x-[.4375rem] gap-y-[.6875rem] px-3'>
        {cities.map(({ key, label }) => (
          <button
            key={key}
            className={`flex h-16 w-full items-center gap-2.5 rounded-2xl border px-6 py-4 ${getButtonStyle(
              key,
            )}`}
            onClick={() => onLocationChange(key as LocationType)}
          >
            <span className='w-full text-center text-body-2-normal font-medium'>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
