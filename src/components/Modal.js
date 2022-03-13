const Modal = ({ setModal }) => {
  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div
        className="modal-content"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <span>I'M THE MODAL</span>
      </div>
    </div>
  );
};

export default Modal;
