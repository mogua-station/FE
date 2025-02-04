import SolidButton from "@/components/common/buttons/SolidButton";

export default function CardReview({ meetupId }: { meetupId: number }) {
  const handleClickReview = (e: React.MouseEvent, meetUpId: number) => {
    e.stopPropagation();

    alert(`${meetUpId} 리뷰 작성`);
  };

  return (
    <SolidButton
      className='mt-6'
      onClick={(e) => handleClickReview(e, meetupId as number)}
    >
      리뷰 작성
    </SolidButton>
  );
}
