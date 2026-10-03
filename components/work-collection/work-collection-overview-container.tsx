import type { ContentBlockArgs } from "@/types/content-body";
import renderContentBody from "@/lib/content-array/render-content-body";

export default function WorkCollectionOverviewContainer(
  {collectionTitle, workTitle, medium, overview}
  : {
    collectionTitle:string;
    workTitle:string;
    medium:string;
    overview:ContentBlockArgs[][]
  }
){
  return (
    <div className="w-full block">
      <div className="work-overview-title-container">
        <h1>{collectionTitle}</h1>
        <h3>{medium}</h3>
        <h3>{workTitle}</h3>
      </div>
      {renderContentBody(overview)}
    </div>
  )
}