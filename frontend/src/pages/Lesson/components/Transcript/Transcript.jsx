 

import React, { useState } from 'react';
import './Transcript.css';

export default function Transcript({ data }) {
  const [showFullContent, setShowFullContent] = useState(false);

  // Ensure data.Transcript is not null before accessing its content
  const content = data?.Transcript || '';

  // Check if content is not null before using split
  const displayContent = content ? (showFullContent ? content : `${content.split(' ').slice(0, 30).join(' ')}...`) : '';

  return ( 
    <>
      <h3 className='Transcript-h3'>Transcript</h3>
      <p   className='Transcript-p'>
        {displayContent}
        {!showFullContent && (
          <span className='Transcript-span'
            onClick={() => setShowFullContent(true)} >
            Read More
          </span>
        )}
        <br /> <br /> <br />
      </p>
    </>
  );
}
