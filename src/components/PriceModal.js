import "./PriceModal.scss";

const PriceModal = ({ setPriceDetailModal, offer, rentalDays, configurationData }) => {
  return (
    <div className="modal-frame" onClick={() => setPriceDetailModal(false)}>
      <div
        className="container"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="content">
          <span>TEST</span>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;
