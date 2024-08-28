import { TbCategory2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CoursesTabsMenu, LI, P, Samp, UL, WorkIcon } from './styles';
import './styles.css';

const CategoryFilter = ({categories}) => {
  return (
    <CoursesTabsMenu>
     <UL>
      <Swiper spaceBetween={0} slidesPerView={window.innerWidth > 1200 ? 3 : 1}     loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }}>

      <SwiperSlide key={1}><Link to={`/AllCourses`} className="custom-link">    <LI><WorkIcon><TbCategory2 /> </WorkIcon> <P>All Courses<br/> <Samp>Show More</Samp></P></LI></Link>   </SwiperSlide>
      <SwiperSlide key={2}><Link to={`/Courses`} className="custom-link">    <LI><WorkIcon><TbCategory2 /> </WorkIcon> <P>Courses<br/> <Samp>Show More</Samp></P></LI></Link>   </SwiperSlide>
      <SwiperSlide key={3}><Link to={`/LiveCourses`} className="custom-link">   <LI><WorkIcon><TbCategory2 /> </WorkIcon> <P>Live Courses<br/> <Samp>Show More</Samp></P></LI></Link>   </SwiperSlide>
      <SwiperSlide key={4}><Link to={`/Quizzes`} className="custom-link">   <LI><WorkIcon><TbCategory2 /> </WorkIcon> <P>Quizzes<br/> <Samp>Show More</Samp></P></LI></Link>   </SwiperSlide>

      {categories.map((cat, index) => ( <SwiperSlide key={index}>
      <Link to={`/Category/${cat.id}/`} className="custom-link"> 
      <LI><WorkIcon><TbCategory2 /></WorkIcon><P>{cat.title}<br/> <Samp> Show More</Samp></P></LI></Link> 
      </SwiperSlide>))}</Swiper></UL> 
    </CoursesTabsMenu>
  );
};
export default CategoryFilter;
