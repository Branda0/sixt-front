import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../context/SearchContext";

import SearchComponents from "../components/SearchComponents";

const OfferConfig = ({ offer }) => {
  // Get data from Context
  const data = useContext(SearchContext);
  const [configurationData, setConfigurationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  // States values from Context
  const [search, setSearch] = data.search;
  const [agency, setAgency] = data.agency;
  const [timeStart, setTimeStart] = data.timeStart;
  const [timeEnd, setTimeEnd] = data.timeEnd;
  const [dateStart, setDateStart] = data.dateStart;
  const [dateEnd, setDateEnd] = data.dateEnd;

  // number of rental days (from context) if  value < 0 then departure date is temporaly after return date
  const rentalDays = data.rentalDays;

  // data fetch Hook to get selection offer carousel images
  useEffect(() => {
    try {
      console.log("in modal fetch");
      // Get List of agencies corresponding to search input
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:4000/offer/configurations?offerId=${offer.id}`);
        setConfigurationData(response.data);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [offer.id]);
  //location.state.offer / .rentalDays
  return (
    <>
      <SearchComponents />
      {/* <img src={} alt={"car-carousel"} /> */}
      <span>{rentalDays}</span>
    </>
  );
};

export default OfferConfig;
