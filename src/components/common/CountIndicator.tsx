interface CountIndicatorProps {
  currentCount: number;
  maxCount: number;
  className?: string;
}

export default function CountIndicator({
  currentCount,
  maxCount,
}: CountIndicatorProps) {
  return (
    <div className={`flex *:text-caption-normal *:font-regular`}>
      <span className='text-gray-200'>{currentCount}</span>
      <div className='before:mx-1.5 before:inline-block before:h-2.5 before:w-px before:bg-gray-700'>
        <span className='text-gray-500'>{maxCount}</span>
      </div>
    </div>
  );
}
