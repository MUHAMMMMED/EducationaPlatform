
import React from 'react';
import { MdOutlineAccessTime, MdOutlineDateRange } from 'react-icons/md';
import Event from './Event.webp';
import './styles.css';

export default function HeadEvent({ event }) {
  // Function to format the date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to format the time
  const formatTime = (timeStr) => {
    if (!timeStr || isNaN(new Date('2000-01-01T' + timeStr))) {
      return ''; // Return an empty string if the time string is invalid
    }

    const date = new Date('2000-01-01T' + timeStr);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  return (
    <>

      <div className="header-single-envent" style={{ backgroundImage: `url(${Event})` }}>

        <div className="envent_container">
          <div className="entry-title">{event.title}</div>
          <div className="detail-time-location">
            <div className="event-time">
              <span style={{ marginRight: '5px' }}>
                <MdOutlineDateRange />
              </span>{' '}
              {formatDate(event.date)}
            </div>
            <div className="event-time">
              <span style={{ marginRight: '5px' }}>
                <MdOutlineAccessTime />
              </span>{' '}
              {formatTime(event.start_time)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
