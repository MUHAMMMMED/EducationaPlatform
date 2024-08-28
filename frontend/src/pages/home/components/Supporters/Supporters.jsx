import React from 'react'
import {Supporterscontainer,SectionTitle,SubTitle,MainTitle,ImageSlider ,SlickSlideImg  } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Config from '../../../../config';

export default function Supporters({supporters}) {
  
  return (
    <>

<Supporterscontainer>

<SectionTitle> 
  <SubTitle>Supporters</SubTitle> 
<MainTitle> Our Key<span style={{color:"#58a58f" }}> Supporters</span></MainTitle>   </SectionTitle>
 <ImageSlider>
<Swiper spaceBetween={50} slidesPerView={window.innerWidth > 768 ? 6 : 3} loop={true} autoplay={{ delay: 1000,  disableOnInteraction: false   }}  >
 {supporters.map((item, index) => ( <SwiperSlide key={index}><SlickSlideImg src={`${Config.baseURL}/${item.image}`}    alt={`Image ${item.title}`} /> </SwiperSlide>  ))} 
</Swiper>
 </ImageSlider>

</Supporterscontainer>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
