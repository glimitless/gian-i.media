import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import Resume from '@/components/resume/resume';
import HeaderMargin from '@/lib/navigator/header-margin';

export default async function AboutPage(){
  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="two-column-page-content-column">
          <HeaderMargin />
          <Resume />
        </div>
        <div className="two-column-page-navigation-column">
          <HeaderMargin />
          <ThumbnailNav />
        </div>
      </div>
    </div>
  )
}