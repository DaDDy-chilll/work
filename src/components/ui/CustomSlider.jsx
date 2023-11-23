/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Zoom,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper/modules';
import { colors } from '../../assets/theme/theme';
import { useEffect, useRef } from 'react';

const CustomSlider = ({ items, currentImageUrl }) => {
  const ref = useRef();

  const images = items
    .filter((item) => item?.mimetype?.includes('image'))
    .map((el, index) => ({
      ...el,
      index,
    }));

  const currentImage = images.filter((item) => item.url === currentImageUrl)[0];

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        ref.current.swiper.zoom.in();
      } else {
        ref.current.swiper.zoom.out();
      }
    };

    const slides = document.querySelectorAll('.swiper-zoom-container');

    slides.forEach((el) => {
      el.addEventListener('wheel', handleWheel);
    });

    return function () {
      slides.forEach((el) => {
        el.removeEventListener('wheel', handleWheel);
      });
    };
  }, []);

  return (
    <Swiper
      ref={ref}
      style={{
        '--swiper-navigation-color': colors.black[800],
        '--swiper-pagination-color': colors.black[800],
      }}
      zoom={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      cssMode={true}
      mousewheel={true}
      keyboard={true}
      modules={[Zoom, Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      initialSlide={currentImage.index}
    >
      {images &&
        images.map((item) => (
          <SwiperSlide key={item.url}>
            <div className="swiper-zoom-container">
              <img
                src={item.url}
                alt={item.filename}
                style={{ minHeight: '500px' }}
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default CustomSlider;
