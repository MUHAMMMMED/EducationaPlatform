import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Config from '../../../../config';
import Content from '../Content';
import './Accordion.css';

const Accordion = ({ quiz, items, UserCourse }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => { setActiveIndex(index === activeIndex ? null : index); };
  useEffect(() => { }, []);
  return (
    <div className="accordion">
      {items && items.course_sections && items.course_sections.map((item, index) => (
        <div className="accordion-item" key={index}>
          <div className={`accordion-title ${index === activeIndex ? 'active' : ''}`} onClick={() => handleClick(index)} >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px  0px' }}>
              <div><span className="Title">{item.title}</span> <br /><span className="des">{item.description}</span> </div>
              <div style={{ margin: '17px  10px   0px  0px ' }}>
                {index === activeIndex ? (<samp className="Fa"><FaChevronDown /></samp>) : (<samp className="Fa"><FaChevronRight /></samp>)}
              </div></div> </div>
          {index === activeIndex && (<div className="accordion-content">
            <Content section={item} course={items} UserCourse={UserCourse} />
          </div>)}
        </div>))}

      {quiz && quiz.title && (
        <div className='Quizcard'>
          <div className="image-container">
            {items && items.exam && items.exam.card_image && (<img src={`${Config.baseURL}${items.exam.card_image}`} />)} </div>
          <div className="text-container">
            <h4 className="quiz-heading">Quiz | {items && items.exam && items.exam.category.title}</h4>
            <h3>  {items && items.exam && items.exam.title && items.exam.title}  </h3>
            <p>{items && items.exam && items.exam.description.slice(0, 100)}...   </p></div><div><div>
              {UserCourse === true ? (
                <Link style={{ textDecoration: 'none' }} to={`/MyQuizzes/${items.exam.title}/${items.exam.id}`}><button>Go to Quiz</button>  </Link>
              ) : (
                <button>  Quiz <FaLock /></button>)}
            </div></div></div>
      )}

    </div>
  );
};
export default Accordion;
