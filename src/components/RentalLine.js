import "./RentalLine.scss";

const RentalLine = ({
  reference,
  firstName,
  lastName,
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  days,
  price,
}) => {
  return (
    <div className="line-rental">
      <span>{reference}</span>
      <span>{lastName}</span>
      <span>{firstName}</span>
      <span>{dateStart}</span>
      <span>{timeStart}</span>
      <span>{dateEnd}</span>
      <span>{timeEnd}</span>
      <span>{days}</span>
      <span>{price}</span>
    </div>
  );
};

export default RentalLine;
