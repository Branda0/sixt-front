import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../context/SearchContext";
import "./OfferConfig.scss";

//components
import SearchComponents from "../components/SearchComponents";
import InfosDetail from "../components/InfosDetail";
import OptionCard from "../components/OptionCard";

const OfferConfig = () => {
  const { state } = useLocation();
  const offer = state.offer;

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

  const [configurationData, setConfigurationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isImgResized, setIsImgResized] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  const totalPrice = 1279.46;

  // data fetch Hook to get offer configuration details
  useEffect(() => {
    try {
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
    <div className="offerconfig-container">
      <SearchComponents />
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <>
          <div className="top-img-container">
            <img
              className={`${isImgResized && "resized"}`}
              src={configurationData.splashImages[0]}
              alt={"car-offer"}
            />
            <span className="title">{offer.headlines.description}</span>
            <div className="center-container">
              <div onClick={() => setIsImgResized(!isImgResized)}>
                <i className={`ico-chevron-down ${isImgResized && "resized"}`}></i>
              </div>
            </div>
          </div>
          <div className="infos-banner">
            <InfosDetail offer={offer} />
          </div>
          <div className="main-content">
            <div className="options">
              <span className="main-title">CHOISISSEZ VOTRE PROTECTION ET VOS OPTIONS</span>
              <span className="title">VOTRE OFFRE INCLUT</span>
              <div className="included-charges">
                {configurationData.includedCharges.map((charge, index) => {
                  return (
                    <div key={index} className="charge-line">
                      <i className="ico-bullet-xl"></i>
                      <span>{charge.title}</span>
                    </div>
                  );
                })}
              </div>
              <span className="title">CHOISISSEZ VOS OPTIONS</span>
              <div className="additional-charges">
                {configurationData.additionalCharges.map((option, index) => {
                  if (moreOptions || index < 5) {
                    return (
                      <OptionCard
                        key={index}
                        configurationData={configurationData}
                        setConfigurationData={setConfigurationData}
                        index={index}
                        option={option}
                      />
                    );
                  }
                })}
                <div className="optionsMoreLess">
                  <div onClick={() => setMoreOptions(!moreOptions)}>
                    <i className={`${moreOptions ? "ico-minus-sign" : "ico-plus-sign"}`}></i>
                    <span>{`${moreOptions ? "VOIR MOINS D'OPTIONS" : "VOIR PLUS D'OPTIONS"}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing">
              <div className={"container"}>
                <div>
                  <div className="left">
                    <span>TOTAL</span>
                    <div className="link-modal">
                      <i className="ico-chevron-right"></i>
                      <span>Détails du prix</span>
                    </div>
                  </div>
                  <div className="total-price">
                    <span className="small">€ </span>
                    <span>{Math.floor(totalPrice)}</span>
                    <span className="small">,{(totalPrice % 1).toFixed(2).substring(2)}</span>
                  </div>
                </div>

                <button>CONTINUER</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OfferConfig;
