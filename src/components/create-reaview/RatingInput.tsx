import CharacterIcon1 from "@/assets/images/icons/character_1.svg";
import CharacterIcon2 from "@/assets/images/icons/character_2.svg";
import CharacterIcon3 from "@/assets/images/icons/character_3.svg";

const ratingOptions = [
  { value: 0, label: "그냥그래요", character: <CharacterIcon1 /> },
  { value: 1, label: "괜찮아요", character: <CharacterIcon2 /> },
  { value: 2, label: "추천해요", character: <CharacterIcon3 /> },
];

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function RatingInput({ value, onChange }: RatingInputProps) {
  return (
    <fieldset>
      <div className='flex items-center gap-2'>
        <p className='ml-2 text-body-2-normal font-medium text-gray-300'>
          모임은 어땠나요?
          <span
            className='absolute ml-0.5 pt-0.5 text-danger'
            aria-label='필수 항목'
          >
            *
          </span>
        </p>
      </div>
      <div className='mt-6 flex justify-center gap-7 text-label-normal font-medium'>
        {ratingOptions.map((option) => {
          const imageClassName = `size-20 overflow-hidden rounded-3xl border border-gray-600 bg-gray-900 ${
            value === option.value ? "opacity-100" : "opacity-80"
          }`;

          const labelClassName =
            value === option.value ? "text-gray-200" : "text-gray-500";

          return (
            <div key={option.value}>
              <input
                className='hidden'
                type='radio'
                name='rating'
                value={option.value}
                id={`rating-${option.value}`}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                required
              />
              <label
                className='flex cursor-pointer flex-col items-center gap-3.5'
                htmlFor={`rating-${option.value}`}
              >
                <div className={imageClassName}>{option.character}</div>
                <span className={labelClassName}>{option.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
