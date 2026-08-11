import './Header.css';
import { useEffect } from 'react';
import { ColorModeSwitch } from './header-buttons/ColorModeSwitch';
import { TitleSearchContainer } from './header-containers/TitleSearchContainer';
import { MoreSearchOptions } from './header-containers/MoreSearchOptions';
import { SelectedSearchOption } from './header-containers/SelectedSearchOption';
import { MobileResultsLinkContainer } from './header-containers/MobileResultsLinkContainer';

export function Header({ 
  headerProps, isBelowTablet, 
  isBelowMobile, scrollContentToTop,
}){
  const { expand, setExpand } = headerProps;
  

  useEffect(() => {
    if (isBelowMobile && expand !== 'hidden'){
      setExpand('hidden');
    };
  }, [isBelowMobile, expand, setExpand]);

  return (
    <div className={`header ${headerProps.expand}`}>
      <div className="header-content">
        <div className="header-row">
          <div className="header-first-row">
            <div className="left-side">
              {isBelowTablet && <MobileResultsLinkContainer 
                isBelowMobile={isBelowMobile}
                scrollContentToTop={scrollContentToTop}
              />}
              {!isBelowMobile &&
                <TitleSearchContainer 
                  onToggleTitleSearch={headerProps.onToggleTitleSearch} 
                  activeSearch={headerProps.activeSearch}
                  expand={headerProps.expand}
                  setExpand={headerProps.setExpand}
                  setSelectedOptionDisplay={headerProps.setSelectedOptionDisplay}
                />
              }
            </div>
            
            <ColorModeSwitch 
              colorMode={headerProps.colorMode} 
              setColorMode={headerProps.setColorMode} 
            />
          </div>
        </div>
        <div className="header-row">
          <MoreSearchOptions 
            contentType={headerProps.contentType}
            onToggleContentType={headerProps.onToggleContentType}
            sortOrder={headerProps.sortOrder}
            onToggleSortOrder={headerProps.onToggleSortOrder}
            expand={headerProps.expand}
            setExpand={headerProps.setExpand}
            setSelectedOptionDisplay={headerProps.setSelectedOptionDisplay}
            activeKeywords={headerProps.activeKeywords}
            onToggleKeyword={headerProps.onToggleKeyword}
          />
        </div>
        <div className="header-row">
          <SelectedSearchOption 
            selectedOptionDisplay={headerProps.selectedOptionDisplay}
            contentType={headerProps.contentType}
            sortOrder={headerProps.sortOrder}
            inactiveKeywords={headerProps.inactiveKeywords}
            onToggleContentType={headerProps.onToggleContentType}
            onToggleSortOrder={headerProps.onToggleSortOrder}
            onToggleKeyword={headerProps.onToggleKeyword}
          />
        </div>
      </div>
    </div>
  )
}