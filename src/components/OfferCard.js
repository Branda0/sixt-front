import "./OfferCard.scss";

const OfferCard = ({ offer, rentalDays, setSelectModal }) => {
  const dayPrice = offer.prices.dayPrice.amount;
  return (
    <div className="card">
      <div className="clickable-card" onClick={() => setSelectModal(true)}>
        <span className="title">{offer.headlines.description.toUpperCase()}</span>
        <span className="subtitle">{offer.headlines.shortSubline}</span>
        <img src={offer.images.small} alt="" />
        <div className="mileage">
          <i className="ico-bullet-xl"></i>
          <span>{offer.headlines.mileageInfo}</span>
        </div>

        <div className="price">
          <span className="price-day">€ </span>
          <span className="price-day-big">{Math.floor(dayPrice)}</span>
          <span className="price-day">,{(dayPrice % 1).toFixed(2).substring(2)}</span>
        </div>

        <span className="price-total">{`€ ${(rentalDays * dayPrice).toFixed(2)} total`}</span>
      </div>
    </div>
  );
};

export default OfferCard;
