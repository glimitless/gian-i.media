import type { SvgIcon } from '@/types/svg';
import type { KeywordArgs, TypeArgs } from '@/types/filter';
import Link from 'next/link';
import { EightDigitDate, GroupIdArgs } from '@/types/archive';
import formatDate from '@/lib/format-date/format-date';

export default function FilterGridItem(
  {title, type, date, Thumbnail, keywords, activeKeywords, onToggleKeyword, id} 
  : {
    title:string, 
    type:TypeArgs, 
    keywords:KeywordArgs[], 
    onToggleKeyword: (keyword: KeywordArgs) => void, 
    activeKeywords: KeywordArgs[],
    date:EightDigitDate, 
    Thumbnail:SvgIcon, 
    id:GroupIdArgs,
  }
){
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
      <h3 className='mt-[0.195rem] flex flex-wrap gap-x-[0.24rem]'>
        {keywords.map((keyword, i) => {
          return (
            <span key={i} className='whitespace-nowrap'>
              <button
                type="button"
                className={`cursor-pointer ${activeKeywords.includes(keyword) && 'bg-lmSurface dark:bg-dmSurface'} bg-color-transition-2 hover:text-lmSecondaryActive hover:dark:text-dmSecondaryActive`}
                onClick={() => onToggleKeyword(keyword)}
              >
                {keyword}
              </button>
              {i < keywords.length - 1 && ','}
            </span>
          )
        })}
      </h3>
    </div>
  )
}