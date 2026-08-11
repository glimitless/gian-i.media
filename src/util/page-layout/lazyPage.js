import { lazy } from 'react';

/** Map a dynamic import’s named export to lazy’s default export. */
function lazyNamed(importFn, exportName) {
  return lazy(() =>
    importFn().then((module) => ({ default: module[exportName]}))
  );
};

// —— Bodies (preferred: one *PageBody per route, container + grid + content lookup inside) ——

export const LazyResultsPageBody = lazyNamed(
  () => import('../../pages/results/ResultsPageBody.jsx'),
  'ResultsPageBody',
);

export const LazyAboutPageBody = lazyNamed(
  () => import('../../pages/about/AboutPageBody.jsx'),
  'AboutPageBody',
);

export const LazyWorkPageBody = lazyNamed(
  () => import('../../pages/work/WorkPageBody.jsx'),
  'WorkPageBody',
);
export const LazyWorkCollectionPageBody = lazyNamed(
  () => import('../../pages/work-collection/WorkCollectionPageBody.jsx'),
  'WorkCollectionPageBody',
)

export const LazyNotePageBody = lazyNamed(
  () => import('../../pages/note/NotePageBody.jsx'),
  'NotePageBody',
);
export const LazyNoteSectionPageBody = lazyNamed(
  () => import('../../pages/note-section/NoteSectionPageBody.jsx'),
  'NoteSectionPageBody',
);


