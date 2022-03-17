import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { SearchContext } from "../context/SearchContext";

import SearchComponents from "../components/SearchComponents";

const OfferConfig = () => {
  // Get data from Context
  const data = useContext(SearchContext);

  // States values from Context
  const [search, setSearch] = data.search;
  const [agency, setAgency] = data.agency;
  const [timeStart, setTimeStart] = data.timeStart;
  const [timeEnd, setTimeEnd] = data.timeEnd;
  const [dateStart, setDateStart] = data.dateStart;
  const [dateEnd, setDateEnd] = data.dateEnd;

  // number of rental days (from context) if  value < 0 then departure date is temporaly after return date
  const rentalDays = data.rentalDays;

  const location = useLocation();
  //location.state.offer / .rentalDays
  return (
    <>
      <SearchComponents />
      <span>{rentalDays}</span>
    </>
  );
};

export default OfferConfig;
