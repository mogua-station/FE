import SolidButton from "../../common/buttons/SolidButton";
import CommonTextInput from "../../common/inputs/TextInput";
import MinusIcon from "@/assets/images/icons/minus.svg";
import PlusIcon from "@/assets/images/icons/plus.svg";
import { type BaseFormProps } from "@/types/meetup.type";

interface ParticipantsInputProps extends BaseFormProps {
  name: "minParticipants" | "maxParticipants";
  label: string;
  hasError: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function ParticipantsInput({
  control,
  name,
  label,
  hasError,
  onDecrease,
  onIncrease,
  watch,
}: ParticipantsInputProps) {
  const isMin = name === "minParticipants";

  return (
    <div
      className={`flex w-full gap-1.5 ${hasError ? "items-center" : "items-end"}`}
    >
      <div className='flex-1'>
        <CommonTextInput
          type='number'
          min={2}
          max={10}
          required={true}
          name={name}
          label={label}
          control={control}
          rules={{
            required: `${label}을 입력해주세요.`,
            max: {
              value: isMin ? watch("maxParticipants") : 10,
              message: isMin
                ? "최소 인원은 모집 인원보다 많을 수 없습니다."
                : "모집 인원은 10명을 넘을 수 없습니다.",
            },
            min: {
              value: isMin ? 2 : watch("minParticipants"),
              message: isMin
                ? "최소 인원은 2명 이상이어야 합니다."
                : "모집 인원은 최소 인원보다 적을 수 없습니다.",
            },
          }}
        />
      </div>
      <div className='flex w-[9.375rem] items-center gap-1.5'>
        <SolidButton type='button' onClick={onDecrease}>
          <MinusIcon className='size-6 fill-gray-300' />
        </SolidButton>
        <SolidButton type='button' onClick={onIncrease}>
          <PlusIcon className='size-6 fill-gray-300' />
        </SolidButton>
      </div>
    </div>
  );
}
