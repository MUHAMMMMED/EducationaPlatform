
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../config';
import './Meeting.css';
import CreateMeeting from './components/Form/FormCreate';
import MeetingCard from './components/MeetingCard/MeetingCard';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/meetings/list/`);
      setMeetings(response.data);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className='Container'>

      <div className='Meeting-container'>
        <div className='Meeting-header'><div className='Meeting-header-flex'>
          <div>Meeting List</div> <div>  <CreateMeeting fetchMeetings={fetchMeetings} />  </div>
        </div></div>
        {meetings.map(meeting => (<MeetingCard key={meeting.id} meeting={meeting} fetchMeetings={fetchMeetings} />))}
      </div> </div>
  );
};

export default Meeting;
