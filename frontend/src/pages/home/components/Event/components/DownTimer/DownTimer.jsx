import React, { useEffect, useState } from 'react';
import Speaker from '../Speaker/Speaker';
import './DownTimer.css'; // Import CSS file

function DownTimer({ date, time, eventId }) {
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
      {timeRemaining.expired ? (
        <>
          <Speaker eventId={eventId} />
        </>
      ) : (
        <section className="section_DOWnn">
          <div className="deals_countdown_DowN">
            <ul className="countdown_DowN unordered_lisT">
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
  );
}

export default DownTimer;
