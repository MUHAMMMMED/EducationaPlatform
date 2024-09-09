import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import studentImg from './Student.png';
import {
      AuthorThumb, AuthorThumbImg, AuthorThumbSpen,
      Feedbackcontainer,
      RatingBar,
      RatingStar,
      SectionTitle,
      Singletestimonial,
      TestimonialContentDesignation,
      TestimonialContentP,
      TestimonialWrapper
} from './styles';

export default function Feedback({ data }) {
      return (
            <Feedbackcontainer>
                  <SectionTitle>
                  </SectionTitle>
                  <TestimonialWrapper>
                        <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 3 : 1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }}>

                              {data.map(rating => (
                                    <SwiperSlide key={rating.id}>
                                          <Singletestimonial>
                                                <AuthorThumb><AuthorThumbImg alt="Student" src={studentImg} />
                                                      <AuthorThumbSpen><FaQuoteLeft /></AuthorThumbSpen> </AuthorThumb>

                                                <RatingStar><RatingBar>
                                                      {[...Array(parseInt(rating.rate_number))].map((_, index) => (<FaStar key={index} />))}
                                                </RatingBar></RatingStar>
                                                <TestimonialContentP><p>{rating.message}</p>

                                                      {rating.student && rating.student.user_full_name && (
                                                            <TestimonialContentDesignation>{rating.student.user_full_name}</TestimonialContentDesignation>)}
                                                </TestimonialContentP></Singletestimonial></SwiperSlide>))}

                        </Swiper></TestimonialWrapper></Feedbackcontainer>

      );
}

