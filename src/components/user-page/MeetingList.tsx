import EmptyState from "./EmptyState";
import { type MeetingListProps } from "@/types/user-page";

export default function MeetingList({ items, variant }: MeetingListProps) {
  return (
    <>
      {items.length > 0 ? (
        <div className='grid grid-cols-1 gap-y-6 rounded-[40px] desktop:grid-cols-2 desktop:gap-x-8'>
          {items.map((_, idx) => (
            <div
              className='h-[182px] rounded-2xl bg-gray-950'
              key={`meeting-${idx}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState variant={variant} />
      )}
    </>
  );
}
