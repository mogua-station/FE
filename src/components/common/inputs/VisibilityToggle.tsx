import VisOff from "@/assets/images/icons/visibility_off.svg";
import VisOn from "@/assets/images/icons/visibility_on.svg";

interface VisibilityToggleProps {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  isPasswordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <button
      type='button'
      onClick={togglePasswordVisibility}
      className='absolute right-0 pr-[16px]'
      tabIndex={-1}
    >
      {isPasswordVisible ? <VisOn /> : <VisOff />}
    </button>
  );
};

export default VisibilityToggle;
