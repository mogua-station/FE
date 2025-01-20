import ArrowRight from "@/assets/images/icons/arrow_right.svg";
import StatusBadge from "@/components/common/card/StatusBadge";
import MeetButtonArea from "@/components/meet-detail/MeetButtonArea";
import MeetDetailReview from "@/components/meet-detail/MeetDetailReview";
import { reviews } from "@/data/mockList";
import { type MeetInfo, type ClientInfo } from "@/types/meetDetail";

export default function MeetDetail({ meetInfo }: MeetInfo) {
  const participationSlice = meetInfo.participants.slice(0, 4);
  const Location = () => {
    switch (meetInfo.location) {
      case "CAPITAL":
        return "수도권";

      case "DAEJEON":
        return "대전광역시";

      case "JEONJU":
        return "전주시";

      case "GWANGJU":
        return "광주광역시";

      case "BUSAN":
        return "부신광역시";

      case "DAEGU":
        return "대구광역시";

      case "GANGNEUNG":
        return "강릉시";

      default:
        return "";
    }
  };

  const clientInfo: ClientInfo = {
    meetupId: meetInfo.meetupId,
    hostId: meetInfo.hostId,
    hostNickname: meetInfo.hostNickname,
    participants: meetInfo.participants,
    minParticipants: meetInfo.minParticipants,
    stauts: meetInfo.status,
  };

  return (
    <div className='relative mx-auto w-full max-w-[1200px] bg-gray-950 py-[60px] desktop:bg-[unset] desktop:py-[74px]'>
      <div className='fixed left-1/2 z-10 -mt-[38px] block w-full -translate-x-1/2 px-5 tablet:px-20 desktop:hidden'>
        <button className='relative mx-auto flex w-full gap-[15px] rounded-[16px] bg-gray-800 p-3'>
          <div className='overflow-hidden rounded-[50%] bg-gray-600'>
            <img src='/images/share_character.png' alt='캐릭터 이미지' />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='text-body text-gray-300'>친구와 함께 참여해보세요</p>
            <p className='text-left text-body-2-normal font-bold text-gray-100'>
              모임 공유하기
            </p>
          </div>
          <ArrowRight className='absolute right-10 top-1/2 size-6 -translate-y-1/2 text-gray-400' />
        </button>
      </div>
      <div className='h-[346px] w-full overflow-hidden desktop:rounded-[24px]'>
        <img
          src={meetInfo.thumbnail}
          alt='모임 이미지'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='px-5 tablet:px-20 desktop:px-0'>
        <div className='mt-10 flex flex-col gap-6 desktop:flex-row'>
          <div className='flex flex-col desktop:w-[775px]'>
            {/* 스터디디 제목 정보 */}
            <div className='meet-info-box flex flex-col gap-8'>
              <div>
                <div className='flex gap-1.5'>
                  <StatusBadge
                    badge={{
                      meetupStatus: meetInfo.status,
                      recruitmentEndDate: meetInfo.recruitmentEndDate,
                      confirm:
                        meetInfo.minParticipants <=
                        meetInfo.participants.length,
                    }}
                  />
                </div>

                <div className='mt-3'>
                  <div></div>
                  <p className='text-heading-2 font-medium text-gray-50'>
                    {meetInfo.title}
                  </p>

                  <span className='mt-3 inline-block text-body-2-normal text-gray-300'>
                    {meetInfo.online ? "온라인" : Location()}
                  </span>
                </div>
              </div>

              <div className='meet-info-box-inner-1-caption flex flex-col justify-center'>
                <div className='flex justify-between py-4'>
                  <span className='text-caption'>모집</span>
                  <span className='text-caption'>
                    {new Date(meetInfo.recruitmentStartDate).toLocaleDateString(
                      "ko-KR",
                    )}
                    {" - "}
                    {new Date(meetInfo.recruitmentEndDate).toLocaleDateString(
                      "ko-KR",
                    )}
                  </span>
                </div>
                <div className='flex justify-between py-4'>
                  <span className='text-caption'>참여</span>
                  <span className='text-caption'>
                    {new Date(meetInfo.meetingStartDate).toLocaleDateString(
                      "ko-KR",
                    )}
                    {" - "}
                    {new Date(meetInfo.meetingEndDate).toLocaleDateString(
                      "ko-KR",
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* 스터디 참여인원, 본문 */}
            <div className='meet-info-box mt-10 flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <span className='text-title'>참여 인원</span>
                <div className='meet-info-box-inner-1'>
                  <div>
                    <span className='block text-body-2-normal font-medium text-gray-200'>
                      {`모집 정원 ${meetInfo.maxParticipants}명`}
                    </span>
                    <div className='relative mt-5 h-1.5 w-full rounded-[100px] bg-gray-600'>
                      <div
                        className='join-flag absolute left-0 top-0 h-full rounded-[100px] bg-orange-300'
                        style={{
                          width: `${(meetInfo.participants.length / meetInfo.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                    <span className='mt-2 inline-block text-caption-normal font-regular text-gray-400'>
                      {`최소인원 ${meetInfo.minParticipants}명`}
                    </span>
                    <div className='flex items-center'>
                      <div className='flex'>
                        {participationSlice.map((item, index) => (
                          <div
                            key={index}
                            className='-ml-1.5 h-6 w-6 rounded-[50%] border-[2px] border-gray-800 bg-gray-700'
                          >
                            <span className='inline-block h-full w-full overflow-hidden rounded-[50%]'>
                              <img
                                src={item.userProfile}
                                alt='유저 프로필 이미지'
                                className='h-full w-full object-cover'
                              />
                            </span>
                          </div>
                        ))}
                        {meetInfo.participants.length > 4 && (
                          <div className='-ml-1.5 h-6 w-6 rounded-[50%] border-[2px] border-gray-800 bg-gray-700'>
                            <span className='flex items-center justify-center text-label-reading text-gray-200'>
                              {`+${meetInfo.participants.length - 4}`}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className='flex flex-1 justify-between desktop:justify-start'>
                        <span className='ml-3 text-label-reading text-gray-200'>
                          {meetInfo.participants.length}/
                          {meetInfo.maxParticipants}
                        </span>
                        <span className='ml-8 text-label-reading text-orange-300'>
                          {`${meetInfo.maxParticipants - meetInfo.participants.length}명 더 참여 할 수 있어요`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <span className='text-title'>모집 내용</span>
                <textarea
                  readOnly
                  className='h-[160px] w-full resize-none rounded-[12px] bg-gray-900 px-4 py-[18px] text-body-2-reading text-gray-200'
                  value={meetInfo.content}
                />
              </div>
            </div>
          </div>
          {/* 주최자 프로필, 시작 */}
          <MeetButtonArea clientInfo={clientInfo} />
        </div>
        {/* 리뷰 */}
        <div className='meet-info-box mt-8 desktop:mt-10 desktop:w-[775px]'>
          <MeetDetailReview reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
