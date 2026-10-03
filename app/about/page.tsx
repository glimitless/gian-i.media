import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import Resume from '@/components/resume/resume';

export default async function AboutPage(){
  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="two-column-page-content-column">
          <Resume />
        </div>
        <div className="two-column-page-navigation-column">
          <ThumbnailNav />
        </div>
      </div>
    </div>
  )
}