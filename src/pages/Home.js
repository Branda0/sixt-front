import "./Home.scss";
import { useEffect, useState } from "react";

import timeTable from "../assets/data/timetable.json";
// import classNames from "classnames";

import SearchComponents from "../components/SearchComponents";
import CarouselHome from "../components/CarouselHome";

const Home = ({ setSelectModal, selectModal }) => {
  return (
    <div className={`home-container`}>
      <SearchComponents />

      {/* <i className="ico-estate" /> */}

      {/* <Link className={`test ${disabled && "disabled"} `} to="/offerlist">
        VOIR LES OFFRES
      </Link> */}
      <CarouselHome />

      {/* <AgencyModal data={agenciesData} setData={setAgenciesData} isLoading={isLoading} /> */}

      <div className="dates">
        {/* <span>start = {dateStart}</span>
        <span>end = {dateEnd}</span> */}
      </div>
      {/* <span>{timeStart.value}</span> */}
      {/* <DateRange
        dateStart={dateStart}
        dateEnd={dateEnd}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
      />
      <TimeSelector indexSelected={timeStart.index} setTime={setTimeStart} /> */}
    </div>
  );
};

export default Home;
