
import React, { useCallback, useEffect, useState } from 'react';
import './DownTimer.css';

function DownTimer({ data }) {
  const countDownDate = data && data.waitingDate ? new Date(`${data.waitingDate} ${data.time}`).getTime() : null;

  // Use useCallback to memoize calculateTimeRemaining
  const calculateTimeRemaining = useCallback(() => {
    if (!countDownDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

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
  }, [countDownDate]); // Only recalculate when countDownDate changes

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]); // Now depends on the memoized calculateTimeRemaining

  return (

    <>
      {data && data.waitingDate && (
        <section className="section_DownTimer">
          <div className="container_DownTimer">
            <div className="row_DownTimer">
              <div className="col_DownTimer">
                <div className="deals_countdown_DownTimer">
                  <ul className="countdown_DownTimer unordered_list">
                    {timeRemaining.expired ? (
                      <li className="days_count"><strong>EXPIRED</strong><span></span></li>
                    ) : (
                      <>





                        <li className="Room_li"><strong>{timeRemaining.days}</strong><span>Days</span></li>
                        <li className="Room_li"><strong className="dash">:</strong></li>
                        <li className="Room_li"><strong>{timeRemaining.hours}</strong><span>Hours</span></li>
                        <li className="Room_li"><strong className="dash">:</strong></li>
                        <li className="Room_li"><strong>{timeRemaining.minutes}</strong><span>Mins</span></li>
                        <li className="Room_li"><strong className="dash">:</strong></li>
                        <li className="Room_li"><strong>{timeRemaining.seconds}</strong><span>Secs</span></li>
                      </>
                    )}
                  </ul>

                  <div className="discount_value"><strong>Waiting</strong> <span>Room</span></div>

                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default DownTimer;
