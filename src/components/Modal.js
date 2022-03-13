const Modal = ({ setModal }) => {
  return (
    <div
      className="modal"
      onClick={(event) => {
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
        <span>I'M THE MODAL</span>
      </div>
    </div>
  );
};

export default Modal;
