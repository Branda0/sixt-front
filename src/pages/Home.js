import "./Home.scss";
import { useEffect, useState, useContext } from "react";
import React from "react";

import imgCarousel1 from "../assets/img/carousel/carousel1.jpeg";
import imgCarousel2 from "../assets/img/carousel/carousel2.jpeg";
import imgCarousel3 from "../assets/img/carousel/carousel3.jpeg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import classNames from "classnames";

import Modal from "../components/Modal";
// import Carousel from "../components/Carousel";

const Home = () => {
  const responsiveCarousel = {
    device: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const [modal, setModal] = useState(false);

  return (
    <div className="Home-container">
      {modal && <Modal setModal={setModal} />}
      {/* <i className="ico-estate" /> */}
      <span>SILSIM</span>

      <Carousel
        autoPlay={true}
        autoPlaySpeed={4000}
        className="carousel"
        // containerClass="carousel-container"
        itemClass="item-class"
        dotListClass="dotList"
        infinite
        showDots
        responsive={responsiveCarousel}
        disabled={true}
      >
        <img src={imgCarousel1} />
        <img src={imgCarousel2} />
        <img src={imgCarousel3} />
      </Carousel>

      <button onClick={() => setModal(true)}>MODAL</button>
    </div>
  );
};

export default Home;
