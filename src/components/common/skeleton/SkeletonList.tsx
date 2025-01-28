import CardSkeleton from "../card/CardSkeleton";

interface SkeletonListProps {
  base: number;
  tablet: number;
  desktop: number;
}

export default function SkeletonList({
  base,
  tablet,
  desktop,
}: SkeletonListProps) {
  return (
    <>
      {/* base view (mobile) */}
      <div className='grid flex-col gap-y-6 tablet:hidden'>
        {Array.from({ length: base }).map((_, idx) => (
          <CardSkeleton key={`skeleton-mobile-${idx}`} />
        ))}
      </div>
      {/* tablet view */}
      <div className='hidden flex-col gap-y-6 tablet:grid desktop:hidden'>
        {Array.from({ length: tablet }).map((_, idx) => (
          <CardSkeleton key={`skeleton-tablet-${idx}`} />
        ))}
      </div>
      {/* desktop view */}
      <div className='hidden flex-col gap-y-6 desktop:grid desktop:grid-cols-2 desktop:gap-x-5'>
        {Array.from({ length: desktop }).map((_, idx) => (
          <CardSkeleton key={`skeleton-desktop-${idx}`} />
        ))}
      </div>
    </>
  );
}
