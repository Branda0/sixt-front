import "./PriceDetails.scss";

const PriceDetails = ({ offer, title, rentalDays, configurationData, totalPrice, extraFees }) => {
  const realDayPrice = offer.prices.dayPrice.amount * rentalDays - extraFees;
  return (
    <div className="price-details-container">
      {title && <span className="main-title">{title}</span>}
      <span className="title">période de location</span>
      <div className="line-detail">
        <span className="details">
          Durée de location ({rentalDays} jours x {(realDayPrice / rentalDays).toFixed(2)})
        </span>
        <span className="price">{realDayPrice.toFixed(2)}</span>
      </div>
      <span className="title">protections et options</span>
      {configurationData.additionalCharges.map((element) => {
        if (element.amount === 1) {
          return (
            <div className="line-detail">
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
      {configurationData.extraFees.map((element) => {
        return (
          <div className="line-detail">
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
