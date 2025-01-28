import { useRouter } from "next/navigation";
import SolidButton from "@/components/common/buttons/SolidButton";

export function SuccessModal({
  meetupId,
  close,
  isEdit = false,
}: {
  meetupId: number;
  close: () => void;
  isEdit?: boolean;
}) {
  const router = useRouter();

  const type = isEdit ? "수정" : "개설";

  return (
    <div className='flex w-[17.6875rem] flex-col items-center p-6'>
      <p className='pb-3 text-heading-2 font-medium text-gray-100'>
        모임 {type} 완료
      </p>
      <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
        모임 {type}이 완료되었어요
      </p>
      <div className='flex w-full gap-[.4375rem]'>
        <SolidButton
          onClick={() => {
            close();
            router.push("/");
          }}
          mode='special'
        >
          목록으로
        </SolidButton>
        <SolidButton
          onClick={() => {
            close();
            router.push(`/study/${meetupId}`);
          }}
          state='activated'
        >
          보러가기
        </SolidButton>
      </div>
    </div>
  );
}

export function FailModal({
  title,
  message,
  close,
}: {
  title: string;
  message: string;
  close: () => void;
}) {
  return (
    <div className='flex w-[17.6875rem] flex-col items-center p-6'>
      <p className='pb-3 text-heading-2 font-medium text-gray-100'>{title}</p>
      <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
        {message}
      </p>
      <div className='flex w-full gap-[.4375rem]'>
        <SolidButton mode='special' onClick={close}>
          닫기
        </SolidButton>
      </div>
    </div>
  );
}
