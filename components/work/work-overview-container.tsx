import renderContentBody from "@/lib/content-array/render-content-body";
import type { ToolArgs } from "@/types/filter";
import type { ContentBlockArgs } from "@/types/content-body";

export default function WorkOverviewContainer(
  {title, tools, overview} : 
  {title:string, tools:ToolArgs[], overview:ContentBlockArgs[][]}
){
  return (
    <div className="w-full block">
      <div className="work-overview-title-container">
        <h1>{title}</h1>
        {tools.map((tool, i) => (
          <h3 key={i}>{tool}</h3>
        ))}
      </div>
      {renderContentBody(overview)}
    </div>
  )
}