import imgCarousel1 from "../assets/img/carousel/carousel1.jpeg";
import imgCarousel2 from "../assets/img/carousel/carousel2.jpeg";
import imgCarousel3 from "../assets/img/carousel/carousel3.jpeg";

import Carousel from "react-multi-carousel";
import "./CarouselHome.scss";
import "react-multi-carousel/lib/styles.css";

const CarouselHome = () => {
  const responsiveCarousel = {
    device: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      autoPlay={true}
      autoPlaySpeed={4000}
      className="carousel-home"
      dotListClass="dotList"
      infinite
      showDots
      responsive={responsiveCarousel}
    >
      <img src={imgCarousel1} />
      <img src={imgCarousel2} />
      <img src={imgCarousel3} />
    </Carousel>
  );
};

export default CarouselHome;
