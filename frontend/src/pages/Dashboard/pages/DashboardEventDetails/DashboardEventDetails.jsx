 

import React, { useEffect, useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import Views from '../../components/Views/Views';
import EventDelete from './components/EventUpdateForm/EventDelete';
import EventUpdateForm from './components/EventUpdateForm/EventUpdateForm';
import LearnList from './components/Learn/LearnList';
import SpeakerList from './components/Speaker/SpeakerList';
 

export default function DashboardEventDetails() {
 
  const {id:EventId } = useParams();
 
  const [event, setEvent] = useState([]);

  const fetchEvent = () => {
    if (!EventId) return;
    AxiosInstance.get(`${Config.baseURL}/Event/events/${EventId}/`)
      .then(response => {
        setEvent(response.data);
      })
   
   };


  useEffect(() => {
    fetchEvent();  
  }, []);
 
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => { setShowSidebar(!showSidebar); };

  return (
    <>
        <div className='Dashboard_container'>

        <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="head-flex-container">
        <div><samp> <button className="ButtonSidebar" onClick={toggleSidebar}> = </button></samp> Dashboard </div>
        <div> {event.title} </div>
        <div>  {event && event.id && ( <EventDelete event={event} />)} </div>
        </div>  
        
        <Views Views={event?.views}/>

        <div className="CourseCard" >
        <div className="Course_card_content">
        <div className="Course_card_info">
        <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><GrUpdate /></span></div>
        <div style={{ float: 'left' }}>
        <p className="Course_card_title"> Event</p>
        <p className="Course_card_amount">Update</p></div> </div>
        <div className="Course_cardicon">  
        {event && event.id && (<EventUpdateForm event={event} fetchEvent={fetchEvent} />)}
        </div></div>  </div> 
        {event && event.speaker && ( <SpeakerList event={event} fetchEvent={fetchEvent} />)}
        {event && event.learn && (<LearnList event={event} fetchEvent={fetchEvent} />)}
        </div>
 </>
  );
}
