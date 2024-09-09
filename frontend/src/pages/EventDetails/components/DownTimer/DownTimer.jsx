import React, { useEffect, useState } from 'react';
import './DownTimer.css'; // Import CSS file

function DownTimer({ date, time, join_meeting, join_meeting_link, courseId, roomId, completed }) {
  const countDownDate = date && time ? new Date(`${date} ${time}`).getTime() : 0;
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    // Check if dates are empty
    if (!date?.trim() || !time?.trim()) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  }

  return (
    <>
      {completed ? (
        <div className="finished">Meeting finished</div>
      ) : (
        <>
          {timeRemaining.expired ? (
            join_meeting && (
              <div className='div-livebutton'>
                {!join_meeting_link && courseId && roomId ? (
                  // <a href={`/Event_Room/${roomId}`} className="no-underline" target="_blank">
                  //   <button className="livebutton">
                  //     <samp className="live-samp">
                  //       <div className="live-circle"></div>
                  //       <div className="live-border"></div>
                  //     </samp>
                  //     <samp className="live-text">Join Now</samp>
                  //   </button>
                  // </a>
                  <></>

                ) : (
                  <a href={join_meeting_link} className="no-underline" target="_blank" rel="noopener">
                    <button className="livebutton">
                      <samp className="live-samp">
                        <div className="live-circle"></div>
                        <div className="live-border"></div>
                      </samp>
                      <samp className="live-text">Join Now</samp>
                    </button>
                  </a>
                )}
              </div>
            )
          ) : (
            <section className="section_DOWN">
              <p style={{ padding: '8px', textAlign: 'center' }}>STARTS ON</p>
              <div className="deals_countdown_Down">
                <ul className="countdown_Down unordered_list">
                  <>
                    <li className="li">
                      <strong style={{ width: '100%' }}>{timeRemaining.days}</strong>
                      <span style={{ width: '100%', textAlign: 'center' }}>Days</span>
                    </li>
                    <li>
                      <strong className="dash">:</strong>
                    </li>
                    <li className="li">
                      <strong style={{ width: '100%' }}>{timeRemaining.hours}</strong>
                      <span style={{ width: '100%', textAlign: 'center' }}>Hours</span>
                    </li>
                    <li>
                      <strong className="dash">:</strong>
                    </li>
                    <li className="li">
                      <strong style={{ width: '100%' }}>{timeRemaining.minutes}</strong>
                      <span style={{ width: '100%', textAlign: 'center' }}>Mins</span>
                    </li>
                    <li>
                      <strong className="dash">:</strong>
                    </li>
                    <li className="li">
                      <strong style={{ width: '100%' }}>{timeRemaining.seconds}</strong>
                      <span style={{ width: '100%', textAlign: 'center' }}>Secs</span>
                    </li>
                  </>
                </ul>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default DownTimer;
