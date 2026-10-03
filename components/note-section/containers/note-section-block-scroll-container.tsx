'use client';

import { useLayoutEffect, useRef } from 'react';
import { getVerticalScrollParent, scrollToBlock } from '@/lib/autoScroll/autoScroll';
import type { IndividualBlockIdArgs } from '@/types/archive';

type Props = {
  blockId?: IndividualBlockIdArgs;
  blockIds: IndividualBlockIdArgs[];
  children: React.ReactNode;
}

export default function NoteSectionBlockScrollContainer({ blockId, blockIds, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollParent = getVerticalScrollParent(container);
    if (!scrollParent) return;

    const hasValidBlock = blockId && blockIds.some((id) => id === blockId);

    if (!hasValidBlock) return;

    const blockElement = container.querySelector(
      `[data-section-block-id="${CSS.escape(blockId)}"]`
    )
    if (!blockElement) return;

    scrollToBlock(scrollParent, blockElement, container);
  }, [blockId, blockIds]);

  return (
    <div
      ref={containerRef}
      className="block-page-content-container variant-2"
    >
      {children}
    </div>
  )
}