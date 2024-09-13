import React, { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { PiSlideshow } from "react-icons/pi";
import Config from '../../../../../../config';
import SlideCreate from './components/Form/SlideCreate';
import SlideDelete from './components/Form/SlideDelete';
import SlideUpdate from './components/Form/SlideUpdate/SlideUpdate';

export default function Slide({ date, fetchDate }) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  return (

    <div className="CourseCard" style={{ marginBottom: '15px' }}>
      <div className="Course_card_content">
        <div className="Course_card_info">
          <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiSlideshow /></span></div>
          <div style={{ float: 'left' }}>
            <p className="Course_card_title"> Slide</p>
            <p className="Course_card_amount">   </p>
          </div>
        </div>
        <div className="Course_cardicon">
          <SlideCreate fetchDate={fetchDate} />
        </div> </div>
      {date && date.slide && date.slide.slice(0, displayCount).map((item) => (
        <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
          <div className="Course_card_content">
            <div className="Course_card_info">
              <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiImageOn /></span></div>
              <div style={{ float: 'left' }}><p className="Course_card_title">
                web
                {item.top_slider_web && <img src={`${Config.mediaURL}${item.top_slider_web}`} width={'100%'} alt="slide" />}
                mobile
                {item.top_slider_mobile && <img src={`${Config.mediaURL}${item.top_slider_mobile}`} width={'100%'} alt="slide" />}
              </p>
              </div></div>
            <div className="Course_cardicon">
              <SlideUpdate item={item} fetchDate={fetchDate} />
              {item && item.id && <SlideDelete item={item} fetchDate={fetchDate} />}
            </div></div> </div>))}
      <div className="Course_card_info" style={{ alignItems: "center" }}>
        <div className="Course_cardicon" style={{ width: '60%' }}>
          {date && date.slide && date.slide.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
        </div></div>
    </div>

  )
}







