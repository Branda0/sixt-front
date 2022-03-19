import "./PriceModal.scss";
import PriceDetails from "./PriceDetails";

const PriceModal = ({
  priceDetailModal,
  setPriceDetailModal,
  offer,
  rentalDays,
  configurationData,
  totalPrice,
  extraFees,
  setIsImgResized,
}) => {
  return (
    <div
      className="modal-price"
      onClick={() => {
        setPriceDetailModal(false);
        setIsImgResized(false);
      }}
    >
      <div
        className="container"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="content">
          <PriceDetails
            offer={offer}
            configurationData={configurationData}
            totalPrice={totalPrice}
            extraFees={extraFees}
          />
          <i
            className="ico-close"
            onClick={() => {
              setPriceDetailModal(!priceDetailModal);
              setIsImgResized(false);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;
