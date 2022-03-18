import "./OptionCard.scss";

const OptionCard = ({ configurationData, setConfigurationData, index, option }) => {
  //
  // function called each time we want to add or remove an option
  const changeOption = () => {
    const newConfigurationData = { ...configurationData };

    // Cannot have optionIDs I3 and I4 alltogether => remove/add them simultaniously
    // if x=0 abs(x-1) = 1 & if x=1  abs(x-1) = 0
    const checkSixtConnect = (id) => {
      const indexToCheck = configurationData.additionalCharges.findIndex((element) => element.id === id);
      const amount = newConfigurationData.additionalCharges[indexToCheck].amount;

      if (amount === 1)
        newConfigurationData.additionalCharges[indexToCheck].amount = Math.abs(
          configurationData.additionalCharges[indexToCheck].amount - 1
        );
    };

    // Check option status if we are selecting I3 or I4 then we
    // need to be sure that the other one is not already selected
    if (option.id === "I3" && option.amount === 0) {
      checkSixtConnect("I4");
    } else if (option.id === "I4" && option.amount === 0) {
      checkSixtConnect("I3");
    }
    // In every cases we change the value of the clicked Option
    newConfigurationData.additionalCharges[index].amount = Math.abs(option.amount - 1);

    // Save new state for total price recalculation
    setConfigurationData(newConfigurationData);
  };

  return (
    //   if price amount is 0 then the onClick is disabled as it's not a removable option
    <div className="card-container">
      <button
        className={`option-card ${option.amount === 1 && "selected"}`}
        disabled={option.price.amount === 0 ? true : false}
        onClick={changeOption}
      >
        <i className={option.icon}></i>
        <div className="card-text">
          <div className="text">
            <span className="title">{option.title.toUpperCase()}</span>
            <span className="description">{option.description}</span>
          </div>

          {option.price.amount !== 0 && (
            <div className="price">
              <span className="small">€</span>
              <span className="tall">{Math.floor(option.price.amount)}</span>
              <span className="small">,{(option.price.amount % 1).toFixed(2).substring(2)}</span>
              <span>| {option.price.unit}</span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default OptionCard;
