import React from 'react';
import LearnEvent from '../LearnEvent/LearnEvent';
import OurSpeakers from '../OurSpeakers/OurSpeakers';
import './styles.css';

export default function AboutEvent({event}) {
  return (
    <>
    <div className='AboutEvent'>

    <div className='About_Event_Row1'>
    <div class="entry-content">
    <h5 class="fontMedium ">About The Event</h5>
    <div class="font_p">{event.description}  </div>

    </div>

<LearnEvent event={event}/>
<OurSpeakers event={event}/>
 </div>
{/* <div className='About_Event_Row2'>
<EventProduct/>
 </div> */}

	
</div>
 
        
 


    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

