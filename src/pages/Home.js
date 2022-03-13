import "./Home.scss";
import { useEffect, useState, useContext } from "react";

// import classNames from "classnames";

import Modal from "../components/Modal";
import CarouselHome from "../components/CarouselHome";
import DateRange from "../components/DateRange";

const Home = () => {
  const [modal, setModal] = useState(false);

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  console.log("dateSTart =", typeof dateStart);

  return (
    <div className="Home-container">
      {modal && <Modal setModal={setModal} />}
      {/* <i className="ico-estate" /> */}
      <span>SILSIM</span>
      <CarouselHome />

      <div className="dates">
        <span>start = {dateStart}</span>
        <span>end = {dateEnd}</span>
      </div>

      <DateRange
        dateStart={dateStart}
        dateEnd={dateEnd}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
      />

      <button onClick={() => setModal(true)}>MODAL</button>
    </div>
  );
};

export default Home;
