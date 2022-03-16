const Modal = ({ setModal }) => {
  return (
    <div
      className="modal"
      onClick={() => {
        setModal(false);
      }}
    >
      <div
        className="modal-content"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          // e.stopImmediatePropagation();
        }}
      >
        <div className="container">
          <span>I'M THE MODAL</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
