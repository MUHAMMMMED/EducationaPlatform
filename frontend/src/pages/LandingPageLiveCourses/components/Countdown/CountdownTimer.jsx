import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../../../config';
import './styles.css'; // Import the CSS file

function CountdownTimer({ data }) {
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
    <>

      <section class="section_Timer">
        <div class="container_Timer">
          <div class="row_Timer">
            <div class="Col_Timer  ">
              <div class="col_Timer_image  ">
                <div class="image_widget_Timer">
                  {data.card_image && (<img src={`${Config.baseURL}/${data.card_image}`} style={{ width: "100%" }} alt=" " />)}
                </div></div></div>
            <div class="Col_Timer">
              <div class="content_wrap_Timer">
                <div class="section_heading_wrap_Timer">
                  <h2 class="heading_text_Timer">{data.Base.Title_CountdownHead}</h2>
                  <p class="heading_description_Timer "> {data.Base.Countdown_Description}</p>
                </div>
                <div class="Deals_countdowN_Timer ">
                  <ul class="CountdowN_TimeR UNordered_List">
                    {timeRemaining.expired ? <li class="days_count" style={{ textAlign: 'center', width: "100%" }}><strong>    {data.Base.expired}</strong><span></span></li> :
                      <>
                        <li ><strong> {timeRemaining.days}</strong><span>Days</span></li>
                        <li><strong class="DAsh">:</strong></li>
                        <li ><strong> {timeRemaining.hours}</strong><span>Hours</span></li>
                        <li><strong class="DAsh">:</strong></li>
                        <li  ><strong> {timeRemaining.minutes}</strong><span>Mins</span></li>
                        <li><strong class="DAsh">:</strong></li>
                        <li  ><strong> {timeRemaining.seconds}</strong><span>Secs</span></li>
                      </>}</ul>
                  {data.discount && (<div class="Discount_Value"><strong>{data.discount}%</strong> <span> {data.Base.sale}</span></div>)}
                </div>
                {!timeRemaining.expired && (
                  <div className="btn_wrap pb-0">

                    {!timeRemaining.expired && (
                      <div className="btn_wrap pb-0">
                        {data.is_login === true ? (
                          <Link to={`/Pay_LiveCourse/${data.id}`}>
                            <a className="btn border_dark"  ><span>{data.Base.Countdown_Button}</span></a>
                          </Link>
                        ) : (
                          <Link to={`/SignInUp_LiveCourse/${data.id}`}>
                            <a className="btn border_dark"  ><span>{data.Base.Countdown_Button}</span></a>
                          </Link>
                        )}
                      </div>
                    )}

                    <p className='P'>{data.Base.Countdown_P}</p>
                  </div>
                )}
              </div></div></div></div>
      </section>
    </>
  );
}

export default CountdownTimer;
