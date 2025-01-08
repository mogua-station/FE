import OutlineSecondaryButton from "../buttons/OutlineSecondaryButton";
import VisibilityToggle from "./VisibilityToggle";
import useAuthInput from "@/hooks/inputs/auth/useAuthInput";
import {
  hintStyle,
  textInputContainerStyle,
  invisibleInputStyle,
} from "@/hooks/inputs/style";
import { type TextInputProps } from "@/types";

const CommonTextInput: React.FC<TextInputProps> = ({ isValid, ...props }) => {
  const { inputType, isPasswordVisible, togglePasswordVisibility } =
    useAuthInput(props);

  const containerStyle = textInputContainerStyle(
    props.error,
    props.value,
    isValid,
  );
  const hint = hintStyle(props.error, isValid, props.name);

  return (
    <div className='flex flex-col gap-[12px]'>
      {props.label && (
        <label className='select-none text-body-2-normal font-medium text-gray-300'>
          {props.label}
          {props.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div className='flex flex-col gap-[8px]'>
        <div className='flex items-center gap-[8px]'>
          <div className={containerStyle}>
            <input
              {...props}
              className={invisibleInputStyle}
              type={inputType}
            />
            {/* input 내의 버튼 배치 */}
            {(props.name === "password" ||
              props.name === "confirmPassword") && (
              <VisibilityToggle
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}
          </div>
          {/* props.layout에 따른 버튼 표시 */}
          {props.layout === "1button" && (
            <OutlineSecondaryButton>Label</OutlineSecondaryButton>
          )}
          {props.layout === "2buttons" && (
            <>
              <OutlineSecondaryButton>Label</OutlineSecondaryButton>
              <OutlineSecondaryButton>Label2</OutlineSecondaryButton>
            </>
          )}
        </div>
        {/* input field 아래에 나오는 hint, error 메세지에 대한 스타일입니다 */}
        {props.hint || props.error ? (
          <p className={`text-label-normal font-medium ${hint} select-none`}>
            {props.error || props.hint}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default CommonTextInput;
