const MOCK_PROFILE = {
  userId: 1,
  nickname: "모과씨",
  profileImg:
    "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  qualificationStatus: "verified",
  bio: "안녕하세요, 모과입니다.",
  userTagList: ["개발자", "프론트엔드", "협업"],
};

export default function UserProfile() {
  const { nickname, profileImg, bio, userTagList } = MOCK_PROFILE;

  return (
    <div className='flex w-full justify-between rounded-[20px] bg-gray-950 px-5 py-4 desktop:px-9 desktop:py-8'>
      <div>
        <h2 className='text-heading-2 font-semibold text-gray-100'>
          {nickname}
        </h2>
        <p className='mb-4 mt-4 text-label-normal font-regular text-gray-400'>
          {bio}
        </p>
        <ul className='flex gap-1' aria-label='자기소개 키워드'>
          {userTagList.map((tag, idx) => (
            <li
              className='w-fit rounded-md bg-gray-600 px-1.5 py-[3px] text-caption-normal font-medium text-gray-300'
              key={`tag-${idx}`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <img
        src={`${profileImg != null ? profileImg : "/images/default_user_profile.png"}`}
        alt={`${nickname}님의 프로필 이미지`}
        className='size-16 rounded-full object-cover'
      />
    </div>
  );
}
