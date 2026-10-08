import renderContentBody from "@/lib/content-array/render-content-body";
import type { ContentBlockArgs } from "@/types/content-body";
import type { EightDigitDate } from "@/types/archive";
import formatDate from "@/lib/format-date/format-date";

export default function WorkOverviewContainer(
  {title, date, overview} : 
  {title:string, date:EightDigitDate, overview:ContentBlockArgs[][]}
){
  return (
    <div className="w-full block">
      <div className="work-overview-title-container">
        <h1>{title}</h1>
        <h3>{formatDate(date)}</h3>
      </div>
      {renderContentBody(overview)}
    </div>
  )
}