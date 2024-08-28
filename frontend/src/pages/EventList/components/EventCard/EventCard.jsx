import React from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import DownTimer from '../DownTimer/DownTimer';
import './styles.css';
 
 

export default function EventCard({ events }) {
  // Function to format date as "DD MMM"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = date.getMonth();
    return `${day} ${monthNames[monthIndex]}`;
  };

  // Function to format time as "HH:MM AM/PM"
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
 

  return (
    <>
 
         {events.map(event => (
 
            <div key={event.id} className="Event_Card">
              <div className="flex-EventCard">
                <div className="Startdate">
                  <div className="day">{formatDate(event.date)}</div>
                </div>
              </div>
              <div className="Right-EventCard">
                <h3 className="Entry-title">{event.title}</h3>
 
              <DownTimer date={event.date} time={event.start_time} />

                <div className="Event-inf">
                  <div className="Event_Time">
                    <LuCalendarClock /> {formatTime(event.start_time)}
                  </div>
                  <Link to={`/Event/${event?.title}/${event?.id}`}>
                    <div className="Event_BUT">
                    <button className="Even-btN">view more</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
     
        ))}
 
    </>
  );
}
