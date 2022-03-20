import { useEffect } from "react";

import "./Home.scss";

import worldImg from "../assets/img/sixt-in-the-world.png";
import timeTable from "../assets/data/timetable.json";
// import classNames from "classnames";

import SearchComponents from "../components/SearchComponents";
import CarouselHome from "../components/CarouselHome";

const Home = () => {
  // Scroll to Top screen when coming from another page with navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`home-container`}>
      <SearchComponents />
      <CarouselHome />
      <span className="worldmap-title">les agences sixt dans le monde</span>
      <img className="worldImg" src={worldImg} alt="" />
      <div className="media-containers">
        <span>télécharger l'app sixt</span>
        <div className="app-downloads">
          <i className="ico-apple-logo"></i>
          <i className="ico-google-logo"></i>
        </div>
        <span>suivez-nous</span>
        <div className="network-links">
          <i className="ico-fb-logo"></i>
          <i className="ico-twitter-logo"></i>
          <i className="ico-instagram-logo"></i>
          <i className="ico-youtube-logo"></i>
        </div>
      </div>
      {/* <i className="ico-estate" /> */}

      {/* <Link className={`test ${disabled && "disabled"} `} to="/offerlist">
        VOIR LES OFFRES
      </Link> */}

      {/* <AgencyModal data={agenciesData} setData={setAgenciesData} isLoading={isLoading} /> */}
    </div>
  );
};

export default Home;
