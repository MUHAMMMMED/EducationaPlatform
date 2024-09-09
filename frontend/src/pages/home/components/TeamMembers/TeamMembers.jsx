

import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../config';
import { No_Available, SectionName, SectionTitle, SingleTeam, SubTitle, TeamContent, TeamDesignation, TeamMembersSection, TeamName, TeamThumbCenterImg, TeamThumbImg, TeamWrapper } from './styles';

export default function TeamMembers({ team }) {
  return (
    <TeamMembersSection>
      <SectionTitle>
        <SubTitle>Top Instructors</SubTitle>
        <SectionName><span style={{ color: "#309255" }}>Instructors</span></SectionName>
      </SectionTitle>
      <TeamWrapper>
        <Swiper spaceBetween={30} slidesPerView={window.innerWidth > 768 ? 3 : 1} loop={true} autoplay={{ delay: 1000, disableOnInteraction: false }}>
          {team && team.map((item) => (
            <SwiperSlide key={item.id}>
              <SingleTeam>
                <TeamThumbCenterImg>
                  {item?.teacher?.height_image && (
                    <TeamThumbImg src={`${Config.baseURL}/${item?.teacher?.height_image}`} alt="Instructor" />
                  )}
                </TeamThumbCenterImg>
                <TeamContent>
                  <TeamName>{item?.teacher?.user_full_name}</TeamName>
                  <TeamDesignation>{item?.teacher?.job_title}</TeamDesignation>
                </TeamContent>
              </SingleTeam>
            </SwiperSlide>
          ))}

          {team?.length === 0 && (
            <No_Available>No Instructors available</No_Available>
          )}
        </Swiper>
      </TeamWrapper>
    </TeamMembersSection>
  );
}