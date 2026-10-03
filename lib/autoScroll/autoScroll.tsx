// const TWO_COLUMN_CONTENT_MIN_WIDTH_EM = 124;

export function getVerticalScrollParent(element: (Element | null | undefined)):(HTMLElement | null){
  let node = element?.parentElement;
  while(node) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === 'auto' || overflowY === 'scroll'){
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

/* Scrolls scrollParent so blockElement is at the top, without scrolling past
   the bottom of containerElement or the scroll parent's own max scroll. */
export function scrollToBlock(
  scrollParent: HTMLElement, 
  blockElement: Element, 
  containerElement: Element
):void {
  // Viewport positions of the scroll column, target block, and note wrapper.
  const parentRect = scrollParent.getBoundingClientRect();
  const blockRect = blockElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  // scrollTop that aligns the block's top with the top of the scroll column.
  const blockTop =
    scrollParent.scrollTop + (blockRect.top - parentRect.top);
  // scrollTop coordinate of the note container's bottom edge (in content space).
  const containerBottom =
    scrollParent.scrollTop + (containerRect.bottom - parentRect.top);

  // Browser’s absolute max scroll.
  const maxScroll = scrollParent.scrollHeight - scrollParent.clientHeight;
  // Furthest scroll where the container bottom sits at the column bottom (no gap below the note).
  const maxScrollAtContainerBottom =
    containerBottom - scrollParent.clientHeight;

  scrollParent.scrollTop = Math.max(
    0,
    Math.min(blockTop, maxScrollAtContainerBottom, maxScroll),
  );
};

// export function pageContentScroll(
//   rootFontSizePx: number,
//   pageContent: (HTMLElement | null | undefined), 
//   firstColumn: (HTMLElement | null | undefined), 
//   secondColumn: (HTMLElement | null | undefined)
// ): void{

//   if(!pageContent) return
//   else if(!firstColumn && !secondColumn){
//     pageContent.scrollTop = 0;
//     return;
//   }

//   const contentContainer = pageContent.closest('.content');
//   const useColumnScroll = 
//     contentContainer &&
//     contentContainer.clientWidth >= (TWO_COLUMN_CONTENT_MIN_WIDTH_EM * rootFontSizePx);

//   if (useColumnScroll){
//     if(firstColumn) firstColumn.scrollTop = 0;
//     if(secondColumn) secondColumn.scrollTop = 0;
//   } else {
//     pageContent.scrollTop = 0;
//   }
// }