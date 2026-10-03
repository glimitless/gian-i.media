import type { GroupIdArgs, IndividualIdArgs } from "@/types/archive"
import Link from "next/link";

type VariantProps = (
  {
    type: 'next';
    noteId: GroupIdArgs;
    sectionId: IndividualIdArgs;
  } | {
    type: 'prev';
    noteId: GroupIdArgs;
    sectionId: IndividualIdArgs;
  }
)

export default function NoteSectionNavButton(
  { variantProps }: { variantProps: VariantProps }
) {
  return (
    <>
      {variantProps.type === 'next' ?
        <Link
          className="btn-template h-fit w-fit py-3 px-4"
          href={`/notes/${variantProps.noteId}/${variantProps.sectionId}`}
        >
          {"Next →\uFE0E"}
        </Link> :
        <Link
          className="btn-template h-fit w-fit py-3 px-4"
          href={`/notes/${variantProps.noteId}/${variantProps.sectionId}`}
        >
          {"←\uFE0E Prev"}
        </Link>
      }
    </>
  )
}