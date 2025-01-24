import Image from "next/image";
import { useEffect, useState } from "react";
import {
  type UseFormWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import CommonImageInput from "../common/inputs/ImageUpload";
import CommonSelectBox from "../common/inputs/SelectBox";
import CommonTextInput from "../common/inputs/TextInput";
import { FormatTypeSelection } from "./inputs/FormatTypeSelection";
import MeetingTypeSelection from "./inputs/MeetingTypeSelection";
import LocationIcon from "@/assets/images/icons/location.svg";
import { type MeetupFormType } from "@/types/meetup.type";

export default function FormSectionLeft({
  initImage,
  control,
  watch,
  setValue,
  isTutor = false,
  isEdit = false,
  setRemovedInitImage,
}: {
  initImage?: string;
  control: Control<MeetupFormType>;
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
  isTutor?: boolean;
  isEdit?: boolean;
  setRemovedInitImage?: (value: boolean) => void;
}) {
  const isOnline = watch("isOnline");
  const [hasInitImage, setHasInitImage] = useState(!!initImage);

  useEffect(() => {
    if (isOnline) {
      setValue("location", null);
    }
  }, [isOnline, setValue]);

  return (
    <section className='flex flex-1 flex-col gap-10'>
      <MeetingTypeSelection
        watch={watch}
        setValue={setValue}
        isTutor={isTutor}
        isDisabled={isEdit}
      />

      <CommonTextInput
        required={true}
        name='title'
        label='제목'
        control={control}
        rules={{
          required: "제목을 입력해주세요.",
        }}
      />

      <FormatTypeSelection
        watch={watch}
        setValue={setValue}
        isDisabled={isEdit}
      />

      <div
        className={`relative h-fit w-full overflow-hidden duration-500 ease-in-out ${isOnline ? "max-h-0" : "max-h-screen"}`}
      >
        <CommonSelectBox
          required={!isOnline}
          control={control}
          name='location'
          label='장소'
          placeholder='장소를 선택해주세요.'
          options={[
            { label: "수도권", value: "CAPITAL" },
            { label: "대전", value: "DAEJEON" },
            { label: "전주", value: "JEONJU" },
            { label: "광주", value: "GWANGJU" },
            { label: "부산", value: "BUSAN" },
            { label: "대구", value: "DAEGU" },
            { label: "강릉", value: "GANGNEUNG" },
          ]}
          layout='1col'
          rules={{
            required: !isOnline ? "장소를 선택해주세요." : undefined,
          }}
          disabled={isEdit}
        />

        <LocationIcon className='absolute right-4 top-[calc(50%+18px)] size-6 -translate-y-1/2 transform fill-gray-300' />
      </div>

      {hasInitImage ? (
        <div className='flex flex-col gap-[12px]'>
          <p className='pl-[8px] text-body-2-normal font-medium text-gray-300'>
            이미지
          </p>
          <div className='group relative flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-[12px] border border-gray-800 bg-gray-900'>
            <Image
              src={initImage!}
              alt='Image Preview'
              width={120}
              height={120}
              sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 120px'
              className='h-[120px] w-[120px] rounded-[12px] object-cover group-hover:brightness-50'
            />

            <div
              className='absolute inset-0 flex size-full items-center justify-center'
              onClick={() => {
                setRemovedInitImage?.(true);
                setHasInitImage(false);
              }}
            >
              <div className='left-12 top-12 z-10 hidden h-[24px] w-[24px] items-center justify-center rounded-[7px] bg-[#28292E] p-1 text-center text-label-normal font-semibold text-[#C4C4C4] group-hover:block'>
                X
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CommonImageInput label='이미지' />
      )}
    </section>
  );
}
