

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DownTimer.css';

function DownTimer({ data }) {
  const countDownDate = new Date(`${data.waitingDate} ${data.time}`).getTime();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
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
    <section className="section_DownTimer">
      <div className="container_DownTimer">
        <div className="row_DownTimer">
          <div className="col_DownTimer">
            <div className="deals_countdown_DownTimer">
              <ul className="COUntdown_DownTimer UNOrdered_list">
                {timeRemaining.expired ? (
                  <p style={{ textAlign: 'center', width: "100%" }}>
                    <strong>{data.Base.expired}</strong>
                  </p>
                ) : (
                  <>
                    <li><strong>{timeRemaining.days}</strong><span className='span_Days'>Days</span></li>
                    <li><strong className="dash">:</strong></li>
                    <li><strong>{timeRemaining.hours}</strong><span className='span_Days'>Hours</span></li>
                    <li><strong className="dash">:</strong></li>
                    <li><strong>{timeRemaining.minutes}</strong><span className='span_Days'>Mins</span></li>
                    <li><strong className="dash">:</strong></li>
                    <li><strong>{timeRemaining.seconds}</strong><span className='span_Days'>Secs</span></li>
                  </>
                )}
              </ul>

              <div className="discount_Value">
                {data.discount > 0 && (
                  <>
                    <strong>{data.discount}%</strong>
                    <span>{data.Base.sale}</span>
                  </>
                )}
              </div>

            </div>
            {!timeRemaining.expired && (
              <div className="btn_wrap pb-0">
                {data.is_login === true ? (
                  <Link to={`/Pay_LiveCourse/${data.id}`}>
                    <span className="btN border_dark">{data.Base.Countdown_Button}</span>
                  </Link>
                ) : (
                  <Link to={`/SignInUp_LiveCourse/${data.id}`}>
                    <span className="btN border_dark">{data.Base.Countdown_Button}</span>
                  </Link>
                )}
              </div>
            )}
            <p className="P">{data.Base.Countdown_P}</p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default DownTimer;
