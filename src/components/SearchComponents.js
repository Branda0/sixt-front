import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import moment from "moment";

import timeTable from "../assets/data/timetable.json";
import "./SearchComponents.scss";

import Modal from "./Modal";
import DateRange from "./DateRange";

const SearchComponents = () => {
  const location = useLocation();
  const [searchModal, setSearchModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [agenciesData, setAgenciesData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [agency, setAgency] = useState({});
  const [timeStart, setTimeStart] = useState({ value: timeTable[2], index: 2 });
  const [timeEnd, setTimeEnd] = useState({ value: timeTable[16], index: 16 });

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  moment.locale("fr");

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
            <div className="searchBar selected">
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
                onClick={() => setSearch("")}
              ></input>
            </div>
          </div>

          <div className="date-time-container">
            <div>
              <span>Date de départ</span>
              <span onClick={() => setDateModal(true)} className="date">
                {moment(dateStart).format("DD MMMM")}
              </span>
            </div>
            <div>
              <span className="time">Time</span>
            </div>
          </div>
          <div className="date-time-container">
            <div>
              <span>Date de retour</span>
              <span className="date">{moment(dateEnd).format("DD MMMM")}</span>
            </div>
            <div>
              <span className="time">Time</span>
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
        </div>
      </div>
      {/* {searchModal && <Modal setModal={setSearchModal} />} */}
    </>
  );
};

export default SearchComponents;
