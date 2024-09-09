import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { MdAccessTime, MdComputer, MdDateRange } from 'react-icons/md'; // Import icons from react-icons
import { PiStudent } from "react-icons/pi";
import { Link } from 'react-router-dom';
import FormUpdate from '../Form/FormUpdate';

const MeetingCard = ({ meeting, fetchMeetings }) => {
  return (
    <div className="meeting-card">
      <div className="meeting-info">
        <div className="meeting-info-M" >M </div>
        <div className="meeting-info-T"> <div>{meeting.title}</div>
          <div className='created'>
            {new Date(meeting.created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, })}{meeting.active ? <GrFormView /> : <GrFormViewHide />} </div>
        </div>
        <div className="meeting-info-D" >
          {/* <div className='info-D'> <span>{meeting.active ? <GrFormView /> : <GrFormViewHide />}</span>  Active: {meeting.active ? "Active" : "Inactive"} </div> */}

          <div className='info-D'><span>   <PiStudent /></span> Student: {meeting.student}</div>

          <div className='info-D'><span>   <FaChalkboardTeacher /></span> Type: {meeting.type}</div>
          <div className='info-D'><span><MdComputer /></span> Course: {meeting.course}</div>
          <div className='info-D'><span><MdDateRange /></span>   Date: {meeting?.date}</div>
          <div className='info-D'><span><MdAccessTime /></span> Start Time: {meeting?.start_time}</div>
          <div className='info-D'><span><MdAccessTime /></span>  End Time: {meeting?.end_time}</div>
        </div></div>
      <div className='meeting-card-button '><div className="button-group">


        <Link to={`/room/${meeting.roomId}`}>
          <button className="Group-But But-update " style={{ backgroundColor: '#1da29d', color: '#fff' }} >
            Open Meeting</button> </Link>
        <FormUpdate item_id={meeting.id} fetchMeetings={fetchMeetings} />
      </div></div>
    </div>
  );
};



export default MeetingCard;
