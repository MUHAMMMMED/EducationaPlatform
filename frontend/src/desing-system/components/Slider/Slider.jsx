import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Config from '../../../config';
import './styles.css';

SwiperCore.use([Autoplay]);
export default function Slider({ review_images }) {
    return (<>
        <Swiper autoplay={{ delay: 2500 }} loop spaceBetween={50}
            slidesPerView={window.innerWidth > 1200 ? 3 : 1} >
            {review_images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img className='swiper-slideImg' src={`${Config.baseURL}/${image.image}`} alt={`Review Image ${index + 1}`} />
                </SwiperSlide>))}
        </Swiper></>
    );
};

