import { useState } from "react";
import VisOff from "@/assets/images/icons/visibility_off.svg";
import VisOn from "@/assets/images/icons/visibility_on.svg";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  error,
  required = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-gray-300'>Password</label>
      <div className='relative'>
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className='w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-2 text-gray-200 focus:outline-none'
          required={required}
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-4 top-1/2 -translate-y-1/2 transform'
          tabIndex={-1}
        >
          {isPasswordVisible ? <VisOn /> : <VisOff />}
        </button>
      </div>
      {error && <p className='text-sm text-danger'>{error}</p>}
    </div>
  );
};

export default PasswordInput;
