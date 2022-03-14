import { Link } from "react-router-dom";

import "./SearchComponents.scss";

const SearchComponents = ({ search, setSearch }) => {
  return (
    <div className="search-components">
      <div className="searchBar-container">
        <span>Retrait et Retour</span>
        <div className="searchBar">
          <i className="ico-search"></i>
          <input
            placeholder="Trouver une agence"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              // event.target.value.length > 2 && setModal(true);
            }}
            onClick={() => setSearch("")}
          ></input>
        </div>
      </div>

      <div className="date-time-container">
        <div>
          <span>Date de départ</span>
          <span className="date">Date</span>
        </div>
        <div>
          <span className="time">Time</span>
        </div>
      </div>
      <div className="date-time-container">
        <div>
          <span>Date de retour</span>
          <span className="date">23:30</span>
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
  );
};

export default SearchComponents;
