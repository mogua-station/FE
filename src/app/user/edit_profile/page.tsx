"use client";

import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";
import BackButton from "@/components/user/BackButton";

export default function EditProfile() {
  return (
    <section className='nav-mb header-mt flex h-full flex-1 flex-col items-center bg-gray-950'>
      <div className='flex w-full flex-col items-center bg-gray-900 p-4 tablet:px-20 tablet:pb-6 tablet:pt-10 desktop:mb-[106px] desktop:mt-14 desktop:max-w-[712px] desktop:rounded-[40px]'>
        <div className='flex w-full items-start justify-between px-2 pb-4'>
          <h2 className='w-full text-body-1-reading font-medium text-gray-100'>
            계정 정보
          </h2>
          <div className='hidden text-gray-200 desktop:block'>
            <BackButton />
          </div>
        </div>
        <ContactBanner />
        <EditProfileForm />
        <AccountActionButtons />
      </div>
    </section>
  );
}
