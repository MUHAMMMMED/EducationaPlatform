import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function CardCoursesList({ data }) {
  return (
    <>
      {data && data.related_courses && (
        <section className="cardArea">
          <div className='SectionTitle'>Courses</div>
          {data && data?.related_courses && data?.related_courses.map(item => (
            <div className="card" key={item.id}>
              <div className="bannerItem">
                <div className="bannerContent">
                  <span>Courses</span>
                  <h3 className="bannerTitle">
                    {item.title}
                  </h3>
                  <Link to={`/course/${item.id}/`}>
                    <button className='E-btn'>start learning</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>)}
    </>
  );
}
