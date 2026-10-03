import renderContentBody from '@/lib/content-array/render-content-body';
import { ContentBlockArgs } from '@/types/content-body';

export default function WorkExpandedDescription({descriptionEXP} : {descriptionEXP:ContentBlockArgs[][]}){
  return (
    <div className="pt-16 block">
      {renderContentBody(descriptionEXP)}
    </div>
  )
}