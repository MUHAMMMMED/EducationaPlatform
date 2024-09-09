import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function CardExamsList({ data }) {
  return (
    <>
      <section className="cardArea">

        {data.map(item => (
          <div className="card " key={item.id}>
            <div className="bannerItem  " >
              <div className="bannerContent">
                <span> Quiz</span>
                <h3 className="bannerTitle"> {item.title}   </h3>
                <Link to={`/Quiz/${item.id}/`}> <button className='E-btn'>Start Quiz </button></Link>
              </div> </div></div>
        ))} </section>
    </>
  );
}

