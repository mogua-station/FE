"use client";

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
  containerClassName?: string;
  formClassName?: string;
}

const CommonTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      required,
      name,
      rules,
      control,
      maxLength = 300,
      containerClassName,
      formClassName,
      ...props
    },
    ref,
  ) => {
    const {
      formState: { errors },
    } = useFormContext();

    const error = errors[name];

    const containerStyle = twMerge(
      `flex max-h-[160px] w-full flex-col rounded-[12px] border bg-gray-900 px-[16px] py-[18px]`,
      error ? "border-danger" : "border-gray-700",
      containerClassName,
    );

    const formStyle = twMerge(
      `select-none max-h-[124px] text-body-2-reading font-regular bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none overflow:hidden resize-none`,
      formClassName,
    );

    return (
      <div className='flex flex-col gap-[8px]'>
        {label && (
          <label className='ml-[8px] select-none text-body-2-normal font-medium text-gray-300'>
            {label}
            {required && (
              <span className='text-body-2-noreal absolute ml-[2px] mt-0.5 font-medium text-danger'>
                *
              </span>
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
                <div className={containerStyle}>
                  <textarea
                    {...props}
                    {...field}
                    ref={ref}
                    maxLength={maxLength}
                    className={formStyle}
                  />
                  <div className='ml-auto mt-2 flex flex-row gap-[6px]'>
                    <span
                      className={`text-right text-label-normal font-medium text-gray-200`}
                    >
                      {field.value?.length || 0}
                      <span className='ml-[6px] mr-[6px] text-right text-label-normal font-medium text-gray-400'>
                        |
                      </span>
                      <span className='text-right text-label-normal font-medium text-gray-400'>
                        {maxLength}
                      </span>
                    </span>
                  </div>
                </div>

                <div className='flex'>
                  {(props.hint || error?.message) && (
                    <p
                      className={`ml-[8px] select-none text-label-normal font-medium ${
                        error ? "text-danger" : "text-gray-500"
                      } mt-2`}
                    >
                      {(error?.message as string) || props.hint}
                    </p>
                  )}
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
