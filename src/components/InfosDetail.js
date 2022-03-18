const InfosDetail = ({ offer }) => {
  return (
    <>
      <span className="long-title">{offer.headlines.longSubline}</span>
      <div className="details">
        <div className="info">
          <i className="ico-maxPassengers"></i>
          <span>{offer.carGroupInfo.maxPassengers} Sièges</span>
        </div>
        <div className="info">
          <i className="ico-doors"></i>
          <span>{offer.carGroupInfo.doors} Portes</span>
        </div>
        <div className="info">
          <i className="ico-automatic"></i>
          <span>{offer.carGroupInfo.automatic ? "Automatique" : "Manuelle"}</span>
        </div>
        <div className="info">
          <i className="ico-baggage"></i>
          <span>{offer.carGroupInfo.baggage} Bagages</span>
        </div>
        <div className="info">
          <i className="ico-airCondition"></i>
          <span>{offer.carGroupInfo.airCondition ? "Climatisation" : "Non-climatisée"}</span>
        </div>
        <div className="info">
          <i className="ico-driverRequirements"></i>
          <span>{offer.carGroupInfo.driverMinAge} Ans</span>
        </div>
      </div>
    </>
  );
};

export default InfosDetail;
