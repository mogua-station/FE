"use client";

import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";

export default function EditProfile() {
  return (
    <section className='flex h-full flex-1 flex-col items-center bg-gray-950'>
      <div className='flex w-full flex-col items-center bg-gray-900 p-4 tablet:px-20 tablet:pb-6 tablet:pt-10 desktop:mb-[106px] desktop:mt-14 desktop:max-w-[712px] desktop:rounded-[40px]'>
        <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100'>
          계정 정보
        </h2>
        <ContactBanner />
        <EditProfileForm />
        <AccountActionButtons />
      </div>
    </section>
  );
}
