import { type UserProfile as UserProfileType } from "@/types/user-page";

interface UserProfileProps {
  userInfo: UserProfileType;
}

export default function UserProfile({ userInfo }: UserProfileProps) {
  const { nickname, profileImg, bio, userTagList, qualificationStatus } =
    userInfo;

  return (
    <div className='flex w-full justify-between rounded-[20px] bg-gray-950 px-5 py-4 desktop:px-9 desktop:py-8'>
      <div>
        <div className='flex items-center gap-1.5'>
          <h2 className='text-heading-2 font-semibold text-gray-100'>
            {nickname}
          </h2>
          {qualificationStatus === "QUALIFIED" && (
            <span className='rounded-[20px] bg-gray-700 px-2 py-1 text-caption-normal font-medium text-gray-300'>
              과외선생님
            </span>
          )}
        </div>
        <p className='mb-4 mt-4 text-label-normal font-regular text-gray-400'>
          {bio}
        </p>
        <ul className='flex gap-1' aria-label='자기소개 키워드'>
          {userTagList.map((item) => (
            <li
              className='w-fit rounded-md bg-gray-600 px-1.5 py-[3px] text-caption-normal font-medium text-gray-300'
              key={`tag-${item.tag}`}
            >
              {item.tag}
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
