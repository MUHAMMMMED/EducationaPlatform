 

import React, { useEffect, useState } from 'react';
import { BsCalendar4Event } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../desing-system/components/Loading';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import EventCreate from './components/EventCreate/EventCreate';
import './styles.css';

export default function EventsList() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
    const fetchEvent = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Event/event_filter/`, {
          params: {
          query: searchTerm,
          }
        });
        if (response.status !== 200) {
          throw new Error();
        }
        setResults(response.data);
      } catch (error) {
        setError(error.response.data.error  || "You do not have permission to access this data.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchEvent();
  }, [searchTerm ]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }






  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
 
  return (
<div className='Dashboard_container'>
<Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
<EventCreate fetchEvent={fetchEvent}/>
 

<div className="Course_card">
<form className="form" >
<div className="Course_card_content" style={{ padding: '0px 10px 10px 20px ' }}>
<input type="text" className='Search' onChange={handleSearch} value={searchTerm} placeholder="Search.." />
</div></form></div>

{results.map(event => (
<div key={event.id} className="Course_card">
<div className="Course_card_content">
<div className="Course_card_info">
<div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><BsCalendar4Event /></span></div>
<div style={{ float: 'left' }}>
<p className="Course_card_title">{event.title}</p>
<p className="Course_card_amount"> {event.start_time} : {event.end_time}</p> </div> </div>
<div className="Course_card_info"><p className="Course_card_title">{event.date}</p></div>
<div className="Course_cardicon"><Link to={`/event_Update/${event.id}`}><button className="Open_button">Open</button></Link>
</div></div></div>  ))}   
 <div style={{width:'100%' ,height:'150px',float:'left'}}/>
</div>
  );
}
 