import CameraIcon from "@/assets/images/icons/camera.svg";

export default function ProfileImageInput() {
  return (
    <div className='relative mb-6 mt-8'>
      <img
        className='size-20 rounded-full border-4 border-gray-600 object-cover'
        src='https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg'
      />
      <input
        className='hidden'
        type='file'
        id='profile-image'
        name='profileImg'
      />
      <label
        className='absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-600'
        htmlFor='profile-image'
      >
        <CameraIcon className='size-4 text-gray-100' />
      </label>
    </div>
  );
}
