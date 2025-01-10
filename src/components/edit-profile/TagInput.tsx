import CountIndicator from "./CountIndicator";

export default function TagInput() {
  return (
    <>
      <div className='mt-8'>
        <div className='flex justify-between'>
          <span className='profile-edit-label mt-0'>태그</span>
          {/* 카운트 */}
          <CountIndicator currentCount={0} maxCount={3} />
        </div>
        <div className='my-3 inline-block rounded-xl bg-gray-800 px-3 py-2 text-caption-reading font-semibold text-gray-400'>
          # 태그추가
        </div>
      </div>
      <p className='profile-edit-message mt-0'>최대 5글자까지 입력 가능해요</p>
    </>
  );
}
