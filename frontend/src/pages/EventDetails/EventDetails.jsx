import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import AboutEvent from './components/AboutEvent/AboutEvent';
import DownTimer from './components/DownTimer/DownTimer';
import HeadEvent from './components/HeadEvent/HeadEvent';
import JoinButtons from './components/JoinButtons/JoinButtons';
import './styles.css';


export default function EventDetails() {
  const { id:Id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  const fetchEventDetails = async () => {
    try {
      if (!Id) return;
      const response = await axios.get(`${Config.baseURL}/Event/event_details/${Id}/`);
      setEvent(response.data);
    } catch (error) {
      // setError(error); // Set error state if request fails
      setError(error.response?.data?.message || "The Event is not available");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchEventDetails();
  }, [Id]);

 
 
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
 

  return (
    <>
<div className='Container'> 

 <div className='Event'>


  <HeadEvent event={event} />
  <br/><br/> 
 <div className='Event_DownTimer'>
 <DownTimer
 date={event?.date}
 time={event?.start_time} 
 join_meeting={event?.roomId}
 join_meeting_link={event?.join_meeting_link}  
 courseId={event?.id} 
 roomId={event?.roomId} 
 completed={event?.completed} 
 />  
<br/><br/> 
{event&& <JoinButtons data={event} />   }
       
   </div>
  <AboutEvent event={event} />

</div>
</div>
    </>
  );
}
