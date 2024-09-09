import React, { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import Config from '../../../../../../../../config';
import QuizReviewCreate from './QuizReviewCreate';
import QuizReviewDelete from './QuizReviewDelete';

export default function QuizReviewList({ quiz, fetchQuiz }) {
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
              <p className="Course_card_title"> Review </p>
              <p className="Course_card_amount">  Count: {quiz.review_count}</p>
            </div>
          </div>
          <div className="Course_cardicon">
            {quiz && quiz.id && <QuizReviewCreate quiz={quiz} fetchQuiz={fetchQuiz} />}
          </div>
        </div>


        {quiz.review && quiz.review.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiImageOn /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">
                    {item.image && <img src={`${Config.baseURL}${item.image}`} width={'100%'} alt="Review" />}
                  </p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <QuizReviewDelete item={item} fetchQuiz={fetchQuiz} />}
              </div>
            </div>
          </div>
        ))}


        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {quiz.review && quiz.review.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  );
}
