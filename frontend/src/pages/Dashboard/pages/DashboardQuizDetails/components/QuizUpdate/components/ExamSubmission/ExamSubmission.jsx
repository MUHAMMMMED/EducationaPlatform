
import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { PiExamThin } from "react-icons/pi";
import ExamSubmissionDelete from './ExamSubmissionDelete';

export default function ExamSubmission({ quiz, fetchQuiz }) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  return (
    <div>
      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiExamThin /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Exam Submission</p>
              <p className="Course_card_amount">  Count: {quiz.submission_count}  </p>
            </div>
          </div>
          <div className="Course_cardicon">  </div>
        </div>

        {quiz.submission.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaRegUser /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.user_full_name}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <ExamSubmissionDelete item={item} fetchQuiz={fetchQuiz} />}
              </div>
            </div>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiExamThin /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">Score: {item.score}</p>
                  <p className="Course_card_title">Time Taking: {item.time_taking}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {quiz.submission.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div> </div>
  );
}
