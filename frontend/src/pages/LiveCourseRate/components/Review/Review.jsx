import PropTypes from 'prop-types';
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import './Review.css';
   
const Review = ({courseId}) => {
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false); // State variable for submit success
  const handleRatingChange = (newRating) => {setRating(newRating);};
  const handleCommentChange = (event) => { setComment(event.target.value);  };
  const handleSubmit = () => {
    AxiosInstance.post(`${Config.baseURL}/LiveCourses/create_LiveCourseRate/`, {
      message: comment,
      rate_number: rating,
      course: courseId,
 
    })
      .then((response) => {
        setSubmitSuccess(true); // Set submit success to true
       })
      .catch((error) => {
       });
  };

  return (
    <div className="Review-container">

         <>
          {submitSuccess ? (
            <p className="success-message">Review submitted successfully!</p>
          ) : (
            <>
              <h2>Write A Review</h2>
              <div className="rating-section">
                <StarRatings
                  rating={rating}
                  starRatedColor="#FFD700"
                  starHoverColor="#FFD700"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name="rating"
                  className="custom-star-ratings"
                />
              </div>
              <div className="comment-section">
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write your comment here..."
                  rows={4}
                />
              </div>
              <button className="submit-button" onClick={handleSubmit}>
                Send
              </button>
            </>
          )}
        </>
 

     </div>
  );
};

Review.propTypes = {
  courseId: PropTypes.shape({
    course_uuid: PropTypes.string.isRequired,
  }).isRequired,
  userCourse: PropTypes.object.isRequired,  
  user: PropTypes.object.isRequired,};
export default Review;
