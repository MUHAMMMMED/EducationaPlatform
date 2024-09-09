
import React, { useState } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { IoMdMicrophone } from "react-icons/io";
import SpeakeDelete from './SpeakeDelete';
import SpeakerCreate from './SpeakerCreate';

export default function SpeakerList({ Course, fetchCourse }) {
  const [displayCount, setDisplayCount] = useState(1);
  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  return (
    <>
      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><IoMdMicrophone /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Speaker</p>
              <p className="Course_card_amount">Count :{Course.instructors_count}</p>
            </div></div>
          <div className="Course_cardicon">
            {Course &&
              <SpeakerCreate Course={Course} fetchCourse={fetchCourse} />}
          </div></div>

        {Course && Course.instructors.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiMicrophoneOn /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.teacher?.user_full_name}</p>
                  <p className="Course_card_amount">{item.description}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <SpeakeDelete speakerId={item.id} fetchCourse={fetchCourse} />}
              </div> </div> </div>
        ))}
        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {Course && Course.instructors && Course.instructors.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  )
}
