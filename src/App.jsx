import './App.css';
import content from './content/content.js';
import { Routes, Route } from 'react-router';
import { ResultsPage } from './pages/results/ResultsPage';
import { AboutPage } from './pages/about/AboutPage';
import { useState, useEffect, useLayoutEffect } from 'react';
import { filterContent } from './util/filterContent';
import { WorkPage } from './pages/work/WorkPage';
import { WorkCollectionPage } from './pages/work-collection/WorkCollectionPage';
import { NotePage } from './pages/note/NotePage';
import { NoteSectionPage } from './pages/note-section/NoteSectionPage';
import { useIsBelowMobileBreakpoint } from './hooks/useMediaQuery';

const lightMode = {
  background: '#F0EEE9',
  backgroundActive: '#E2DED9',
  surface: '#D7D2CB',
  medium: '#A59C94',
  secondaryActive: '#8F847C',
  secondary: '#796E65',
  fadedText: '#A59C94',
  primary: '#222223',
  dropShadowInactive: '#22222340',
  dropShadowActive: '#22222326',
  imageModalBackground: '#F0EEE9E6',
  youtubeEmbedBackground: '#222223BF',
  youtubeEmbedPrimary: '#A59C94',
}
const darkMode = {
  background: '#171614',
  backgroundActive: '#2A2724',
  surface: '#22201E',
  medium: '#5F5A55',
  fadedText: '#796E65',
  secondary: '#A9A29B',
  secondaryActive: '#928980',
  primary: '#ECE8E2',
  dropShadowInactive: '#ECE8E240',
  dropShadowActive: '#ECE8E226',
  imageModalBackground: '#171614E6',
  youtubeEmbedBackground: '#171614BF',
  youtubeEmbedPrimary: '#A9A29B',
}
const fontStyles = {
  mainFontFamily: 'Zilla Slab',
  bodyFontSize: '1.5rem',
  bodyLineHeight: '2.2rem',
  bodyFontWeight: '400',
  titleFontSize: '2.7rem',
  titleLineHeight: '3.5rem',
  titleFontWeight: '400',
  subtitleFontSize: '1.2rem',
  subtitleLineHeight: '2.1rem',
  subtitleTwoFontSize: '1.8rem',
  subtitleFontWeight: '500',
  subtitleTwoLineHeight: '2.2rem',
  subtitleTwoFontWeight: '500',
  buttonFontSize: '1.2rem',
  placeholderFontSize: '1.1rem',
  subtleFontSize: '1.1rem',
  subtleLineHeight: '1.8rem',
};
const transitionStyles = {
  cTransitionDuration:'0.15s',
  cTransitionEase: 'ease-out',
  cvgTransitionDuration:'0.25s',
  cvgTransitionEase: 'ease-out',
  bcTransitionDuration: '0.15s',
  bcTransitionEase: 'ease-out',
  bc2TransitionDuration: '0.25s',
  bc2TransitionEase: 'ease-out',
  bcvgTransitionDuration: '0.25s',
  bcvgTransitionEase: 'ease-out',
  tsTransitionDuration: '0.08s',
  tsTransitionEase: 'ease-out',
  tsvgTransitionDuration: '0.25s',
  tsvgTransitionEase: 'ease-out',
  bsTransitionDuration: '0.15s',
  bsTransitionEase: 'ease-out',
  dimTransitionDuration: '0.3s',
  dimTransitionEase: 'ease-out',
}
const MOBILE_FILTER_ARGUMENTS = {
  type: 'All',
  keywords: [],
  searchQuery: '',
  sortOrder: 'Chronological'
}

function getColorsForMode(mode) {
  return mode === 'darkMode' ? darkMode : lightMode;
}

function App() {
  const [ colorMode, setColorMode ] = useState(() => localStorage.getItem('colorMode') || 'lightMode');
  const colors = getColorsForMode(colorMode);
  const [ filteredContent, setFilteredContent ] = useState([]);
  const filteredNavItems = filteredContent.map(({ thumbnail, type, id }) => ({
    thumbnail,
    type,
    id,
  }));
  const [ headerExpand, setHeaderExpand ] = useState('hidden');
  const [ selectedHeaderOptionDisplay, setSelectedHeaderOptionDisplay ] = useState('');
  const [ filterArguments, setFilterArguments ] = useState({
    type: 'All',
    keywords: [],
    searchQuery: '',
    sortOrder: 'Chronological',
  });
  const inactiveKeywords = [...new Set(
    filteredContent.flatMap((item) => item.keywords)
  )]
    .filter((keyword) => !filterArguments.keywords.includes(keyword))
    .sort((a, b) => a.localeCompare(b));
  const onToggleKeyword = (keyword) => {
    setFilterArguments((prev) => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter((k) => k != keyword)
        : [...prev.keywords, keyword],
    }));
  };
  const onToggleTitleSearch = (searchQuery) => {
    setFilterArguments((prev) => ({
      ...prev,
      searchQuery,
    }));
  };
  const onToggleContentType = (type) => {
    setFilterArguments((prev) => ({
      ...prev,
      type,
    }));
  };
  const onToggleSortOrder = (sortOrder) => {
    setFilterArguments((prev) => ({
      ...prev,
      sortOrder,
    }));
  };
  const [sidebarState, setSidebarState] = useState('hidden');
  const headerProps = {
    activeKeywords: filterArguments.keywords,
    activeSearch: filterArguments.searchQuery,
    colorMode,
    contentType: filterArguments.type,
    expand: headerExpand,
    inactiveKeywords,
    onToggleContentType,
    onToggleKeyword,
    onToggleSortOrder,
    onToggleTitleSearch,
    selectedOptionDisplay: selectedHeaderOptionDisplay,
    setColorMode,
    setExpand: setHeaderExpand,
    setSelectedOptionDisplay: setSelectedHeaderOptionDisplay,
    sortOrder: filterArguments.sortOrder,
  }
  const sidebarProps = {
    contentType: filterArguments.type,
    onToggleContentType,
    setSidebarState,
    sidebarState,
  }
  const isBelowMobile = useIsBelowMobileBreakpoint();

  useEffect(() => {
    if (!isBelowMobile) return;

    const limitFilter = async () => {
      if(isBelowMobile){
        setFilterArguments((prev) => {
          const matchesMobileDefault = 
            prev.type === MOBILE_FILTER_ARGUMENTS.type &&
            prev.searchQuery === MOBILE_FILTER_ARGUMENTS.searchQuery &&
            prev.sortOrder === MOBILE_FILTER_ARGUMENTS.sortOrder &&
            prev.keywords.length === 0;
          if (matchesMobileDefault) return prev;

          return { ...MOBILE_FILTER_ARGUMENTS, keywords: [] };
        })
      }
    }
    limitFilter();
  }, [isBelowMobile]);
  useEffect(() => {
    const runFilter = async () => {
      const result = await filterContent(content, filterArguments);
      setFilteredContent(result);
    }
    runFilter();
  }, [filterArguments]);

  useEffect(() => {
    localStorage.setItem('colorMode', colorMode)
  }, [colorMode]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [colors]);
  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(fontStyles).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    Object.entries(transitionStyles).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);


  if (!colors) return null;
  return (
    <Routes>
      <Route path="/"
        element={<ResultsPage
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          activeKeywords={filterArguments.keywords}
          filteredContent={filteredContent}
          onToggleKeyword={onToggleKeyword}
        />} 
      />
      <Route path="about"
        element={<AboutPage
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          filteredNavItems={filteredNavItems}
        />}
      />
      <Route path="works/:workId" 
        element={<WorkPage 
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          filteredNavItems={filteredNavItems}
        />} 
      />
      <Route path="works/:workId/:collectionId" 
        element={<WorkCollectionPage 
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          filteredNavItems={filteredNavItems}
        />}
      />
      <Route path="notes/:noteId" 
        element={<NotePage 
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          filteredNavItems={filteredNavItems}
        />}
      />
      <Route path="notes/:noteId/:sectionId/:blockId?" 
        element={<NoteSectionPage 
          headerProps={headerProps}
          sidebarProps={sidebarProps}
          filteredNavItems={filteredNavItems}
        />}
      />
    </Routes>
  )
}

export default App;
