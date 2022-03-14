import "./SearchComponents.scss";

const SearchComponents = ({ search, setSearch }) => {
  return (
    <div className="search-components">
      <div>
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
      <div>
        <span>Date de départ</span>
        <div></div>
      </div>
      <div>
        <span>Date de retour</span>
      </div>
    </div>
  );
};

export default SearchComponents;
