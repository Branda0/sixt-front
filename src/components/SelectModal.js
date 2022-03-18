import "./SelectModal.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CarouselOffer from "./CarouselOffer";
import InfosDetail from "./InfosDetail";

const SelectModal = ({ setSelectModal, offer, rentalDays }) => {
  const navigate = useNavigate();

  const [configurationData, setConfigurationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const toTalPrice = offer.prices.dayPrice.amount * rentalDays;

  const responsiveCarousel = {
    device: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  // data fetch Hook to get selection offer carousel images
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

  return (
    <div className="modal-select" onClick={() => setSelectModal(false)}>
      <div
        className="container"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="carousel-select-modal">
          {isLoading ? <span>loading</span> : <CarouselOffer images={configurationData.splashImages} />}
          <div className="offer-info">
            <InfosDetail offer={offer} />
          </div>
        </div>
        <div className="right">
          <i className="ico-close" onClick={() => setSelectModal(false)}></i>
          <div className={"price-line"}>
            <span>TOTAL</span>
            <div className="price">
              <span className="price-day">€ </span>
              <span className="price-day-big">{Math.floor(toTalPrice)}</span>
              <span className="price-day">,{(toTalPrice % 1).toFixed(2).substring(2)}</span>
            </div>
          </div>
          <button
            className="to-offerconfig-btn"
            onClick={() => {
              setSelectModal(false);
              navigate("/offerconfig", { state: { offer } });
            }}
          >
            SÉLECTIONNER
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
