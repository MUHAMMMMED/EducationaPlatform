import React from 'react';
import { LuListEnd, LuListStart } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import LiveCoursefaqsFormCreate from './LiveCoursefaqsCreate';
import LiveCoursefaqsUpdate from './LiveCoursefaqsUpdate';

export default function LiveCoursefaqsList({liveCourses,fetchCourse} ) {
  return (
    <>
    
    <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdOutlineQuiz  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">LiveCourseFrequentlyAsked</p>
              <p className="Course_card_amount"> </p>
            </div>
          </div>
          <div className="Course_cardicon">
          
          {liveCourses &&liveCourses.id&&  <LiveCoursefaqsFormCreate liveCoursesId={liveCourses.id} fetchCourse={fetchCourse}/>}
           </div>
        </div>

        {liveCourses && liveCourses.questions&& liveCourses.questions.map((item) => (

        <div className="CourseCard"  key={item.id}  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuListStart  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> {item.question}</p>
            
            </div>
          </div>
          <div className="Course_cardicon">
          {item &&item.id &&  
                <LiveCoursefaqsUpdate item={item} fetchCourse={fetchCourse} /> }

          </div>
        </div>

        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuListEnd  /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> {item.answer}</p>
          
            </div>
          </div>
          
        </div>

       </div>

))}
    
        
      </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     </>
  )
}
