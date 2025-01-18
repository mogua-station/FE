import DeleteIcon from "@/assets/images/icons/delete.svg";
import CreateReviewForm from "@/components/create-reaview/CreateReviewForm";

export default function CreateReview() {
  return (
    // TODO: NavBar 없는 레이아웃 적용 필요
    <div className='flex justify-center bg-black'>
      <div className='mx-4 mb-3.5 flex flex-1 flex-col tablet:mx-20 tablet:mb-[171px] tablet:mt-4 desktop:mx-20 desktop:mb-[104px] desktop:mt-[96px] desktop:max-w-[960px]'>
        <div className='hidden items-center justify-between border-b border-gray-900 px-5 py-2.5 *:text-gray-200 tablet:flex'>
          <h2>리뷰 작성하기</h2>
          <button type='button'>
            <DeleteIcon className='size-6' />
          </button>
        </div>
        <p className='mb-10 mt-[34px] text-heading-2 font-medium text-gray-200'>
          모과님 <br /> 이번 모임은 어땠나요?
        </p>
        <CreateReviewForm />
      </div>
    </div>
  );
}
