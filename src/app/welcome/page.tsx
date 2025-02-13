import Image from "next/image";
import Link from "next/link";
import SolidButton from "@/components/common/buttons/SolidButton";

const WelcomePage = () => {
  return (
    <div className='relative flex h-full grow flex-col items-center justify-center'>
      <div className='flex w-full flex-col gap-[24px] px-4 pb-[56px] tablet:m-20 tablet:w-[90%] tablet:rounded-[40px] tablet:px-[40px] tablet:py-[56px] desktop:w-[40%]'>
        <div className='flex flex-col text-title-1 font-semibold text-gray-100'>
          <p>모과와 함께</p>
          <p>나의 모임행성을 찾아보세요</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-body-1-reading font-medium text-gray-300'>
            더 이상 복잡한 검색은 그만! 모과에서 원하는 모임과 과외를 한 번에
            찾아보세요
          </p>
        </div>
        <div className='flex w-full items-center justify-center'>
          <Image
            src='/images/welcome_planet.svg'
            alt='Welcome Planet'
            width={500}
            height={500}
            priority
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Link href='/sign-in'>
            <SolidButton type='button' state='activated'>
              가입하기
            </SolidButton>
          </Link>
          <Link href='/'>
            <SolidButton type='submit' state='default'>
              탐색하기
            </SolidButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
