import resumeBlocksJson from '@/data/resume-blocks.json';
import ResumeBlock from './containers/resume-block';

export default function Resume() {
  return (
    <div className="block-page-body">
      <div className='block-page-title-container variant-1'>
        <div>
          <h1>Resume</h1>
          <h3>Gian-I Cambridge</h3>
          <h3>
            <a
              href="pdf/resume/gc_resume-oct-2026-digital.pdf"
              download={true}
              className="text-link"
            >
              {"Download the PDF version here ↓\uFE0E"}
            </a>
          </h3>
        </div>
      </div>
      <div className='block-page-content-container variant-1'>
        <div>
          <h2 className="block-header" >Objective</h2>
          <p>Multidisciplinary graphic designer transitioning into product design, focused on technological hardware and tangible interfaces. Translates complex concepts into clear, human-centered products that enhance everyday interactions and improve understanding of science and technology.</p>
        </div>
        <ResumeBlock block={resumeBlocksJson.education} />
        <ResumeBlock block={resumeBlocksJson.workExperience} />
        <div>
          <h2 className="block-header">Skills and Abilities</h2>
          <h3>Proficient in</h3>
          <ul className="block-list variant-1 mb-5">
            <li>
              <p>Adobe Creative Suite</p>
              <h3>After Effects, Animate, Illustrator, InDesign, Photoshop, Premiere.</h3>
            </li>
            <li>
              <p>Frontend Web Design & Development</p>
              <h3>Figma, HTML, CSS (+ Tailwind CSS), JavaScript (+ TypeScript, React.js, Next.js; intermediate in Three.js).</h3>
            </li>
            <li>
              <p>Microsoft Office</p>
              <h3>Excel, PowerPoint, Word.</h3>
            </li>
          </ul>
          <h3>Intermediate in</h3>
          <ul className="block-list variant-1 mb-5">
            <li>
              <p>2D and 3D Drafting</p>
              <h3>AutoCAD, Rhino 8</h3>
            </li>
            <li>
              <p>3D Animation</p>
              <h3>Blender</h3>
            </li>
            <li>
              <p>Creative Coding</p>
              <h3>Cycling ’74 Max 9, Processing</h3>
            </li>
            <li>
              <p>Electronic Prototyping</p>
              <h3>Arduino</h3>
            </li>
          </ul>
          <h3>Additionally</h3>
          <ul className="block-list variant-1">
            <li>
              <p>Canadian Citizen, U.S. Citizen, & Eligible to Work.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}