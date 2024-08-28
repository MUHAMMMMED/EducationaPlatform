import React, { useState } from 'react';
import { LuListEnd, LuListStart } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import FaqsCreat from './FaqsCreate';
import FaqsUpdate from './FaqsUpdate';
  
export default function FaqsList({Course,fetchCourse} ) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  return (
    <>
    
    <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdOutlineQuiz  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> FrequentlyAsked</p>
              <p className="Course_card_amount">Count: { Course.freq_count}</p>
            </div></div>
          
          <div className="Course_cardicon">
          {Course &&Course.id&&  <FaqsCreat Course={Course.id} fetchCourse={fetchCourse}/>}
           </div></div>
           {Course && Course.freq && Course.freq.slice(0, displayCount).map((item) => (
 
        <div className="CourseCard"  key={item.id}  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuListStart  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> {item.question}</p>
         </div> </div>
          <div className="Course_cardicon">
         {item &&item.id &&   <FaqsUpdate item={item} fetchCourse={fetchCourse} /> }  
        </div></div>

        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuListEnd  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> {item.answer}</p>
            </div></div></div> </div>
            ))}
        <div className="Course_card_info"style={{alignItems:"center"}}>
         <div className="Course_cardicon" style={{width:'60%'}}>
        {Course && Course.freq && Course.freq.length > displayCount && ( <button className='Open_button' onClick={handleDisplayMore}>Load More</button> )}
        </div></div></div>   
 
</>
  )
}


 