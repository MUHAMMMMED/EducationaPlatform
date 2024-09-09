import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Card() {
  return (
    <>


      <section className="cardArea">
        <div className='SectionTitle'> </div>
        <div className="card"  >
          <div className="bannerItem">
            <div className="bannerContent">
              <span>Categories</span>
              <h3 className="bannerTitle">Courses</h3>

              <Link to={'/Course_Categories'}>
                <button className='E-btn'>View  </button>
              </Link>

            </div>
          </div>
        </div>



        <div className="card"  >
          <div className="bannerItem">
            <div className="bannerContent">
              <span>Categories</span>
              <h3 className="bannerTitle">Quizzes</h3>

              <Link to={'/Quiz_Categories'}>
                <button className='E-btn'>View  </button>
              </Link>

            </div>
          </div>
        </div>

      </section>
    </>
  );
}
