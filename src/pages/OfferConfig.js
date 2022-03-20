import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../context/SearchContext";
import "./OfferConfig.scss";

//components
import SearchComponents from "../components/SearchComponents";
import InfosDetail from "../components/InfosDetail";
import OptionCard from "../components/OptionCard";
import PriceModal from "../components/PriceModal";
import Loader from "../components/Loader";

const OfferConfig = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  /////
  /////
  /////
  // if (state === null) navigate("/");
  /////
  /////
  /////

  const offer = state.offer;

  // Get data from Context
  const data = useContext(SearchContext);

  // number of rental days (from context)
  const rentalDays = data.rentalDays;

  // configuration data from api call
  const [configurationData, setConfigurationData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // boolean states values used for conditional page visual
  const [isImgResized, setIsImgResized] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [priceDetailModal, setPriceDetailModal] = useState(false);

  //compute total Price
  const [totalPrice, setTotalPrice] = useState(0);
  const [extraFees, setExtraFees] = useState(0);

  useEffect(() => {
    const computeTotal = () => {
      let optionsPrice = 0;
      console.log(configurationData.additionalCharges[2].price);
      configurationData.additionalCharges.forEach((element) => {
        if (element.amount === 1) {
          if (element.price.unit.includes("jour")) {
            optionsPrice += rentalDays * element.price.amount;
          } else {
            optionsPrice += element.price.amount;
          }
        }
      });

      const rentalPrice = offer.prices.dayPrice.amount * rentalDays;
      const total = rentalPrice + optionsPrice;
      setTotalPrice(total);
    };
    if (configurationData) computeTotal();
  }, [configurationData, rentalDays]);

  // data fetch Hook to get offer configuration details
  useEffect(() => {
    try {
      // get extraFees from inital fetchData as this are static fees that  will not change with options selection
      const computeExtraFees = (configData) => {
        let fees = 0;
        configData.extraFees.forEach((element) => {
          fees += element.price.amount;
        });
        setExtraFees(fees);
      };

      const fetchData = async () => {
        // const response = await axios.get(`http://localhost:4000/offer/configurations?offerId=${offer.id}`);
        const response = await axios.get(
          `https://brandao-sixt.herokuapp.com/offer/configurations?offerId=${offer.id}`
        );
        setConfigurationData(response.data);
        computeExtraFees(response.data);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [offer.id]);

  return state ? (
    <div className={`offerconfig-container ${priceDetailModal && "modal"}`}>
      <SearchComponents />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {priceDetailModal && (
            <PriceModal
              priceDetailModal={priceDetailModal}
              setPriceDetailModal={setPriceDetailModal}
              offer={offer}
              configurationData={configurationData}
              rentalDays={rentalDays}
              totalPrice={totalPrice}
              extraFees={extraFees}
              setIsImgResized={setIsImgResized}
            />
          )}
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
              <div className="container">
                <div>
                  <div className="left">
                    <span>TOTAL</span>
                    <div
                      className="link-modal"
                      onClick={() => {
                        // console.log(window.scrollY);
                        // document.documentElement.style.setProperty(
                        //   "--modal-scroll-pos",
                        //   `${window.scrollY}px`
                        // );
                        setIsImgResized(true);
                        setPriceDetailModal(!priceDetailModal);
                      }}
                    >
                      <i className={`ico-chevron-right ${priceDetailModal && "modal"}`}></i>
                      <span>Détails du prix</span>
                    </div>
                  </div>
                  <div className="total-price">
                    <span className="small">€ </span>
                    <span>{Math.floor(totalPrice)}</span>
                    <span className="small">,{(totalPrice % 1).toFixed(2).substring(2)}</span>
                  </div>
                </div>

                <Link
                  className="toPersonnalDetails-btn"
                  to="/personnaldetails"
                  state={{ offer, configurationData, totalPrice, extraFees }}
                >
                  CONTINUER
                </Link>
                {/* <button o></button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default OfferConfig;
