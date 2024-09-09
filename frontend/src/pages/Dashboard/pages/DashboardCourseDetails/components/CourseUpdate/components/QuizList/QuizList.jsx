
import React, { useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import QuestionList from '../Questions/QuestionList/QuestionList';
import QuizCreate from './QuizCreate';
import QuizUpdate from './QuizUpdate';

export default function QuizList({ Course, fetchCourse }) {
  const [showMore, setShowMore] = useState(false);
  const initialCount = 1;
  const [displayCount, setDisplayCount] = useState(initialCount);

  const handleShowMore = () => {
    setDisplayCount(Course.EpisodeQuiz.length);
    setShowMore(true);
  };

  return (
    <div className="CourseCard">
      <div className="Course_card_content">
        <div className="Course_card_info">
          <div style={{ float: 'left', width: '65px' }}>
            <span className='onLine-icon'><GrUpdate /></span>
          </div>
          <div style={{ float: 'left' }}>
            <p className="Course_card_title"> Quiz</p>
            <p className="Course_card_amount">Add</p>
          </div>
        </div>
        <div className="Course_cardicon">
          {Course && <QuizCreate Course={Course} fetchCourse={fetchCourse} />}
        </div>
      </div>

      {Course && Course.EpisodeQuiz && Course.EpisodeQuiz.slice(0, displayCount).map((item) => (
        <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
          <div className="Course_card_content">
            <div className="Course_card_info">
              <div style={{ float: 'left', width: '65px' }}>
                <span className='onLine-icon'><GrUpdate /></span>
              </div>
              <div style={{ float: 'left' }}>
                <p className="Course_card_title">{item.title}</p>
                <p className="Course_card_amount">{item.description}</p>
              </div>
            </div>
            <div className="Course_cardicon">
              {item && <QuizUpdate item={item} fetchCourse={fetchCourse} />}
            </div>
          </div>
          {Course && item.questions && <QuestionList questions={item.questions} Course={Course} quizId={item.id} fetchQuestions={fetchCourse} />}
        </div>
      ))}

      <div className="Course_card_info" style={{ alignItems: "center" }}>
        <div className="Course_cardicon" style={{ width: '60%' }}>
          {!showMore && Course && Course.EpisodeQuiz && Course.EpisodeQuiz.length > initialCount && (
            <button className='Open_button' onClick={handleShowMore}>Show More</button>)}
        </div></div>

    </div>

  );
}
