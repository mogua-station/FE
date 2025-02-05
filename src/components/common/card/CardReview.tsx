import { useRouter } from "next/navigation";
import SolidButton from "@/components/common/buttons/SolidButton";

export default function CardReview({ meetupId }: { meetupId: number }) {
  const router = useRouter();

  const handleClickReview = (e: React.MouseEvent, meetUpId: number) => {
    e.stopPropagation();

    router.push(`/user/create_review?meetupId=${meetUpId}`);
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
