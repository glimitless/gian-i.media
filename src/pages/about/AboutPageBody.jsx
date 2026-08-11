import { Resume } from './Resume';
import { ThumbnailNav } from '../../components/thumbnail-nav/ThumbnailNav';

export function AboutPageBody({ filteredNavItems }) {
  return (
    <div className="two-column-page-container">
      <div className="content-grid">
        <div className="content-grid-column page-content">
          <Resume />
        </div>
        <div className="content-grid-column navigation">
          <ThumbnailNav
            filteredNavItems={filteredNavItems}
            noActive
          />
        </div>
      </div>
    </div>
  )
}