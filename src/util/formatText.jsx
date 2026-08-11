import { Fragment } from 'react';

function renderTextPart(part) {
  if (part.type === 'text') return part.value;

  if (part.type === 'link') {
    const isDownload = part.download === true;
    return (
      <a
        href={part.href}
        download={isDownload ? (part.fileName ?? true) : undefined}
        target={isDownload ? undefined : '_blank'}
        rel={isDownload ? undefined : 'noopener noreferrer'}
        className='desc-link'
      >
        {part.label}
      </a>
    );
  }
  return null;
}
function renderTextBlock(block, key) {
  if (block.type === 'quote-block'){
    return <div key={key} className="quote-block">
      <div className="quote-rule"></div>
      <div className="quote-content">
        {block.content.map((qBlock, i) => renderTextBlock(qBlock, i))}
      </div>
    </div>
  }
  else if (block.type === 'quote'){
    return <ul key={key} className="quote"><li>{block.content.map((qBlock, i) => renderTextBlock(qBlock, i))}</li></ul>
  }
  else if (block.type === 'numbered-list'){
    return <ol 
      key={key} 
      className="numbered-list"
    >
      {block.content.map((qBlock, i) => renderTextBlock(qBlock, i))}
    </ol>
  }
  else if (block.type === 'numbered-list-item'){
    return <li key={key}>
      {block.content.map((qBlock, i) => renderTextBlock(qBlock, i))}
    </li>
  }
  else if (block.type === 'numbered-list-item-bullet-list'){
    return <ul key={key}>
      {block.content.map((part, j) => (
        <li key={j}>{renderTextPart(part)}</li>
      ))}
    </ul>
  }

  const content = block.content.map((part, j) => (
    <Fragment key={j}>{renderTextPart(part)}</Fragment>
  ));
  if (block.type === 'paragraph') {
    return <p key={key} className="desc-paragraph">{content}</p>;
  }
  else if (block.type === 'bullet-lead') {
    return <p key={key} className="desc-bullet-lead">{content}</p>;
  }
  else if (block.type === 'numbered-list-item-lead') {
    return <p key={key} className="lead">{content}</p>;
  }
  else if (block.type === 'numbered-list-item-bullet-list-lead') {
    return <p key={key} className="num-list-bullet-lead">{content}</p>;
  }
  else if(block.type === 'bullet'){
    return (
      <ul key={key} className="desc-bullet-list">
        {block.content.map((part, j) => (
          <li key={j}>{renderTextPart(part)}</li>
        ))}
      </ul>
    );
  }
  else if (block.type === 'caption') {
    return <p key={key} className="desc-caption">{content}</p>;
  }
  else if (block.type === 'subtitle'){
    return <h3 key={key} className="desc-subtitle">{content}</h3>
  }
  else if (block.type === 'subtitle-two'){
    return <h2 key={key} className="desc-subtitle-two">{content} </h2>
  }
  else if (block.type === 'source'){
    return <ul key={key} className="source"><li>{content}</li></ul>
  }
  
  
  return null;
}
export function formatText(desc = []) {
  return desc.map((block, i) => renderTextBlock(block, i));
}
