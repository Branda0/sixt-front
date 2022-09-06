import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SearchContext } from "../context/SearchContext";

import axios from "axios";
import moment from "moment";

import "./SearchComponents.scss";

import DateRange from "./DateRange";
import TimeSelector from "./TimeSelector";

const SearchComponents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  moment.locale("fr", {
    monthsShort: "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split("_"),
  });

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

  // Search engine selection Modals pop-up states
  const [searchModal, setSearchModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  // Agencies Data from API call and Loading status
  const [agenciesData, setAgenciesData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Agencies data fetch Hook
  useEffect(() => {
    try {
      // Get List of agencies corresponding to search input
      const fetchData = async () => {
        // const response = await axios.get(`http://localhost:4000/agencies?term=${search}`);
        const response = await axios.get(`https://brandao-sixt.herokuapp.com/agencies?term=${search}`);
        setAgenciesData(response.data);
        setIsLoading(false);
      };

      // Don't fetch data if length of input is < 3
      if (search.length >= 3) {
        fetchData();
      } else {
        // setAgenciesData(null);
        if (location.pathname === "/") setAgency(null);
        setSearchModal(false);
        setIsLoading(true);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [search]);

  return (
    <>
      <div className="search-container">
        {location.pathname === "/" && (
          <div className="before-search-component">
            <span>VOITURES</span>
            <span>UTILITAIRES</span>
          </div>
        )}
        <div className="search-components">
          <div className="searchBar-container">
            <span>Retrait et Retour</span>
            <div className={`searchBar ${searchModal && "selected"}`}>
              <i className="ico-search"></i>

              {/* TEMPORARY AGENCY LOCKED DUE TO API ENDPOINT NOT PROVINDING AGENCY SEARCH */}
              <a className={`search-input ${agency && "selected"}`}>San Francisco Int Airport (US)</a>
              {/* <input
                className={`search-input ${agency && "selected"}`}
                placeholder="Trouver une agence"
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  event.target.value.length > 2 && setSearchModal(true);
                }}
                onClick={() => {
                  setSearch("");
                  setDateModal(false);
                  setStartTimeModal(false);
                  setEndTimeModal(false);
                }}
              ></input> */}
              {/* TEMPORARY AGENCY LOCKED DUE TO API ENDPOINT NOT PROVINDING AGENCY SEARCH   */}
            </div>
          </div>

          <div className="date-time-container">
            <div>
              <span>Date de départ</span>
              <span
                className={`date ${dateModal && "selected"}`}
                onClick={() => {
                  setDateModal(!dateModal);
                  setSearchModal(false);
                  setEndTimeModal(false);
                  setStartTimeModal(false);
                }}
              >
                {moment(dateStart).format("DD MMM")}
              </span>
            </div>
            <div>
              <span
                className={`time ${startTimeModal && "selected"}`}
                onClick={() => {
                  setStartTimeModal(!startTimeModal);
                  setEndTimeModal(false);
                  setSearchModal(false);
                  setDateModal(false);
                }}
              >
                {timeStart.value}
              </span>
            </div>
          </div>
          <div className="date-time-container">
            <div>
              <span>Date de retour</span>
              <span
                className={`date ${dateModal && "selected"}`}
                onClick={() => {
                  setDateModal(!dateModal);
                  setSearchModal(false);
                  setEndTimeModal(false);
                  setStartTimeModal(false);
                }}
              >
                {moment(dateEnd).format("DD MMM")}
              </span>
            </div>
            <div>
              <span
                className={`time ${endTimeModal && "selected"}`}
                onClick={() => {
                  setEndTimeModal(!endTimeModal);
                  setStartTimeModal(false);
                  setSearchModal(false);
                  setDateModal(false);
                }}
              >
                {timeEnd.value}
              </span>
            </div>
          </div>
          <div>
            {location.pathname === "/" && (
              <button
                // Check if agency value is known and Date of departure is before Date of return before enabling "go to" offers page button"
                disabled={!agency || rentalDays < 1 || !search}
                onClick={() => navigate("/offerlist")}
                className="offer-btn"
              >
                VOIR LES OFFRES
              </button>
            )}
          </div>
        </div>
        <div className="pop-up">
          {searchModal && isLoading === false && (
            <div className="agency-picker">
              {agenciesData.map((agency, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      setAgency(agency.id);
                      setSearch(agency.title);
                      localStorage.setItem("storedSearch", String(agency.title));
                      setSearchModal(false);
                    }}
                  >{`${agency.title}`}</span>
                );
              })}
            </div>
          )}
          {dateModal && (
            <div className="date-picker">
              <DateRange setDateModal={setDateModal} />
            </div>
          )}
          {startTimeModal && (
            <div className="time-picker">
              <div>
                <span className="title">HEURE DE RETRAIT</span>
                <TimeSelector
                  setTime={setTimeStart}
                  setTimeModal={setStartTimeModal}
                  indexSelected={timeStart.index}
                />
              </div>
            </div>
          )}
          {endTimeModal && (
            <div className="time-picker">
              <div>
                <span className="title">HEURE DE RETOUR</span>
                <TimeSelector
                  setTime={setTimeEnd}
                  setTimeModal={setEndTimeModal}
                  indexSelected={timeEnd.index}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchComponents;
