import renderContentBody from '@/lib/content-array/render-content-body';
import formatDate from '@/lib/format-date/format-date';
import type { EightDigitDate, IndividualBlockIdArgs } from '@/types/archive';
import type { ContentBlockArgs } from '@/types/content-body';

export default function NoteSectionBlock(
  {title, date, items, id}
  : {
    title: string;
    date: EightDigitDate;
    items: ContentBlockArgs[][];
    id: IndividualBlockIdArgs;
  }
){
  return (
    <>
      <div data-section-block-id={id} className="mb-4">
        <h2>{title}</h2>
        <h3>{formatDate(date)}</h3>
      </div>
      <div>
        {renderContentBody(items)}
      </div>
    </>
  )
}