import dynamic from "next/dynamic";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
// import ShareMeetUpButton from "./ShareMeetUpButton";
import StatusBadge from "@/components/common/card/StatusBadge";
// import MeetButtonArea from "@/components/meet-detail/MeetButtonArea";
// import MeetDetailReview from "@/components/meet-detail/MeetDetailReview";
import { fetchHostData } from "@/lib/meetDetail/meetDetailApi";
import {
  type MeetInfo,
  type ClientInfo,
  type ParticipantInfo,
} from "@/types/meetDetail";

const ShareMeetUpButton = dynamic(() => import("./ShareMeetUpButton"), {
  ssr: false,
});

const MeetButtonArea = dynamic(
  () => import("@/components/meet-detail/MeetButtonArea"),
  { ssr: false },
);
const MeetDetailReview = dynamic(
  () => import("@/components/meet-detail/MeetDetailReview"),
  { ssr: false },
);

export default async function MeetDetail({ meetInfo }: MeetInfo) {
  const participationSlice: ParticipantInfo[] = meetInfo.participants.slice(
    0,
    4,
  );

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
    participants: meetInfo.participants,
    minParticipants: meetInfo.minParticipants,
    meetupStatus: meetInfo.meetupStatus,
  };

  const hostInfo = await fetchHostData(meetInfo.hostId);

  return (
    <div className='relative mx-auto w-full max-w-[1200px] bg-gray-950 py-[60px] pt-0 desktop:bg-[unset] desktop:py-[74px]'>
      <div className='fixed left-1/2 z-10 -mt-[38px] block w-full -translate-x-1/2 px-5 tablet:px-20 desktop:hidden'>
        <ShareMeetUpButton />
      </div>
      <div className='relative h-[346px] w-full overflow-hidden desktop:rounded-[24px]'>
        <Image
          src={meetInfo.thumbnail}
          sizes='(max-width: 1200px) 100vw, 1200px'
          alt={`모임 제목: ${meetInfo.title} 이미지`}
          fill
          // width={0}
          // height={0}
          // style={{ width: "auto", height: "100%" }}
          className='object-cover'
        />
      </div>
      <div className='px-5 tablet:px-20 desktop:px-0'>
        <div className='mt-10 flex flex-col gap-6 desktop:flex-row'>
          <div className='flex flex-col desktop:w-[775px]'>
            {/* 스터디 제목 정보 */}
            <div className='meet-info-box flex flex-col gap-8'>
              <div>
                <div className='flex gap-1.5'>
                  <StatusBadge
                    badge={{
                      meetupStatus: meetInfo.meetupStatus,
                      recruitmentEndDate: meetInfo.recruitmentEndDate,
                      confirm:
                        meetInfo.minParticipants <=
                        meetInfo.participants.length,
                    }}
                  />
                </div>

                <div className='mt-3'>
                  <h1 className='text-heading-2 font-medium text-gray-50'>
                    {meetInfo.title}
                  </h1>

                  <h2 className='mt-3 inline-block text-body-2-normal text-gray-300'>
                    {meetInfo.online ? "온라인" : Location()}
                  </h2>
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
                        {participationSlice.length !== 0
                          ? participationSlice.map(
                              (item: ParticipantInfo, index) => (
                                <div
                                  key={index}
                                  className='-ml-1.5 h-6 w-6 rounded-[50%] border-[2px] border-gray-800 bg-gray-700'
                                >
                                  <span className='w- relative inline-block h-5 w-5 overflow-hidden rounded-[50%]'>
                                    <Image
                                      src={item.profileImageUrl}
                                      fill
                                      alt={`유저 ${item.userId}님의 프로필 이미지`}
                                      className='object-cover'
                                      sizes='30px'
                                    />
                                  </span>
                                </div>
                              ),
                            )
                          : Array.from({ length: 4 }).map((_, index) => {
                              return (
                                <div
                                  key={index}
                                  className='-ml-1.5 h-6 w-6 rounded-[50%] border-[2px] border-gray-800 bg-gray-700'
                                >
                                  <span className='w- relative inline-block h-5 w-5 overflow-hidden rounded-[50%]'></span>
                                </div>
                              );
                            })}
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
                        <p className='ml-8 text-label-reading text-orange-300'>
                          {`${meetInfo.maxParticipants - meetInfo.participants.length}명 더 참여 할 수 있어요`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <span className='text-title'>모집 내용</span>
                <p
                  className='h-[160px] w-full resize-none rounded-[12px] bg-gray-900 px-4 py-[18px] text-body-2-reading text-gray-200 outline-none'
                  aria-label={`모임${meetInfo.meetupId} 설명란`}
                >
                  {meetInfo.content}
                </p>
              </div>
            </div>
          </div>
          {/* 주최자 프로필, 시작 */}
          <MeetButtonArea clientInfo={clientInfo} hostInfo={hostInfo.data} />
        </div>
        {/* 리뷰 */}
        <div className='meet-info-box mt-8 desktop:mt-10 desktop:w-[775px]'>
          <MeetDetailReview
            meetupId={meetInfo.meetupId}
            meetupStatus={meetInfo.meetupStatus}
          />
        </div>
      </div>
      <ToastContainer
        containerId={"joinArea"}
        autoClose={2000}
        className='fixed bottom-[100px] left-1/2 right-[unset] top-[unset] w-full -translate-x-1/2 px-5 tablet:px-20 desktop:max-w-[585px] desktop:px-0'
        position='bottom-center'
      />
    </div>
  );
}
