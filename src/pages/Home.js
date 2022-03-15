import "./Home.scss";
import { useEffect, useState } from "react";

import timeTable from "../assets/data/timetable.json";
// import classNames from "classnames";

import Modal from "../components/Modal";
import SearchComponents from "../components/SearchComponents";
import AgencyModal from "../components/AgencyModal";
import CarouselHome from "../components/CarouselHome";
import DateRange from "../components/DateRange";
import TimeSelector from "../components/TimeSelector";

const Home = () => {
  const [modal, setModal] = useState(false);

  const [agency, setAgency] = useState({});

  const [agencyModal, setAgencyModal] = useState(false);

  // const [timeStart, setTimeStart] = useState({ value: timeTable[2], index: 2 });
  // const [timeEnd, setTimeEnd] = useState({ value: timeTable[16], index: 16 });
  // console.log(timeStart[0]);
  // console.log(timeStart[1]);
  // console.log(timeStart.time);
  // const [dateStart, setDateStart] = useState(null);
  // const [dateEnd, setDateEnd] = useState(null);

  const disabled = false;

  return (
    <div className={`home-container ${modal && "modal-open"}`}>
      <SearchComponents
      // search={search}
      // setSearch={setSearch}
      // timeStart={timeStart}
      // setTimeStart={setTimeStart}
      // timeEnd={timeEnd}
      // setTimeEnd={setTimeEnd}
      />

      {modal && <Modal setModal={setModal} />}
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

      <button onClick={() => setModal(true)}>MODAL</button>
    </div>
  );
};

export default Home;
