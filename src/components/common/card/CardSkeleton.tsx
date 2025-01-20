import Bookmark from "@/assets/images/icons/bookmark.svg";

export default function CardSkeleton() {
  return (
    <div className='flex h-[182px] flex-col rounded-[16px] bg-gray-950 p-3'>
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <span className='block h-[26px] w-[50px] animate-pulse rounded-[6px] bg-gray-800'></span>
        </div>

        <button>
          <Bookmark />
        </button>
      </div>

      <div className='mt-5 flex justify-between'>
        <div className='flex-col'>
          <span className='mb-1.5 block h-[20px] w-[100px] animate-pulse bg-gray-800 text-body-1-normal font-medium text-gray-200'></span>
          <div className='mb-6 flex'>
            <span
              className={`caption-stroke relative inline-block h-[20px] w-[100px] animate-pulse bg-gray-800 pr-2 text-label-reading font-regular text-gray-400`}
            ></span>
            <span className='inline-block animate-pulse pl-2 text-label-reading font-regular text-gray-400'></span>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex'>
              <span
                className={`caption-stroke relative inline-block h-[18px] w-40 animate-pulse bg-gray-800 pr-2 text-caption-normal font-regular text-gray-400`}
              ></span>
            </div>
            <div className='flex'>
              <span
                className={`caption-stroke relative inline-block h-[18px] w-40 animate-pulse bg-gray-800 pr-2 text-caption-normal font-regular text-gray-400`}
              ></span>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <div className='h-20 w-20 animate-pulse rounded-[8px] bg-gray-800 object-cover' />
        </div>
      </div>
    </div>
  );
}
