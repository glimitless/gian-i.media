function isScrollContainer(element: HTMLElement) {
  const { overflowY } = getComputedStyle(element);
  return overflowY === 'scroll' || overflowY === 'auto';
}

function isColumnLayout(main: HTMLElement) {
  
}
