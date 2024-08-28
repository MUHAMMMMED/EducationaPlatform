import React from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import DownTimer from '../DownTimer/DownTimer';
import './styles.css';

function shuffleArray(array) {
  const clonedArray = [...array];
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray;
}

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

  // Create three shuffled arrays
  const shuffledArray1 = shuffleArray(events);
  const shuffledArray2 = shuffleArray(events);
  const shuffledArray3 = shuffleArray(events);

  return (
    <>
      <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {shuffledArray1.map(event => (
          <SwiperSlide key={event.id}>
            <div key={event.id} className="EventCard">
              <div className="flex-EventCard">
                <div className="startdate">
                  <div className="day">{formatDate(event.date)}</div>
                </div>
              </div>
              <div className="Right-EventCard">
                <h3 className="Entry-title">{event.title}</h3>
                <DownTimer date={event.date} time={event.start_time} eventId={event.id} />
       
                <div className="Event-inf">
                  <div className="Event_Time">
                    <LuCalendarClock /> {formatTime(event.start_time)}
                  </div>
                  <Link to={`/Event/${event?.title}/${event?.id}`}>
                    <div className="Event_BUT">
                      <button className="Even-btn">view more</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {shuffledArray2.map(event => (
          <SwiperSlide key={event.id}>
            <div key={event.id} className="EventCard">
              <div className="flex-EventCard">
                <div className="startdate">
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
                      <button className="Even-btn">view more</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {shuffledArray3.map(event => (
          <SwiperSlide key={event.id}>
            <div key={event.id} className="EventCard">
              <div className="flex-EventCard">
                <div className="startdate">
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
                    <button className="Even-btn">view more</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
