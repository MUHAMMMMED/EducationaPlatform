import React, { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { MdOutlineQuiz } from "react-icons/md";
import RateCreate from './RateCreate';
import RateDelete from './RateDelete';

export default function RateList({ Course, fetchCourse }) {
  const [displayCount, setDisplayCount] = useState(1);
  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  // Function to format timestamp into a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize the formatting here
  };
  return (
    <>

      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdOutlineQuiz /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> Rate </p>
              <p className="Course_card_amount">Count : {Course.rates_count}</p>
            </div>
          </div>
          <div className="Course_cardicon">
            {Course && Course.id && <RateCreate Course={Course} fetchCourse={fetchCourse} />}
          </div>
        </div>
        {Course && Course.rate && Course.rate.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaRegUser />
                </span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">
                    <p style={{ marginLeft: '10px' }}>
                      {item.user_full_name} -


                      {[...Array(parseInt(item.rate_number))].map((_, index) => (
                        <GoStarFill key={index} />))}</p></p>
                  <p style={{ marginLeft: '10px' }}>{formatDate(item.created)}</p>

                </div></div>
              <div className="Course_cardicon">
                {item && item.id && <RateDelete item={item} fetchCourse={fetchCourse} />}

              </div></div>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaQuoteRight /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title" style={{ textAlign: 'center' }}>
                    <FaQuoteLeft />-<span> {item.message}</span > - <FaQuoteRight /></p>
                </div>
              </div></div> </div>

        ))}

        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {Course && Course.rate && Course.rate.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  )
}
