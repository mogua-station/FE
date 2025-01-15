import React, { type TextareaHTMLAttributes } from "react";
import {
  useFormContext,
  Controller,
  type RegisterOptions,
  type Control,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  hint?: string;
  name: string;
  rules?: RegisterOptions;
  control?: Control<any>;
  maxLength?: number;
}

const CommonTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, required, name, rules, control, maxLength = 300, ...props },
    ref,
  ) => {
    const {
      formState: { errors },
    } = useFormContext();

    const error = errors[name];

    const containerStyle = twMerge(
      `flex max-h-[124px] w-full flex-col rounded-[12px] border-2 ${
        error ? "border-danger" : "border-gray-700"
      } bg-gray-900 p-[20px] text-body-2-reading font-regular text-gray-200 focus:outline-none overflow:hidden`,
      props.className,
    );

    return (
      <div className='flex flex-col gap-[8px]'>
        {label && (
          <label className='ml-2 select-none text-body-2-normal font-medium text-gray-300'>
            {label}
            {required && (
              <span className='ml-[8px] mt-0.5 text-red-500'>*</span>
            )}
          </label>
        )}
        <div className='flex flex-col'>
          <Controller
            name={name}
            control={control}
            rules={{
              ...rules,
              maxLength: {
                value: maxLength,
                message: `최대 ${maxLength}자까지 입력 가능합니다.`,
              },
            }}
            render={({ field }) => (
              <>
                <textarea
                  {...props}
                  {...field}
                  ref={ref}
                  maxLength={maxLength}
                  className={containerStyle}
                />
                <div className='flex flex-row justify-between'>
                  <div>
                    {(props.hint || error?.message) && (
                      <p
                        className={`mt-2 select-none text-label-normal font-medium ${
                          error ? "text-danger" : "text-gray-500"
                        }`}
                      >
                        {(error?.message as string) || props.hint}
                      </p>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-label-normal font-medium ${
                      error ? "text-danger" : "text-gray-500"
                    }`}
                  >
                    {field.value?.length || 0}/{maxLength}
                  </span>
                </div>
              </>
            )}
          />
        </div>
      </div>
    );
  },
);

export default CommonTextArea;
