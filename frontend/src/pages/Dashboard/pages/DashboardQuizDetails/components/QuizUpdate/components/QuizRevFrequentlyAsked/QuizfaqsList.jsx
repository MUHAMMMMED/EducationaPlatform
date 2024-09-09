import React, { useState } from 'react';
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import QuizfaqsCreate from './QuizfaqsCreate';
import QuizfaqsUpdate from './QuizfaqsUpdate';

export default function QuizfaqsList({ quiz, fetchQuiz }) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  return (
    <>
      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdOutlineQuiz /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> Frequently Asked</p>
              <p className="Course_card_amount">Count: {quiz.freq_count}  </p>
            </div>
          </div>
          <div className="Course_cardicon">
            {quiz && quiz.id && <QuizfaqsCreate quiz={quiz.id} fetchQuiz={fetchQuiz} />}
          </div>
        </div>


        {quiz && quiz.freq && quiz.freq.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaPersonCircleQuestion /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.question}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && <QuizfaqsUpdate item={item} fetchQuiz={fetchQuiz} />}
              </div>
            </div>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><RiQuestionnaireFill /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {quiz && quiz.freq && quiz.freq.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>

    </>
  );
}
