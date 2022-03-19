import "./InputForm.scss";

const InputForm = ({ required, size, format, value, type, placeholder, setValue }) => {
  return (
    <div className={`input-container ${size && size}`}>
      <input
        className={`input-field ${value && "fixed"} ${format && format}`}
        value={value}
        type={type}
        required={required}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <span className={`placeholder ${value && "fixed"}`}>{placeholder}</span>
    </div>
  );
};
export default InputForm;
