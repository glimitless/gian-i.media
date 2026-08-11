import { ResumeBlockItem } from './ResumeBlockItem';

export function ResumeBlock({ title, items }){
  return (
    <div className="resume-block">
      <h2>{title}</h2>
      {items.map((item, i) => (
        <ResumeBlockItem item={item} key={i}/>
      ))}
    </div>
  );
}