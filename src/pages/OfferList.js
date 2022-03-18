import { useEffect, useState, useContext } from "react";

import { SearchContext } from "../context/SearchContext";

import SearchComponents from "../components/SearchComponents";
import OfferCard from "../components/OfferCard";
import SelectModal from "../components/SelectModal";

import "./OfferList.scss";

import axios from "axios";

const OfferList = () => {
  // Get data from Context
  const data = useContext(SearchContext);

  // States values from Context
  const [search, setSearch] = data.search;
  const [agency, setAgency] = data.agency;
  const [timeStart, setTimeStart] = data.timeStart;
  const [timeEnd, setTimeEnd] = data.timeEnd;
  const [dateStart, setDateStart] = data.dateStart;
  const [dateEnd, setDateEnd] = data.dateEnd;

  // number of rental days (from context)
  const rentalDays = data.rentalDays;

  // Agencies Data from API call and Loading status
  const [offersData, setOffersData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Computed available styles after offers api call
  const [availableStyles, setAvailableStyles] = useState([]);
  // Computed filteredOffersData
  const [filteredOffers, setFilteredOffers] = useState([]);

  // Array that wil contain active filtered style values (used to filter data returned from api)
  const [filters, setFilters] = useState([]);

  // modal states
  const [filterModal, setFilterModal] = useState(false);

  // offer data to send to OfferModal component for selected offer Modal details
  const [selectedOffer, setSelectedOffer] = useState([]);
  // status of opened/closed selected offer Modal
  const [selectModal, setSelectModal] = useState(false);

  // Update filtered Status of individual styles
  const updateStyle = (index) => {
    const newStyles = [...availableStyles];
    newStyles[index].filtered = !newStyles[index].filtered;
    setAvailableStyles(newStyles);
  };

  // Reset array of filtered BodyStyle and Available style filtered status
  const resetFilters = () => {
    const newStyles = [...availableStyles];
    for (const style of newStyles) {
      style.filtered = false;
    }
    setAvailableStyles(newStyles);
    setFilters([]);
  };

  // Update array of filtered style, if style already present, remove it
  const updateFilters = (style) => {
    const newStyles = [...filters];
    const pos = newStyles.indexOf(style);
    if (pos === -1) {
      newStyles.push(style);
    } else {
      newStyles.splice(pos, 1);
    }
    setFilters(newStyles);
  };

  useEffect(() => {
    const computeFilteredOffers = () => {
      if (filters.length > 0) {
        const newFilteredData = offersData.filter((offer) => filters.includes(offer.carGroupInfo.bodyStyle));
        setFilteredOffers(newFilteredData);
      } else {
        setFilteredOffers(offersData);
      }
    };
    if (offersData) computeFilteredOffers();
  }, [filters, offersData]);

  // Offers data fetch Hook
  useEffect(() => {
    // Get array of available styles to filter => apply to availableStyle useState
    const getStyles = (offers) => {
      const matchArray = [];
      const availableStyleArray = [];
      for (const offer of offers) {
        if (matchArray.includes(offer.carGroupInfo.bodyStyle) === false) {
          matchArray.push(offer.carGroupInfo.bodyStyle);
          availableStyleArray.push({
            bodyStyle: offer.carGroupInfo.bodyStyle,
            bodyStyleIcon: offer.carGroupInfo.bodyStyleIcon,
            filtered: false,
          });
        }
      }
      setAvailableStyles(availableStyleArray);
    };

    // Get List of offers corresponding to search engine inputs
    const fetchData = async () => {
      setIsLoading(true);
      //Prepare data for api call startDate and endDate with format YYYY-MM-DDTHH:MM:SS
      const response = await axios.get(
        `http://localhost:4000/offers?agencyId=${agency}&startDate=${dateStart}T${timeStart.value}:00&endDate=${dateEnd}T${timeEnd.value}:00`
      );
      setOffersData(response.data);
      setIsLoading(false);
      getStyles(response.data);
      setFilters([]);
    };

    try {
      // Only fetch data if Return Date is after Departure Date and agency is selected
      if (agency && rentalDays > 0) {
        console.log("FETCHDATA");
        console.log(agency);
        fetchData();
      } else {
        alert("need agency");
        // setIsLoading(false);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [agency, timeStart, timeEnd, dateStart, dateEnd, rentalDays]);

  return (
    <div className={`offerlist-container ${selectModal && "modal"}`}>
      <SearchComponents />
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <>
          {selectModal && (
            <SelectModal setSelectModal={setSelectModal} offer={selectedOffer} rentalDays={rentalDays} />
          )}
          <div className="filter-bar">
            <section className="offers-count">
              <div>
                {filters.length > 0 && <span className="count">{filteredOffers.length} /</span>}
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
                disabled={!filterModal}
                onClick={() => filters.length > 0 && resetFilters()}
                className={`reset-filter-btn ${filters.length > 0 && "active"}`}
              >
                RÉINITIALISER
              </button>
              {filterModal && (
                <div className="type-filter-modal">
                  <div className="styles">
                    {availableStyles.map((style, index) => {
                      return (
                        <div className="style-line" key={index}>
                          <div
                            className="checkbox-title"
                            onClick={() => {
                              updateStyle(index);
                              updateFilters(style.bodyStyle);
                            }}
                          >
                            <i className={`${style.filtered ? "ico-checkbox-checked" : "ico-checkbox"} `} />
                            <span>{style.bodyStyle.toUpperCase()}</span>
                          </div>

                          <i className={style.bodyStyleIcon} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>
          <div>
            {isLoading ? (
              <span>Loading</span>
            ) : (
              <div className="cards-container">
                {filteredOffers.map((offer, index) => {
                  return (
                    <div key={index} className={"card"}>
                      <div
                        className="clickable-area"
                        onClick={() => {
                          document.documentElement.style.setProperty(
                            "--modal-scroll-pos",
                            `${window.scrollY}px`
                          );
                          setSelectModal(true);
                          setSelectedOffer(offer);
                        }}
                      >
                        <OfferCard offer={offer} rentalDays={rentalDays} />
                      </div>
                    </div>
                  );
                })}
                ;
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OfferList;
