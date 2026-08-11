import './WorkTextContainer.css';
import { formatText } from '../../../util/formatText';

export function WorkTextContainer({ title, tools, desc }) {
  return (
    <div className='work-text-container'>
      <div className="title-container">
        <h1>{title}</h1>
        {tools.map((tool, i) => (
            <h3 key={i}>{tool}</h3>
          )
        )}
      </div>
      {formatText(desc)}
    </div>
  )
}