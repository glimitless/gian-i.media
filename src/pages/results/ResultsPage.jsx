import './ResultsPage.css';
import { PageShell } from '../../util/page-layout/PageShell';
import { AysncContent } from '../../util/page-layout/AsyncContent';
import { LazyResultsPageBody } from '../../util/page-layout/lazyPage';

export function ResultsPage({
  headerProps, sidebarProps, 
  activeKeywords, filteredContent, onToggleKeyword, 
}) {

  return (
    <div className="viewport">
      <PageShell sidebarProps={sidebarProps} headerProps={headerProps}>
        <AysncContent>
          <LazyResultsPageBody
            filteredContent={filteredContent}
            activeKeywords={activeKeywords}
            onToggleKeyword={onToggleKeyword} 
          />
        </AysncContent>
      </PageShell>
    </div>
  );
}