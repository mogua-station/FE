export default function CardSkeleton() {
  return (
    <div className='flex min-h-[11.125rem] flex-col justify-between rounded-2xl bg-gray-800 p-3'>
      <div className='flex animate-pulse items-center justify-between pb-5'>
        <div className='flex gap-1.5'>
          <div className='h-7 w-20 rounded-md bg-gray-600' />
          <div className='h-7 w-16 rounded-md bg-gray-600' />
        </div>

        <div className='size-7 rounded-md bg-gray-600' />
      </div>

      <div className='flex animate-pulse items-end justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='h-5 w-28 rounded-md bg-gray-600' />
          <div className='h-4 w-40 rounded-md bg-gray-600' />
          <div className='pb-6' />

          <div className='flex flex-col gap-1.5'>
            <div className='h-3 w-36 rounded-md bg-gray-600' />
            <div className='h-3 w-36 rounded-md bg-gray-600' />
          </div>
        </div>

        <div className='size-20 rounded-md bg-gray-600' />
      </div>
    </div>
  );
}
