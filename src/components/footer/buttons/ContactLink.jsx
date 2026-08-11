import './ContactLink.css';

export function ContactLink({ link, label }){
  return (
    <a className="contact-link" href={link} target="_blank" rel="noopener noreferrer">
      {label + ' ↗'}
    </a>
  );
};