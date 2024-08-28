import React from 'react'
import {TeamMembersSection,SectionTitle,SubTitle,SectionName ,No_Available,TeamWrapper,SingleTeam ,TeamThumbCenterImg,TeamThumbImg,TeamContent,TeamName,TeamDesignation} from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Config from '../../../../config';


export default function TeamMembers({team}) {
  return (
    <>
     
 <TeamMembersSection>  
<SectionTitle>
<SubTitle>Top Instructors</SubTitle>
<SectionName> <span style={{color:"#309255" }}> Instructors</span></SectionName>
</SectionTitle>
<TeamWrapper>

<Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 3 : 1}  loop={true} autoplay={{ delay: 1000, disableOnInteraction: false }}>
    
  
 {team && team.map((item) => (
<SwiperSlide key={item.id}>
<SingleTeam>
<TeamThumbCenterImg><TeamThumbImg  src= {`${Config.baseURL}/${item.teacher.height_image}`}   alt="Instructor  "/> </TeamThumbCenterImg>
<TeamContent>
<TeamName>{item?.teacher?.user_full_name}</TeamName>
<TeamDesignation>{item?.teacher?.job_title}</TeamDesignation>
 </TeamContent>
</SingleTeam>
</SwiperSlide>
))}
   

   {team.length === 0   && <No_Available>   No Instructors available</No_Available>}
 
 </Swiper>     
</TeamWrapper>
</TeamMembersSection>
     
    </>
  )
}
