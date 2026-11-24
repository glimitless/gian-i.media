import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import Resume from '@/components/resume/resume';
import HeaderMargin from '@/lib/navigator/header-margin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Gian-I Cambridge, the graphic designer behind Gian-I Media: education, work experience, and skills in branding, typography, web design, and interactive media.'
}

export default async function AboutPage(){
  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="two-column-page-content-column">
          <HeaderMargin />
          <Resume />
        </div>
        <div className="two-column-page-navigation-column">
          <ThumbnailNav />
        </div>
      </div>
    </div>
  )
}