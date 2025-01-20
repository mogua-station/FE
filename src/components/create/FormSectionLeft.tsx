import { useEffect } from "react";
import {
  type UseFormWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import CommonImageInput from "../common/inputs/ImageUpload";
import CommonSelectBox from "../common/inputs/SelectBox";
import CommonTextArea from "../common/inputs/TextArea";
import CommonTextInput from "../common/inputs/TextInput";
import LocationIcon from "@/assets/images/icons/location.svg";
import { type MeetupFormType } from "@/types/meetup.type";

export default function FormSectionLeft({
  setImage,
  control,
  watch,
  setValue,
}: {
  setImage: (image: File | null) => void;
  control: Control<MeetupFormType>;
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
}) {
  const isOnline = watch("isOnline");

  useEffect(() => {
    if (isOnline) {
      setValue("location", null);
    }
  }, [isOnline, setValue]);

  return (
    <section className='flex flex-1 flex-col gap-10'>
      <CommonTextInput
        required={true}
        name='title'
        label='제목'
        control={control}
        rules={{
          required: "제목을 입력해주세요.",
        }}
      />
      <div
        className={`relative h-fit w-full overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOnline ? "max-h-0" : "max-h-screen"}`}
      >
        <CommonSelectBox
          required={!isOnline}
          control={control}
          name='location'
          label='장소'
          placeholder='장소를 선택해주세요.'
          options={[
            { label: "서울", value: "서울" },
            { label: "대전", value: "대전" },
            { label: "광주", value: "광주" },
            { label: "부산", value: "부산" },
            { label: "대구", value: "대구" },
            { label: "강릉", value: "강릉" },
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

      <CommonTextArea
        required={true}
        name='content'
        label='본문'
        control={control}
        rules={{
          required: "내용을 입력해주세요.",
        }}
        className='h-40 max-h-40 resize-none bg-gray-950'
      />
    </section>
  );
}
