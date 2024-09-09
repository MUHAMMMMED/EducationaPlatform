import React from 'react';
import {
    AuthorThumb, AuthorThumbImg, AuthorThumbSpen,
    Feedbackcontainer,
    MainTitle,
    RatingBar,
    RatingStar,
    SectionTitle,
    Singletestimonial,
    SubTitle,
    TestimonialContentDesignation,
    TestimonialContentP,
    TestimonialWrapper
} from './styles';

import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import studentImg from './Student.png';

export default function Feedback({ rate }) {
    return (
        <Feedbackcontainer>
            <SectionTitle>
                <SubTitle>Student Testimonial</SubTitle>
                <MainTitle>Feedback From <span> Student</span></MainTitle>
            </SectionTitle>
            <TestimonialWrapper>
                <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1} loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }}>
                    {rate.map((item, index) => {
                        // Ensure that rate_number is a valid number
                        const rateNumber = parseInt(item.rate_number);
                        console.log(`rateNumber for item ${index}:`, rateNumber);

                        return (
                            <SwiperSlide key={index}>
                                <Singletestimonial>
                                    <AuthorThumb>
                                        <AuthorThumbImg alt="Student" src={studentImg} />
                                        <AuthorThumbSpen><FaQuoteLeft /></AuthorThumbSpen>
                                    </AuthorThumb>
                                    <RatingStar>
                                        <RatingBar>
                                            {[...Array(isNaN(rateNumber) || rateNumber < 0 ? 0 : rateNumber)].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                        </RatingBar>
                                    </RatingStar>
                                    <TestimonialContentP>
                                        <p style={{ lineHeight: '3' }}>{item.message}</p>
                                        <TestimonialContentDesignation>{item?.student?.user_full_name}</TestimonialContentDesignation>
                                    </TestimonialContentP>
                                </Singletestimonial>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </TestimonialWrapper>
        </Feedbackcontainer>
    );
}