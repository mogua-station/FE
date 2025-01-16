import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";

// TODO: NavBar 없는 레이아웃 설정 필요
export default function EditProfile() {
  return (
    <section className='flex h-full flex-1 flex-col items-center bg-gray-950'>
      <div className='flex w-full flex-col items-center bg-gray-900 p-4 tablet:px-10 tablet:pb-6 desktop:my-20 desktop:max-w-[712px] desktop:rounded-[40px]'>
        <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100 tablet:pt-10'>
          계정 정보
        </h2>
        <ContactBanner />
        <EditProfileForm />
        <AccountActionButtons />
      </div>
    </section>
  );
}
