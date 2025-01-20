import { useRouter } from "next/navigation";
import SolidButton from "@/components/common/buttons/SolidButton";
import useModal from "@/hooks/useModal";

export function SuccessModal({
  data,
}: {
  data: { data: { meetupId: number } };
}) {
  const { closeModal } = useModal();
  const router = useRouter();

  return (
    <div className='flex w-[17.6875rem] flex-col items-center p-6'>
      <p className='pb-3 text-heading-2 font-medium text-gray-100'>
        모임 개설 완료
      </p>
      <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
        모임 개설이 완료되었어요
      </p>
      <div className='flex w-full gap-[.4375rem]'>
        <SolidButton
          onClick={() => {
            closeModal();
            router.push("/");
          }}
        >
          목록으로
        </SolidButton>
        <SolidButton
          onClick={() => {
            closeModal();
            router.push(`/study/${data.data.meetupId}`);
          }}
          state='activated'
        >
          보러가기
        </SolidButton>
      </div>
    </div>
  );
}

export function FailModal() {
  const { closeModal } = useModal();
  return (
    <div className='flex w-[17.6875rem] flex-col items-center p-6'>
      <p className='pb-3 text-heading-2 font-medium text-gray-100'>
        모임 개설 실패
      </p>
      <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
        모임 개설 중 오류가 발생했어요.
      </p>
      <div className='flex w-full gap-[.4375rem]'>
        <SolidButton onClick={() => closeModal()}>닫기</SolidButton>
      </div>
    </div>
  );
}
