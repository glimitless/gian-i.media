import { GroupIdArgs, IndividualBlockIdArgs, IndividualIdArgs } from '@/types/archive';
import Link from 'next/link';


export default function NoteSectionBlockReadLink(
  { noteId, sectionId, blockId }:
    {
      noteId: GroupIdArgs;
      sectionId: IndividualIdArgs;
      blockId: IndividualBlockIdArgs
    }
) {
  return (
    <div className="read-link pl-[4.9rem] pr-2 pt-5 pb-2">
      <Link
        href={`/notes/${noteId}/${sectionId}/${blockId}`}
        className="btn-template h-fit w-fit py-2 px-4"
      >
        Read
      </Link>
    </div>

  )
}