import { useEffect } from "react";
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
  setImage,
  control,
  watch,
  setValue,
  isTutor = false,
}: {
  setImage: (image: File | null) => void;
  control: Control<MeetupFormType>;
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
  isTutor?: boolean;
}) {
  const isOnline = watch("isOnline");

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

      <FormatTypeSelection watch={watch} setValue={setValue} />

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
        />

        <LocationIcon className='absolute right-4 top-[calc(50%+18px)] size-6 -translate-y-1/2 transform fill-gray-300' />
      </div>

      <CommonImageInput
        label='이미지'
        onImageChange={(image: File | null) => setImage(image)}
      />
    </section>
  );
}
