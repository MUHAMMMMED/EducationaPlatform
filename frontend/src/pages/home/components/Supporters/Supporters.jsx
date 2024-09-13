import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../config';
import { ImageSlider, MainTitle, SectionTitle, SlickSlideImg, SubTitle, Supporterscontainer } from './styles';

export default function Supporters({ supporters }) {

  return (
    <>

      <Supporterscontainer>

        <SectionTitle>
          <SubTitle>Supporters</SubTitle>
          <MainTitle> Our Key<span style={{ color: "#58a58f" }}> Supporters</span></MainTitle>   </SectionTitle>
        <ImageSlider>
          <Swiper spaceBetween={50} slidesPerView={window.innerWidth > 768 ? 6 : 3} loop={true} autoplay={{ delay: 1000, disableOnInteraction: false }}  >
            {supporters.map((item, index) => (<SwiperSlide key={index}><SlickSlideImg src={`${Config.mediaURL}/${item.image}`} alt={`Image ${item.title}`} /> </SwiperSlide>))}
          </Swiper>
        </ImageSlider>

      </Supporterscontainer>




















    </>
  )
}
