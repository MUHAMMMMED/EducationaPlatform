import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../config';
import Footer from '../../desing-system/components/Footer/Footer';
import Loading from '../../desing-system/components/Loading';
import EventCard from './components/EventCard/EventCard';

export default function EventList() {
  const [Events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/Event/`);

        setEvents(response.data);

      } catch (error) {
        console.error('Error fetching active events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }



  return (

    <div className='Container'>
      <div class="EventList">
        <div class="Event_Containe" style={{ width: '80%', marginLeft: '10%', marginTop: '10px' }}>
          <div class="Even-widget-heading"> <h2 class="Event_heading-title  "> Events</h2> </div>
          <div class="Event_widget-p"> Discover the upcoming key events and activities! </div>
        </div>
        <EventCard events={Events} />

        {Events.length === 0 && <div className='No_Available'>   No Events available</div>}

      </div>
      <Footer /> </div>
  );
}

