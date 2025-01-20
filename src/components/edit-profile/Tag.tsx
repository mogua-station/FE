interface TagProps {
  tag: string;
  children?: React.ReactNode;
}

export default function Tag({ tag, children }: TagProps) {
  return (
    <li className='my-3 inline-flex text-nowrap rounded-xl bg-gray-800 px-3 py-2 text-caption-reading font-semibold text-gray-400'>
      # {tag}
      {children}
    </li>
  );
}
