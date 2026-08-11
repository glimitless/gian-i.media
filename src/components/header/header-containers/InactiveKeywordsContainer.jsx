import './InactiveKeywordsContainer.css';
import { InactiveKeyword } from '../header-buttons/InactiveKeyword';
import { useHorizontalWheelScroll } from '../../../hooks/useHorizontalScroll';

export function InactiveKeywordsContainer({ inactiveKeywords, onToggleKeyword }){
  const scrollRef = useHorizontalWheelScroll();
  
  return (
    <div ref={scrollRef} className="inactive-keywords-container">
      {inactiveKeywords.map((keyword) => (
        <InactiveKeyword 
          key={keyword} 
          keyword={keyword} 
          onToggleKeyword={onToggleKeyword} 
        />
      ))}
    </div>
  )
}