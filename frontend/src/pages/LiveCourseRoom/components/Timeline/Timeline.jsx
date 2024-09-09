
import React from 'react';
import { WiTime4 } from "react-icons/wi";
import './Timeline.css';
import FormUpdate from './components/Form/FormUpdate';
import './timelinestyles.css';

const Timeline = ({ data, is_author, fetchCourse }) => {
  const getMonthName = (monthIndex) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[monthIndex];
  };

  // Function to check if a date is today
  const isToday = (someDate) => {
    if (!someDate || !(someDate instanceof Date)) {
      return false; // Handle cases where someDate is undefined or not a Date object
    }

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
      {data.timeline.map((item) => (
        <div key={item.id}>
          {item.meeting && (
            <div className='event-card'>
              <div className={isToday(new Date(item.meeting.date)) ? 'event-date' : 'event-date1'}>
                {item.meeting.date && (
                  <>
                    <h1 className='event-date-h1'>
                      {new Date(item.meeting.date).getDate()}
                    </h1>
                    {getMonthName(new Date(item.meeting.date).getMonth())}
                  </>
                )}
              </div>
              <div className="event-info">
                <div className="event-Details">
                  <div className='event-Title'>
                    {item.title}
                  </div>
                  <div className='event-Time'>
                    <WiTime4 /> {formatTime(item.meeting?.start_time)} - {formatTime(item.meeting?.end_time)}
                  </div>
                  <div className="event-but">
                    {item.Lesson_link && (
                      <a href={item.Lesson_link} className="no-underline" target="_blank" rel="noopener">
                        <button className='view-details-btn'>Material Link</button>
                      </a>
                    )}
                    {item.material_link && (
                      <a href={item.material_link} className="no-underline" target="_blank" rel="noopener">
                        <button className='view-details-btn'>Lesson Link</button>
                      </a>
                    )}
                    {item.join_Quiz && (
                      <a href={item.join_Quiz} className="no-underline" target="_blank" rel="noopener">
                        <button className='view-details-btn'>Join Quiz</button>
                      </a>
                    )}
                    {item.Quiz_Coupon && (
                      <button className='view-details-Coupon'>  Coupon: {item.Quiz_Coupon}</button>
                    )}
                    {is_author === true && (
                      <div className="Edit">
                        <FormUpdate item_id={item.id} meeting={data.meeting} course_id={item.course} fetchCourse={fetchCourse} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Timeline;
