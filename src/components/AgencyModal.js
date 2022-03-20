const AgencyModal = ({ isLoading, setAgencyModal, setData, data }) => {
  return (
    <div
      className="agencies-modal"
      onClick={() => {
        setAgencyModal(false);
      }}
    >
      <div
        className="modal-content"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {isLoading ? (
          <span>Loading</span>
        ) : (
          <div>
            {data.map((agency, index) => {
              return <span key={index}>{`${agency.title} and ${agency.id} `}</span>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyModal;
