import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import moment from "moment";

import timeTable from "../assets/data/timetable.json";
import "./SearchComponents.scss";

import Modal from "./Modal";
import DateRange from "./DateRange";
import TimeSelector from "./TimeSelector";

const SearchComponents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  moment.locale("fr", {
    monthsShort: "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split("_"),
  });

  //Search engine selection Modals pop-up
  const [searchModal, setSearchModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  //Agencies Data from API call and Loading status
  const [agenciesData, setAgenciesData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Stored engine states
  const storedSearch = localStorage.getItem("storedSearch");
  const storedAgency = localStorage.getItem("storedAgency");
  const storedTimeStart = JSON.parse(localStorage.getItem("storedTimeStart"));
  const storedTimeEnd = JSON.parse(localStorage.getItem("storedTimeEnd"));
  const storedDateStart = localStorage.getItem("storedDateStart");
  const storedDateEnd = localStorage.getItem("storedDateEnd");

  //Search engine states
  const [search, setSearch] = useState(storedSearch || "");
  const [agency, setAgency] = useState(storedAgency || {});
  const [timeStart, setTimeStart] = useState(storedTimeStart || { value: timeTable[2], index: 2 });
  const [timeEnd, setTimeEnd] = useState(storedTimeEnd || { value: timeTable[16], index: 16 });
  const [dateStart, setDateStart] = useState(storedDateStart || moment(Date.now()).format("YYYY-MM-DD"));
  const [dateEnd, setDateEnd] = useState(moment(storedDateEnd || Date.now()).format("YYYY-MM-DD"));

  // States local storage saving Hook (search state saved on agency list selection)
  useEffect(() => {
    localStorage.setItem("storedAgency", String(agency));
    localStorage.setItem("storedTimeStart", JSON.stringify(timeStart));
    localStorage.setItem("storedTimeEnd", JSON.stringify(timeEnd));
    localStorage.setItem("storedDateStart", String(dateStart));
    localStorage.setItem("storedDateEnd", String(dateEnd));
  }, [agency, timeStart, timeEnd, dateStart, dateEnd]);

  // Agencies data fetch Hook
  useEffect(() => {
    try {
      // Get List of agencies corresponding to search input
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:4000/agencies?term=${search}`);
        setAgenciesData(response.data);
        setIsLoading(false);
      };

      // Don't fetch data if length of input is < 3
      if (search.length >= 3) {
        fetchData();
      } else {
        setAgenciesData(null);
        setAgency(null);
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
              <input
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
              ></input>
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
                disabled={
                  !agency ||
                  new Date(`${dateStart}T${timeStart.value}:00`) >= new Date(`${dateEnd}T${timeEnd.value}:00`)
                }
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
              <DateRange setDateStart={setDateStart} setDateEnd={setDateEnd} setDateModal={setDateModal} />
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
