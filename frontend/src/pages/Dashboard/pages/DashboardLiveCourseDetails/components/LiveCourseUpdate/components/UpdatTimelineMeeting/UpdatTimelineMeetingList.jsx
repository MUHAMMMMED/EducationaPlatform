import React from 'react';
import { IoCreateOutline } from "react-icons/io5";
import UpdatTimelineMeetingForm from './UpdatTimelineMeetingForm';

export default function UpdatTimelineMeetingList({ liveCourses, fetchCourse }) {
  return (
    <>

      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><IoCreateOutline /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Select Timeline Meeting </p>
              <p className="Course_card_amount"> </p>
            </div>
          </div>
          <div className="Course_cardicon">
            {liveCourses && liveCourses.base && liveCourses.base.id ? (
              <UpdatTimelineMeetingForm base={liveCourses.base} timeline={liveCourses.timeline} fetchCourse={fetchCourse} />
            ) : (
              liveCourses && liveCourses.id ? (
                <></>
              ) : null
            )}
          </div>
        </div>
      </div>


    </>
  )
}
