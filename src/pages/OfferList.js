import { useEffect, useState, useContext } from "react";

import { SearchContext } from "../context/SearchContext";

import SearchComponents from "../components/SearchComponents";
import OfferCard from "../components/OfferCard";

import "./OfferList.scss";

import axios from "axios";

const OfferList = () => {
  // States values from Global context
  const [search, setSearch] = useContext(SearchContext).search;
  const [agency, setAgency] = useContext(SearchContext).agency;
  const [timeStart, setTimeStart] = useContext(SearchContext).timeStart;
  const [timeEnd, setTimeEnd] = useContext(SearchContext).timeEnd;
  const [dateStart, setDateStart] = useContext(SearchContext).dateStart;
  const [dateEnd, setDateEnd] = useContext(SearchContext).dateEnd;

  // number of rental days (from context)
  const rentalDays = useContext(SearchContext).rentalDays;

  const today = new Date();
  const date = new Date(`${dateEnd}T${timeEnd.value}:00`);
  console.log("date", date);
  console.log("today ", today);

  // Agencies Data from API call and Loading status
  const [offersData, setOffersData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Filter modal pop-up states
  const [filterModal, setFilterModal] = useState(false);
  // const [dateModal, setDateModal] = useState(false);

  // Offers data fetch Hook
  useEffect(() => {
    try {
      console.log("agency = ", agency);
      // Get List of offers corresponding to search engine inputs
      const fetchData = async () => {
        setIsLoading(true);
        //Prepare data for api call startDate and endDate with format YYYY-MM-DDTHH:MM:SS
        const response = await axios.get(
          `http://localhost:4000/offers?agencyId=${agency}&startDate=${dateStart}T${timeStart.value}:00&endDate=${dateEnd}T${timeEnd.value}:00`
        );
        setOffersData(response.data);
        setIsLoading(false);
        console.log(response.data);
      };

      // Don't fetch data if Return Date < Departure Date and agency not selected
      if (agency || rentalDays > 0) {
        fetchData();
      } else {
        // setIsLoading(true);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [agency, timeStart, timeEnd, dateStart, dateEnd]);
  return (
    <>
      <SearchComponents />
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="offers-container">
          <div className="filter-bar">
            <section className="offers-count">
              <div>
                <span className="count">{offersData.length}</span>
                <span className="text">OFFRES</span>
              </div>
            </section>
            <section className={`offers-filter ${filterModal && "filterModal"} `}>
              <div
                className="modal-control"
                onClick={() => {
                  setFilterModal(!filterModal);
                }}
              >
                <span className="text">CATÉGORIE DE VÉHICULE</span>
                <i className={`ico-chevron-down ${filterModal && "filterModal"}`} />
              </div>

              <button
                // Check if agency value is known and Date of departure is before Date of return before enabling "go to" offers page button"
                disabled={!filterModal}
                // onClick={() => )}
                className="reset-filter-btn"
              >
                RÉINITIALISER
              </button>
              {filterModal && (
                <div className="type-filter-modal">
                  <div className="filters">
                    <span>TYPE 1</span>
                    {/* <span>{today}</span> */}
                  </div>

                  {/* {typeArray.map((type, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        // setSearchModal(false);
                      }}
                    >{`${}`}</span>
                  );
                })} */}
                </div>
              )}
            </section>
          </div>
          <div>
            {isLoading ? (
              <span>Loading</span>
            ) : (
              <div className="cards-container">
                {offersData.map((offer, index) => {
                  return <OfferCard offer={offer} rentalDays={rentalDays} />;
                })}
                ;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OfferList;
