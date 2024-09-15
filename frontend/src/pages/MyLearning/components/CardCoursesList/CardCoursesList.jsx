import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function CardCoursesList({ data }) {
  return (
    <>{data &&
      <section className="cardArea">

        {data.map(item => (
          <div className="card" key={item.id}>
            <div className="bannerItem  " >
              <div className="bannerContent">
                <span>Online Courses</span>
                <h3 className="bannerTitle">  {item.title}   </h3>
                <Link to={`/course/${item.title}/${item.course_uuid}`}> <button className='E-BTN'>Start Learning </button></Link>
              </div> </div></div>))}
      </section>}
    </>
  );
}

