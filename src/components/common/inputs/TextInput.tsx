import React from "react";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import VisibilityToggle from "./VisibilityToggle";
import OutlineButton from "@/components/common/buttons/OutlineButton";
import useAuthInput from "@/hooks/inputs/auth/useAuthInput";

import {
  hintStyle,
  textInputContainerStyle,
  invisibleInputStyle,
} from "@/hooks/inputs/style";
import { type TextInputProps } from "@/types";

const CommonTextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ control, name, rules, ...props }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          const { inputType, isPasswordVisible, togglePasswordVisibility } =
            useAuthInput({ ...props, name });

          const containerStyle = textInputContainerStyle(
            error?.message,
            field.value,
            field.value && !error,
          );

          const containerClassName = twMerge(containerStyle, props.className);
          const formClassName = twMerge(invisibleInputStyle, props.className);

          const hint = hintStyle(error?.message, field.value && !error, name);
          return (
            <div className='flex flex-col gap-[12px]'>
              {props.label && (
                <label className='ml-[8px] select-none text-body-2-normal font-medium text-gray-300'>
                  {props.label}
                  {props.required && (
                    <span className='ml-1 mt-0.5 text-red-500'>*</span>
                  )}
                </label>
              )}
              <div className='flex flex-col gap-[8px]'>
                <div className='flex items-center gap-[8px]'>
                  <div className={containerClassName}>
                    <input
                      {...field}
                      {...props}
                      ref={(e) => {
                        field.ref(e);
                        if (typeof ref === "function") ref(e);
                        else if (ref) ref.current = e;
                      }}
                      className={formClassName}
                      type={inputType}
                      autoComplete='new-password'
                    />
                    {(name === "password" || name === "confirmPassword") && (
                      <VisibilityToggle
                        isPasswordVisible={isPasswordVisible}
                        togglePasswordVisibility={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  {props.layout === "1button" && (
                    <OutlineButton>Label</OutlineButton>
                  )}
                  {props.layout === "2buttons" && (
                    <>
                      <OutlineButton>Label</OutlineButton>
                      <OutlineButton>Label2</OutlineButton>
                    </>
                  )}
                </div>
                {(props.hint || error?.message) && (
                  <p
                    className={`text-label-normal font-medium ${hint} select-none`}
                  >
                    {error?.message || props.hint}
                  </p>
                )}
              </div>
            </div>
          );
        }}
      />
    );
  },
);

CommonTextInput.displayName = "CommonTextInput";

export default CommonTextInput;
