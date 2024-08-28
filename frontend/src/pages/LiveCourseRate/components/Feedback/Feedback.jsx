 
import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import studentImg from './Student.png';
import {
    AuthorThumb, AuthorThumbImg, AuthorThumbSpen,
    Feedbackcontainer,
    MainTitle,
    RatingBar,
    RatingStar,
    SectionTitle,
    Singletestimonial,
    TestimonialContentDesignation,
    TestimonialContentP,
    TestimonialWrapper
} from './styles';
 
export default function Feedback({rate}) {
    return (
<Feedbackcontainer>
<SectionTitle>
 <MainTitle>Feedback From <span> Student</span></MainTitle>  </SectionTitle>
<TestimonialWrapper>
<Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 2 : 1}  loop={true} autoplay={{ delay: 2000, disableOnInteraction: false }}>
 {rate.map((item, index) => ( 
<SwiperSlide  key={index}>
<Singletestimonial>
 <AuthorThumb>
<AuthorThumbImg    alt="Student" src={studentImg} />
<AuthorThumbSpen><FaQuoteLeft /></AuthorThumbSpen>
 </AuthorThumb>
<RatingStar><RatingBar>
{[...Array(parseInt(item.rate_number))].map((_, index) => ( <FaStar key={index} />
))}
</RatingBar>
</RatingStar>
<TestimonialContentP>
<p> {item.message}</p>
{item.student && item.student.user_full_name && (
 <TestimonialContentDesignation>{item.student.user_full_name}</TestimonialContentDesignation>
 )}
</TestimonialContentP></Singletestimonial></SwiperSlide>))} 
</Swiper></TestimonialWrapper></Feedbackcontainer>

); }
   
    