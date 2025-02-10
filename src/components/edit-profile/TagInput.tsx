interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export default function TagInput({
  value,
  onChange,
  onKeyDown,
  disabled = false,
  className = "",
}: TagInputProps) {
  return (
    <input
      className={`my-5 bg-transparent align-middle text-body-2-normal font-medium text-gray-100 outline-none placeholder:text-body-2-reading placeholder:font-regular placeholder:text-gray-400 disabled:hidden disabled:cursor-not-allowed ${className}`}
      type='text'
      placeholder='# 태그추가'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={disabled}
      maxLength={6}
    />
  );
}
