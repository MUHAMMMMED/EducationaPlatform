
import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Review.css';
import studentImg from './Student.png';
import {
    AuthorContent,
    AuthorThumb,
    IMG,
    Name,
    P,
    ReviewAuthor,
    SPEN,
    SingleReview
} from './Styles'; // Import your custom styles
import './styles.css';


SwiperCore.use([Autoplay]);

export default function SliderReviews({ ratingsList }) {


    return (<>
        <div className='Slider_Swiper'>

            <Swiper autoplay={{ delay: 2500 }} loop spaceBetween={50}
                slidesPerView={window.innerWidth > 768 ? 3 : 1}     >

                {ratingsList.map((rating, index) => (
                    <SwiperSlide key={index}>
                        <SingleReview>
                            <ReviewAuthor>
                                <AuthorThumb>
                                    <IMG src={studentImg} alt="Author Thumb" />
                                    <i className="icofont-quote-left"></i>
                                </AuthorThumb>
                                <AuthorContent>
                                    <Name>{rating.user_full_name}</Name>
                                    <SPEN>
                                        {[...Array(parseInt(rating.rate_number))].map((_, starIndex) => (
                                            <GoStarFill key={starIndex} />
                                        ))}
                                    </SPEN>
                                </AuthorContent>
                            </ReviewAuthor>
                            <P>
                                <SPEN> <FaQuoteLeft />-</SPEN> {rating.message}<SPEN > - <FaQuoteRight /></SPEN>
                            </P>
                        </SingleReview>
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    </>
    );
};

