import "swiper/css/bundle";
import styles from "../photo-map/photo-map.module.scss";
import styles2 from "./swiper-template.module.scss";
import React, { useEffect, useRef } from "react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
SwiperCore.use([Navigation, Scrollbar]);
window.Swiper = SwiperCore;

const SwiperTemplate = ({ children, config }) => {
  const ref = useRef(null);

  useEffect(() => {
    const swiper = ref.current;

    new SwiperCore(swiper, config);

    return () => {
      // @TODO unmount SwiperTemplate
      console.log("unmount SwiperTemplate");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`swiper swiper-modal ${styles.photoMap_gallerySlider} ${styles2.swiper}`}
    >
      <div className={`swiper-wrapper ${styles.photoMap_gallerySliderWrapper}`}>
        {React.Children.map(children, (child) => (
          <div className={`swiper-slide ${styles.photoMap_gallerySlide}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
};

export default SwiperTemplate;
