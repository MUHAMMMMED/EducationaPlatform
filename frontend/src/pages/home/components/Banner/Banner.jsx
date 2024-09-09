import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Online from './banner-img-1.png';
import Courses from './banner-img-2.png';
import Quiz from './banner-quiz.jpg';
import './styles.css';
export default function Banner() {
  return (
    <section className="Banner_area">
      <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1} loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }}>
        <SwiperSlide key={1}>
          <div className="card_banner">
            <div className="banner__item">
              <div className="banner__content"><span>new</span>
                <h3 className="banner__title">Online Courses   <br />  </h3>
                <Link to={'/courses'} className="e-btn"> Find Out More </Link>  </div>
              <div className="banner__thumb">  <img src={Online} alt="Online" /> </div>
            </div></div>
        </SwiperSlide>

        <SwiperSlide key={2}>
          <div className="card_banner">
            <div className="banner__item">
              <div className="banner__content">
                <span className="orange">new</span>
                <h3 className="banner__title">Courses Live  <br /></h3>
                <Link to={'/LiveCourses'} className="e-btn"> Find Out More </Link>  </div>
              <div className="banner__thumb">
                <img src={Courses} alt="Courses" />
              </div></div></div>
        </SwiperSlide>

        <SwiperSlide key={3}>
          <div className="card_banner">
            <div className="banner__item">
              <div className="banner__content">
                <span>new</span>
                <h3 className="banner__title">Quizzes  <br />  </h3>
                <Link to={'/Quizzes'} className="e-btn"> Find Out More </Link>  </div>
              <div className="banner__thumb">
                <img src={Quiz} alt="Quiz" />
              </div></div></div>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}
