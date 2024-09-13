
import React from 'react';
import { CiImageOn } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import Config from '../../../../../../../../config';
import LiveCourseReviewCreate from './LiveCourseReviewCreate';
import LiveCourseReviewDelete from './LiveCourseReviewDelete';
export default function LiveCourseReviewList({ liveCourses, fetchCourse }) {

  // Function to format timestamp into a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize the formatting here
  };
  return (
    <>

      <div className="CourseCard" style={{ marginBottom: '15px' }}>
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LuImagePlus /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">LiveCourseReview</p>
              <p className="Course_card_amount">user_full_name</p>
            </div>
          </div>
          <div className="Course_cardicon">
            {liveCourses && liveCourses.id && <LiveCourseReviewCreate courseId={liveCourses.id} fetchCourse={fetchCourse} />}
          </div> </div>
        {liveCourses && liveCourses.review_images && liveCourses.review_images.map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiImageOn /></span></div>
                <div style={{ float: 'left' }}><p className="Course_card_title">
                  {item.image && <img src={`${Config.mediaURL}${item.image}`} width={'100%'} alt="Review" />} </p>
                </div></div>
              <div className="Course_cardicon">
                {item && item.id && <LiveCourseReviewDelete item={item} fetchCourse={fetchCourse} />}
              </div></div> </div>))}
      </div>
    </>
  )
}
