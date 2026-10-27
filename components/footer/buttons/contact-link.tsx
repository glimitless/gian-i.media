export default function ContactLink({ href, label}:{href:string, label:string}){
  return (
    <a 
      className="btn-template px-5"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label + ' ↗\uFE0E'}
    </a>
  )
}