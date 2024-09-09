
import React from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { IoMdMicrophone } from "react-icons/io";
import SpeakeDelete from './SpeakeDelete';
import SpeakerCreate from './SpeakerCreate';

export default function SpeakerList({ liveCourses, fetchCourse }) {

  return (
    <>
      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><IoMdMicrophone /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Speaker</p>
              <p className="Course_card_amount">user_full_name</p>
            </div></div>
          <div className="Course_cardicon">
            {liveCourses && liveCourses.base &&
              <SpeakerCreate baseId={liveCourses.base.id} fetchCourse={fetchCourse} />}
          </div></div>
        {liveCourses && liveCourses.base && liveCourses.base.speaker.map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiMicrophoneOn /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.Teacher.user_full_name}</p>
                  <p className="Course_card_amount">{item.description}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <SpeakeDelete speakerId={item.id} fetchCourse={fetchCourse} />}
              </div> </div> </div>
        ))}
      </div>
    </>
  )
}
