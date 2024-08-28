import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './components/EventCard/EventCard';
import './styles.css';
 
export default function Event({events}) {
  return (
    <> 
    <div className='Event__area'>

 <div class="Event_widget-containe">
 <div class="Even-widget-heading"> <h2 class="Event_heading-title  "> Events</h2> </div>
 <div class="Event_widget-p"> Discover the upcoming key events and activities! </div>		
 </div>	

 <div class="Event_widget_BUT	">
 <Link to={`/Events`} > <div className='Even_widget_btn' >Show More</div> </Link>
 </div>		
 	 
<div style={{width:'100%',float:'left'}}>
<EventCard events={events}/> </div> </div>

{events.length === 0   &&    <div className='No_Available'>   No Events available</div>}

  </>
  )
}
