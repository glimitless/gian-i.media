import './ResultsGridItem.css';
import { formatDate } from '../../../util/formatDate.js';
import { Link } from 'react-router';

export function ResultsGridItem({ 
  thumbnail: Thumbnail, title, date, keywords, 
  activeKeywords, onToggleKeyword, type, id,
}) {
  return(
    
    <div className="results-grid-item">
      <Link to={`/${type}/${id}`} className="results-thumbnail">
        <Thumbnail aria-label="page-link" />
      </Link>
      <div className="text-container">
          <p className="item-name">{title}</p>
          <h3 className="item-date">{formatDate(date)}</h3>
          <h3 className="item-keywords">
            {keywords.map((keyword, index) => (
              <span key={keyword} className="keyword-group">
                
                <button
                  type="button"
                  className={`text-keyword-button ${activeKeywords.includes(keyword) ? 'is-active' : ''}`}
                  onClick={() => onToggleKeyword(keyword)}
                >
                  {keyword}
                </button>
                {index < keywords.length - 1 && ','}
              </span>
            ))}
            
          </h3>
      </div>
    </div>
  )
}