import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { SearchContext } from "../context/SearchContext";

import axios from "axios";
import moment from "moment";
import "./PriceDetails.scss";

const PriceDetails = ({ offer, configurationData, totalPrice, extraFees }) => {
  // location used to have component customized for various routes
  const location = useLocation();

  moment.locale("fr", {
    monthsShort: "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split("_"),
  });

  // Get data from Context
  const data = useContext(SearchContext);

  // States values from Context
  const [agency, setAgency] = data.agency;
  const [timeStart, setTimeStart] = data.timeStart;
  const [timeEnd, setTimeEnd] = data.timeEnd;
  const [dateStart, setDateStart] = data.dateStart;
  const [dateEnd, setDateEnd] = data.dateEnd;

  const mydate = moment(dateStart, "YYYY-MM-DD").format("DD MMM");
  console.log(mydate);
  // number of rental days (from context)
  const rentalDays = data.rentalDays;

  const realDayPrice = offer.prices.dayPrice.amount * rentalDays - extraFees;
  return (
    <div className="price-details-container">
      {location.pathname === "/offerconfig" && <span className="main-title">détail du prix</span>}
      {location.pathname === "/personnaldetails" && (
        <>
          <div className="rental-general">
            <div className="details">
              <span className="car-subline">{offer.headlines.longSubline}</span>
              <div className="agency">
                <span className="agency">{agency}</span>
                <i className="ico-info"></i>
              </div>
              <span>{`${moment(dateStart, "YYYY-MM-DD").format("DD MMM")} ${timeStart.value} - ${moment(
                dateEnd,
                "YYYY-MM-DD"
              ).format("DD MMM")} ${timeEnd.value}`}</span>
            </div>
            <img src={offer.images.small} alt="" />
          </div>

          <span className="title">votre offre inclut</span>
          <div className="additional-infos">
            {configurationData.includedCharges.map((element, index) => {
              return (
                <div key={index} className="line">
                  <i className="ico-bullet-xl"></i>
                  <span className="details">{element.title}</span>
                </div>
              );
            })}
          </div>
          <span className="title">exigences pour les conducteurs</span>
          <div className="additional-infos">
            <div className="line">
              <i className={"ico-driverRequirements"}></i>
              <span className="details">Conducteur âgé d'au moins {offer.carGroupInfo.driverMinAge} ans</span>
            </div>
          </div>
        </>
      )}

      <span className="title">période de location</span>
      <div className="line-detail">
        <span className="details">
          Durée de location ({rentalDays} jours x {(realDayPrice / rentalDays).toFixed(2)})
        </span>
        <span className="price">{realDayPrice.toFixed(2)}</span>
      </div>
      <span className="title">protections et options</span>
      {configurationData.additionalCharges.map((element, index) => {
        if (element.amount === 1) {
          return (
            <div key={index} className="line-detail">
              <span className="details">{element.title}</span>
              <span className="price">
                {element.price.unit.includes("jour")
                  ? (element.price.amount * rentalDays).toFixed(2)
                  : element.price.amount.toFixed(2)}
              </span>
            </div>
          );
        }
      })}
      <span className="title">frais</span>
      {configurationData.extraFees.map((element, index) => {
        return (
          <div key={index} className="line-detail">
            <span className="details">{element.title}</span>
            <span className="price">{element.price.amount}</span>
          </div>
        );
      })}

      <div className="line-total">
        <span className="title">total</span>
        <span className="price total">{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceDetails;
