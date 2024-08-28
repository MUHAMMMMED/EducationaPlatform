 
import React from 'react';
import { TbTimelineEventText } from "react-icons/tb";
import { WiTime4 } from "react-icons/wi";
import './Timeline.css';
import FormCreate from './components/Form/FormCreate';
import FormUpdate from './components/Form/FormUpdate';

const Timeline = ({ liveCourses, fetchCourse }) => {
  const getMonthName = (monthIndex) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[monthIndex];
  };

   
  // Function to check if a date is today
  const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  };

  // Function to format time
  const formatTime = (timeString) => {
    const time = new Date(`01/01/2000 ${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <>
    
    <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><TbTimelineEventText /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Timeline</p>
              <p className="Course_card_amount"> </p>
            </div>
          </div>
          <div className="Course_cardicon">
            {liveCourses&&liveCourses.meeting&&<FormCreate data={liveCourses }   fetchCourse={fetchCourse}/>}
    
          </div></div>
      <div className="Course_Card"> 
      {liveCourses.timeline.map((item) => (
        <div className='Event-card' key={item.id}>
          {/* Display the event date dynamically */}
          <div className={isToday(new Date(item.meeting?.date)) ? 'Event-date' : 'Event-date1'}>
            {item.meeting && item.meeting?.date && (
              <>
                <h1 className='Event-date-h1'>
                  {new Date(item.meeting?.date).getDate()}
                </h1>
                {getMonthName(new Date(item.meeting?.date).getMonth())}
              </>
            )}
          </div>  
          <div className="Event-info">
            <div className="Event-details">
              <div className="Event-title">
                {item.title}
              </div>
              <div className="Event-time">
                {/* Display the event start and end time dynamically */}
                <WiTime4 /> {formatTime(item.meeting?.start_time)} - {formatTime(item.meeting?.end_time)}
              </div> 
              <div className="Event-but">
                {/* Display event buttons */}
                {item.Lesson_link && (
                  <a href={item.Lesson_link} className="no-underline" target="_blank" rel="noopener">
                    <button className= 'view-details-btn'>Material Link</button>
                  </a>
                )}
                {item.material_link && (
                  <a href={item.material_link} className="no-underline" target="_blank" rel="noopener">
                    <button   className= 'view-details-btn'>Lesson Link</button>
                  </a>
                )}
                {item.join_Quiz && (
                  <a href={item.join_Quiz} className="no-underline" target="_blank" rel="noopener">
                    <button  className= 'view-details-btn' >Join Quiz</button>
                  </a>
                )}
                {item.Quiz_Coupon && (
                  <button className= "view-details-Coupon">Coupon: {item.Quiz_Coupon}</button>
                )}
 
               
                  {liveCourses &&liveCourses.meeting && item.id&& (
                    <FormUpdate item_id={item.id} meeting={liveCourses.meeting} course_id={item.course} fetchCourse={fetchCourse} />  )}
               
               
              </div>
            </div>
          </div>
        </div>
      ))}


</div></div> 
    </>
  );
};

export default Timeline;

 