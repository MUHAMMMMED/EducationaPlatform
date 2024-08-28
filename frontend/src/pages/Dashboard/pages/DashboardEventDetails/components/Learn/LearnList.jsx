import React, { useState } from 'react';
 
import { ImList } from "react-icons/im";
import { LuListStart } from "react-icons/lu";
import LearnCreate from './LearnCreate';
import LearnUpdate from './LearnUpdate';
  
export default function LearnList({event, fetchEvent } ) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  return (
    <>
    
    <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><ImList  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> Learn</p>
              <p className="Course_card_amount">   </p>
            </div></div>
          
          <div className="Course_cardicon">
          {event &&event.id&&  <LearnCreate eventId={event.id} fetchEvent={fetchEvent}/>}
           </div></div>
           {event && event.learn.slice(0, displayCount).map((item) => (
 
        <div className="CourseCard"  key={item.id}  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuListStart  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> {item.title}</p>
         </div> </div>
          <div className="Course_cardicon">
         {item &&item.id &&   <LearnUpdate item={item} fetchEvent={fetchEvent} /> }  
        </div></div>

 </div>
            ))}
        <div className="Course_card_info"style={{alignItems:"center"}}>
         <div className="Course_cardicon" style={{width:'60%'}}>
        {event &&event.learn&& event.learn.length > displayCount && ( <button className='Open_button' onClick={handleDisplayMore}>Load More</button> )}
        </div></div></div>   
 
</>
  )
}


 