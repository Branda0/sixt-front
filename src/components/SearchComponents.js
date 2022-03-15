import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import moment from "moment";

import timeTable from "../assets/data/timetable.json";
import "./SearchComponents.scss";

import Modal from "./Modal";
import DateRange from "./DateRange";
import TimeSelector from "./TimeSelector";

const SearchComponents = () => {
  const location = useLocation();
  moment.locale("fr", {
    monthsShort: "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split("_"),
  });

  const [searchModal, setSearchModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const [agenciesData, setAgenciesData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [agency, setAgency] = useState({});
  const [timeStart, setTimeStart] = useState({ value: timeTable[2], index: 2 });
  const [timeEnd, setTimeEnd] = useState({ value: timeTable[16], index: 16 });

  const [dateStart, setDateStart] = useState(moment(Date.now()).format("YYYY-MM-DD"));
  const [dateEnd, setDateEnd] = useState(moment(Date.now()).format("YYYY-MM-DD"));

  useEffect(() => {
    try {
      // Get List of agencies corresponding to search input
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:4000/agencies?term=${search}`);

        setAgenciesData(response.data);
        setIsLoading(false);
        console.log(response.data);
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

  useEffect(() => {
    // moment.locale("fr");
    var date = moment(dateStart);
    console.log(date.format("DD MMMM"));
    // setSearchModal(false);
    // setIsLoading(true);
  }, [dateStart, dateEnd]);

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
                  setDateModal(true);
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
                  setStartTimeModal(true);
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
                  setDateModal(true);
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
                  setEndTimeModal(true);
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
            <Link className={`offer-btn`} to="/offerlist">
              VOIR LES OFFRES
            </Link>
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
