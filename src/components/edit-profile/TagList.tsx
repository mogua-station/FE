import Tag from "./Tag";
import DeleteIcon from "@/assets/images/icons/delete.svg";

interface TagListProps {
  tags: string[];
  onDelete: (index: number) => void;
}

export default function TagList({ tags, onDelete }: TagListProps) {
  return (
    <ul className='flex flex-nowrap items-center gap-2'>
      {tags.map((tag, idx) => (
        <Tag key={`tag=${tag}`} tag={tag}>
          <button type='button' aria-label='삭제' onClick={() => onDelete(idx)}>
            <DeleteIcon className='ml-px size-4' />
          </button>
        </Tag>
      ))}
    </ul>
  );
}
