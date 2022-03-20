import imgCarousel1 from "../assets/img/carousel/carousel1.jpeg";
import imgCarousel2 from "../assets/img/carousel/carousel2.jpeg";
import imgCarousel3 from "../assets/img/carousel/carousel3.jpeg";

import Carousel from "react-multi-carousel";
import "./CarouselOffer.scss";
import "react-multi-carousel/lib/styles.css";

const CarouselOffer = ({ images }) => {
  const responsiveCarousel = {
    device: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container-carousel">
      <Carousel
        autoPlay={true}
        autoPlaySpeed={4000}
        itemClass="item-class"
        dotListClass="dotList"
        infinite={images.length > 1}
        arrows={images.length > 1}
        showDots={true}
        responsive={responsiveCarousel}
      >
        {images.map((image, index) => {
          return <img key={index} src={image} alt={"car-carousel"} />;
        })}
      </Carousel>
    </div>
  );
};

export default CarouselOffer;
