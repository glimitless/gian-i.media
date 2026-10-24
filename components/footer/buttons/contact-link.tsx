export default function ContactLink({ href, label}:{href:string, label:string}){
  return (
    <a 
      className="btn-template px-5"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <span className="hidden @min-[41.5em]/viewport:inline">{'\u00A0↗\uFE0E'}</span>
    </a>
  )
}