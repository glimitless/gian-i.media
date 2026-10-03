import type { ResumeBlock } from "@/types/resume";
import ResumeBlockItem from "./resume-block-item";

export default function ResumeBlock({ block } : { block:ResumeBlock }){
  return (
    <div>
      <h2 className="info-expand-btns-template-container-header">{block.title}</h2>
      <div className="info-expand-btns-template-container">
        {block.content.map((item, i) => (
          <ResumeBlockItem key={i} item={item} />
        ))}
      </div>
      
    </div>
  )
}