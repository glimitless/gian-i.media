import './ResultsPageBody.css';
import { ResultsGridItem } from './container/ResultsGridItem';

export function ResultsPageBody({ filteredContent, activeKeywords, onToggleKeyword }){
  return (
    <div className='results-page'>
      <div className="results-grid">
        {filteredContent.map((page) => {
          return (
            <ResultsGridItem 
              title={page.title} 
              thumbnail={page.thumbnail} 
              keywords={page.keywords} 
              activeKeywords={activeKeywords}
              onToggleKeyword={onToggleKeyword}
              date={page.date} 
              type={page.type}
              id={page.id}
              key={page.id}  />
          )
        })}
      </div>
    </div>
  )
}