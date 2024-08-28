import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../config';
import AxiosInstance from '../../../desing-system/Authentication/AxiosInstance';
import CoursesCard from '../../../desing-system/components/CoursesCard/CoursesCard';
import ExamCard from '../../../desing-system/components/ExamCard/ExamCard ';
import LiveCoursesCard from '../../../desing-system/components/LiveCoursesCard/LiveCoursesCard';
import '.././styles.css';

SwiperCore.use([Autoplay]);

export default function ItemList() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Query/Item_list/`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
<div className='Event_area'>

<div class="Event_widget-containe">
<div class="Even-widget-heading"> <h2 class="Event_heading-Title  "> Explore more courses and Quizzes.</h2> </div>
<div class="Event_widget-p"> Expand your knowledge and enhance your skills in various fields </div>		
</div>	

 
<div class="Event_widget_BUT	">
<Link to={`/AllCourses`} > <div className='Even_widget_btn' >Show More</div> </Link>
</div>		
     
<div style={{width:'100%',float:'left'}}>
 <Swiper autoplay={{ delay: 2500 }} loop spaceBetween={50} slidesPerView={window.innerWidth > 1200 ? 3 : 1}>
         
 {data.courses && data.courses.map(item => (
 <SwiperSlide> <CoursesCard key={item.id} course={item} /> </SwiperSlide>    ))}

 {data.live_courses&&data.live_courses.map(item => (  
 <SwiperSlide><LiveCoursesCard key={item.id} course={item} /></SwiperSlide> ))}  

 {data.exams &&data.exams.map(item => (
 <SwiperSlide> <ExamCard key={item.id} exam={item} /> </SwiperSlide> ))}
     
 </Swiper></div> </div>
  );
}


 