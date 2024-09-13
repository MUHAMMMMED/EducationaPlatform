import React, { useEffect, useState } from 'react';
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/bundle'; // Import Swiper bundle CSS
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import './Speaker.css'; // Make sure the path is correct for your CSS file

const Speaker = ({ eventId }) => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Event/speaker_list/${eventId}/`);
        setSpeakers(response.data);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };

    fetchSpeakers();
  }, [eventId]);

  return (
    <div className="Slick">
      <Swiper spaceBetween={0} slidesPerView={1} loop autoplay={{ delay: 3000, disableOnInteraction: false }} style={{ width: '100%' }}>
        {speakers.map((speaker, index) => (
          <SwiperSlide key={index}>
            <div className="post-header">
              <img src={`${Config.mediaURL}${speaker.image}`} alt="speaker" className="author-image" />
              <div className="author-name">{speaker.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Speaker;
