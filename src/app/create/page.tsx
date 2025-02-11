import AuthWrapper from "@/components/auth/AuthWrapper";
import CloseButton from "@/components/create/CloseButton";
import CreateForm from "@/components/create/CreateForm";

export default function CreatePage() {
  return (
    <AuthWrapper>
      <div className='mx-auto flex size-full grow flex-col desktop:max-w-[1200px]'>
        <div className='absolute inset-0 size-full bg-gray-950' />

        <section className='z-10 flex h-14 items-center justify-between border-b border-gray-900 px-5 py-2.5 desktop:px-5'>
          <p className='w-full grow text-body-1-normal font-semibold text-gray-200'>
            모임 만들기
          </p>

          <CloseButton />
        </section>

        <CreateForm />
      </div>
    </AuthWrapper>
  );
}
