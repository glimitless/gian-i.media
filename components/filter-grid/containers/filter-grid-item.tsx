import type { SvgIcon } from '@/types/svg';
import type { TagArgs, ContentTypeArgs } from '@/types/filter';
import Link from 'next/link';
import { EightDigitDate, GroupIdArgs } from '@/types/archive';
import formatDate from '@/lib/format-date/format-date';
import { memo } from 'react';

function FilterGridItem({
  title,
  type,
  date,
  Thumbnail,
  tags,
  activeTagSet,
  onToggleTag,
  id,
}: {
  title: string;
  type: ContentTypeArgs;
  tags: TagArgs[];
  onToggleTag: (tag: TagArgs) => void;
  activeTagSet: ReadonlySet<TagArgs>;
  date: EightDigitDate;
  Thumbnail: SvgIcon;
  id: GroupIdArgs;
}) {
  return (
    <div className="py-5 w-full block">
      <Link
        className="group bg-lmSurface dark:bg-dmSurface hover:bg-lmBgActive hover:dark:bg-dmBgActive flex flex-col justify-center items-center cursor-pointer bcvg-transition p-[0.4rem]"
        href={`/${type}/${id}`}
        aria-label={title}
      >
        <Thumbnail
          aria-hidden
          className="w-full h-auto text-lmSecondary dark:text-dmSecondary thumbnail-svg-transition group-hover:text-lmSecondaryActive group-hover:dark:text-secondaryActive group-hover:hover-scale"
        />
      </Link>
      <p className="mt-3">{title}</p>
      <h3 className="">{formatDate(date)}</h3>
      <h3 className="mt-[0.195rem] flex flex-wrap gap-x-[0.24rem]">
        {tags.map((tag, i) => (
          <span key={tag} className="whitespace-nowrap">
            <button
              type="button"
              className={`cursor-pointer ${activeTagSet.has(tag) && 'bg-lmSurface dark:bg-dmSurface'} bg-color-transition-2 hover:text-lmSecondaryActive hover:dark:text-dmSecondaryActive`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
            {i < tags.length - 1 && ','}
          </span>
        ))}
      </h3>
    </div>
  );
}

export default memo(FilterGridItem);
