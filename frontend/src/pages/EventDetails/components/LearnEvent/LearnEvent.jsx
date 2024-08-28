import React from 'react';
import { BsCheckCircle } from "react-icons/bs";
import './styles.css';

export default function LearnEvent({event}) {
  return (
    <> 
 <div class="entry-content">
 <h5 class="fontMedium ">What you’ll learn</h5>
<div style={{width:'100%'}}>
<ul className="list-border-check">
{event.learn.map(event => (
 <li><span className='Check' key={event.id} ><BsCheckCircle /></span>{event.title }.</li>
 ))}
 
</ul></div> </div>
 </>
  )
}
