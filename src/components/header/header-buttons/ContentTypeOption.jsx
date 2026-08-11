import './ContentTypeOption.css';

export function ContentTypeOption({ activeType, type, onToggleContentType }){

  function onClick(){
    if(type === activeType)
      return;

    onToggleContentType(type);
  }

  return (
    <button className={`content-type-option ${type === activeType ? 'is-active' : ''}`}
      onClick={onClick}
    >
      {type}
    </button>
  )
}