import React from 'react';
import { BsInfoCircle } from "react-icons/bs";
import CreateInfo from './components/Form/CreateInfo';
import UpdateInfo from './components/Form/UpdateInfo';

export default function Info({ date, fetchDate }) {
  return (

    <div className="CourseCard">
      <div className="Course_card_content">
        <div className="Course_card_info">
          <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><BsInfoCircle /></span></div>
          <div style={{ float: 'left' }}>
            <p className="Course_card_title">Info</p>
            <p className="Course_card_amount"> </p></div> </div>
        <div className="Course_cardicon">
          {date.info && date.info.id ? (
            <UpdateInfo info={date.info} fetchDate={fetchDate} />
          ) : (
            <CreateInfo fetchDate={fetchDate} />
          )}

        </div></div>  </div>

  )
}
