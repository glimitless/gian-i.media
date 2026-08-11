import './ActiveKeywordsContainer.css';
import { ActiveKeyword } from '../header-buttons/ActiveKeyword';
import { useHorizontalWheelScroll } from '../../../hooks/useHorizontalScroll';

export function ActiveKeywordsContainer({ activeKeywords, onToggleKeyword }){
  const scrollRef = useHorizontalWheelScroll();

  return (
    <div ref={scrollRef} className="active-keywords-container">
      {activeKeywords.map((keyword) => (
        <ActiveKeyword 
          keyword={keyword}
          key={keyword} 
          onToggleKeyword={onToggleKeyword}
        />
      ))}
    </div>
  );
};