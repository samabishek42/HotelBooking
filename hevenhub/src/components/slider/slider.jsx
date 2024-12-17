import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay
import "./slider.css";

const Slider = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No room images available</p>;
  }

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Include Autoplay
        spaceBetween={20}
        slidesPerView={2.5}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000, // 3 seconds between slides
          disableOnInteraction: false, // Keeps autoplay active even after manual interaction
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="slider-image"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
