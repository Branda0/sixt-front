import "./Home.scss";
import { useEffect, useState, useContext } from "react";

// import classNames from "classnames";

import Modal from "../components/Modal";
import CarouselHome from "../components/CarouselHome";

const Home = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="Home-container">
      {modal && <Modal setModal={setModal} />}
      {/* <i className="ico-estate" /> */}
      <span>SILSIM</span>
      <CarouselHome />

      <button onClick={() => setModal(true)}>MODAL</button>
    </div>
  );
};

export default Home;
