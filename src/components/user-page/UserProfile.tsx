const FAKE_TAGS = ["태그1", "태그2", "태그3"];

export default function UserProfile() {
  return (
    <article className='flex min-w-[343px] justify-between rounded-[20px] bg-gray-950 px-5 py-4 desktop:px-9 desktop:py-8'>
      <div>
        <span className='text-heading-2 font-semibold text-gray-100'>
          닉네임
        </span>
        <p className='mb-4 mt-4 text-label-normal font-regular text-gray-400'>
          한 줄 소개가 들어갑니다
        </p>
        <ul className='flex gap-1'>
          {FAKE_TAGS.map((tag, idx) => (
            <li
              className='w-fit rounded-md bg-gray-600 px-1.5 py-[3px] text-caption-normal font-medium text-gray-300'
              key={`tag-${idx}`}
            >
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='size-16 rounded-full bg-gray-700' />
    </article>
  );
}
