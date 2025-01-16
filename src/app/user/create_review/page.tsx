import CreateReviewForm from "@/components/create-reaview/CreateReviewForm";

export default function CreateReview() {
  return (
    <div className='flex flex-1 flex-col bg-black px-4 py-3.5'>
      <h2 className='mb-10 mt-[32px] text-heading-2 font-medium text-gray-200'>
        모과님 <br /> 이번 모임은 어땠나요?
      </h2>
      <CreateReviewForm />
    </div>
  );
}
