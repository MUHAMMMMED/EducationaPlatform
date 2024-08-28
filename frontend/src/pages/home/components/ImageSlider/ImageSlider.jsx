 
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/bundle'; // Import Swiper bundle CSS
import Config from '../../../../config';
const ImageSlider = ({slide}) => {
  return (
    <div className='Slick'>
      <Swiper spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }}style={{ width: '100%' }}    >
        {slide.map((item, index) => (
          <SwiperSlide key={index}> <img className='slickSlideImg' src= {`${Config.baseURL}/${item.top_slider_web}`} alt={'Image'} style={{ width: '100%' }} />
          </SwiperSlide> ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
 