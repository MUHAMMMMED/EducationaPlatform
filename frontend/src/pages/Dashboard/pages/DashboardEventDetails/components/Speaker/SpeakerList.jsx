
import React, { useState } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { IoMdMicrophone } from "react-icons/io";
import SpeakeDelete from './SpeakeDelete';
import SpeakerCreate from './SpeakerCreate';


export default function SpeakerList({ event, fetchEvent }) {
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
              <p className="Course_card_amount">  </p>
            </div></div>
          <div className="Course_cardicon">

            <SpeakerCreate event={event} fetchEvent={fetchEvent} />
          </div></div>


        {event && event.speaker.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiMicrophoneOn /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.name}</p>
                  <p className="Course_card_amount">{item.info}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <SpeakeDelete speakerId={item.id} fetchEvent={fetchEvent} />}
              </div> </div> </div>
        ))}
        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {event && event.speaker && event.speaker.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  )
}
