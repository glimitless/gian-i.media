import './Resume.css';
import resume from '../../content/resume';
import { ResumeBlock } from './containers/ResumeBlock';

export function Resume() {
  return (
    <div className="resume">
      {/* <GCWordmark /> */}
      <div className="resume-block">
        <h1 className="resume-title">Resume</h1>
        <h3>Gian-I Cambridge</h3>
      </div>
      <div className="resume-block">
        <h2>Objective</h2>
        <p>Science-driven graphic designer transitioning into product design, focused on technological hardware and tangible interfaces. Translates complex concepts into clear, human-centered products that enhance everyday interactions and improve understanding of science and technology.</p>
      </div>
      <ResumeBlock title="Education" items={resume.education} />
      <ResumeBlock title="Work Experience" items={resume.workExperience} />
      <div className="resume-block">
        <h2>Skills and Abilities</h2>
        <div className="resume-block-item">
          <h3>Proficient in</h3>
          <ul className="resume-block-list">
            <li>Adobe Creative Suite: InDesign, Illustrator, Photoshop, Animate, After Effects.</li>
            <li>Figma</li>
            <li>HTML, CSS, JavaScript</li>
            <li>Microsoft Office: Word, PowerPoint, Excel</li>
          </ul>
        </div>
        <div className="resume-block-item">
          <h3>Intermediate in</h3>
          <ul className="resume-block-list">
            <li>Arduino Code</li>
            <li>AutoCAD</li>
            <li>Blender</li>
            <li>C#</li>
            <li>FL Studio</li>
            <li>Processing</li>
            <li>Rhino 8</li>
          </ul>
        </div>
        <div className="resume-block-item">
          <h3>Additionally</h3>
          <ul className="resume-block-list">
            <li>Canadian Citizen, U.S. Citizen, & Eligible to Work.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}