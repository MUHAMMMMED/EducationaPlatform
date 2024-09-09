import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function CardliveCoursesList({ data }) {
  return (
    <>
      {data &&
        <section className="cardArea">

          {data.map(item => (
            <div className="card" key={item.id}>
              <div className="bannerItem">
                <div className="bannerContent">
                  <span>Live Course</span>
                  <h3 className="bannerTitle">{item.title}</h3>

                  {item.status === 'W' && (
                    <Link to={`/LiveCourseWaiting/${item.id}/`}>
                      <button className='E-btn'>View Waiting Room</button>
                    </Link>
                  )}

                  {item.status === 'L' && (
                    <Link to={`/LiveCourseRoom/${item.id}/`}>
                      <button className='E-btn'>View Learning Room</button>
                    </Link>
                  )}

                  {item.status == 'F' && (<Link to={`/LiveCourseRate/${item.id}/`}>
                    <button className='E-btn'>Rate My Course</button>
                  </Link>)}

                  {item.status !== 'W' && item.status !== 'L' && item.status !== 'F' && (
                    <>
                      <h1 style={{ color: '#58a58f' }}> Out of Course</h1>
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </section>}
    </>
  );
}
