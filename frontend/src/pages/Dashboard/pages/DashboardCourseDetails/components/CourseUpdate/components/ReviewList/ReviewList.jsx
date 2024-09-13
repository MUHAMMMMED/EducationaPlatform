
import React, { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import Config from '../../../../../../../../config';
import ReviewCreate from './ReviewCreate';
import ReviewDelete from './ReviewDelete';

export default function ReviewList({ Course, fetchCourse }) {
  const [displayCount, setDisplayCount] = useState(1);

  // Function to format timestamp into a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize the formatting here
  };

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  return (
    <>

      <div className="CourseCard" style={{ marginBottom: '15px' }}>
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuImagePlus /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> Review</p>
              <p className="Course_card_amount">Count: {Course.review_count}</p>
            </div>
          </div>
          <div className="Course_cardicon">
            {Course && Course.id && <ReviewCreate courseId={Course.id} fetchCourse={fetchCourse} />}
          </div> </div>
        {Course && Course.review && Course.review.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiImageOn /></span></div>
                <div style={{ float: 'left' }}><p className="Course_card_title">
                  {item.image && <img src={`${Config.mediaURL}${item.image}`} width={'100%'} alt="Review" />} </p>
                </div></div>
              <div className="Course_cardicon">
                {item && item.id && <ReviewDelete item={item} fetchCourse={fetchCourse} />}
              </div></div> </div>))}
        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {Course && Course.review && Course.review.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  )
}

