import { useEffect, useState, useContext } from "react";

import { SearchContext } from "../context/SearchContext";

import SearchComponents from "../components/SearchComponents";

const OfferList = () => {
  const [agency, setAgency] = useContext(SearchContext).agency;

  return (
    <div>
      <SearchComponents />
      <span>TEST</span>
      <span>{agency}</span>
    </div>
  );
};

export default OfferList;
