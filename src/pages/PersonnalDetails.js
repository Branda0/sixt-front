import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../context/SearchContext";
import "./PersonnalDetails.scss";

import PriceDetails from "../components/PriceDetails";
import InputForm from "../components/InputForm";

const PersonnalDetails = () => {
  const navigate = useNavigate();
  // Get data from Context
  const data = useContext(SearchContext);

  const rentalDays = data.rentalDays;
  const [agency] = data.agency;
  const [timeStart] = data.timeStart;
  const [timeEnd] = data.timeEnd;
  const [dateStart] = data.dateStart;
  const [dateEnd] = data.dateEnd;

  // Get data from routing from /offerconfig page
  const { state } = useLocation();
  const offer = state.offer;
  const configurationData = state.configurationData;
  const totalPrice = state.totalPrice;
  const extraFees = state.extraFees;

  // States values of personal details form data
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("France");
  const [phoneCode, setPhoneCode] = useState("+33");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");

  const [referenceID, setReferenceID] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);

  // Scroll to Top screen when coming from another page with navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://branda0-sixt.up.railway.app/rental/new", {
        //   const response = await axios.post("http://localhost:4000/rental/new", {
        gender,
        company,
        firstName,
        lastName,
        email,
        street,
        city,
        country,
        phoneCode,
        phoneNumber,
        postalCode,
        dayOfBirth,
        monthOfBirth,
        yearOfBirth,
        configurationData,
        offer,
        extraFees,
        rentalDays,
        timeStart,
        timeEnd,
        dateStart,
        dateEnd,
        totalPrice,
      });

      setReferenceID(response.data.reference);
      setConfirmationModal(true);
    } catch (error) {
      if (error.response.status === 400) {
      } else if (error.response.status === 409) {
      }
    }
  };

  return (
    <div className="personnaldetails-container">
      <div className={`confirmation-modal-bg ${confirmationModal && "visible"}`}>
        <div className="modal">
          <h1>réservation confirmée</h1>
          <div className="reference-line">
            <span>Voici la référence de votre dossier :</span>
            <span className="referenceID">{referenceID}</span>
          </div>
          <i
            className="ico-close"
            onClick={() => {
              setConfirmationModal(false);
              navigate("/");
            }}
          ></i>
        </div>
      </div>
      <form className="personnal-form" onSubmit={handleSubmit}>
        <h1>informations personelles</h1>
        <div className="gender">
          <i
            className={gender === "m" ? "ico-radio-selected" : "ico-radio"}
            onClick={() => {
              if (gender === "m") {
                setGender("");
              } else {
                setGender("m");
              }
            }}
          ></i>
          <span>M.</span>
          <i
            className={gender === "f" ? "ico-radio-selected" : "ico-radio"}
            onClick={() => {
              if (gender === "f") {
                setGender("");
              } else {
                setGender("f");
              }
            }}
          ></i>
          <span>Mme</span>
        </div>

        <div className="rows">
          <div className="left-row">
            <InputForm
              type={"text"}
              format={"capitalize"}
              value={company}
              setValue={setCompany}
              placeholder={"Société"}
            />
            <InputForm
              required={true}
              type={"text"}
              format={"capitalize"}
              value={firstName}
              setValue={setFirstName}
              placeholder={"Prénom *"}
            />
            <InputForm
              type={"email"}
              value={email}
              setValue={setEmail}
              required={true}
              placeholder={"Adresse email *"}
            />
            <InputForm
              format={"capitalize"}
              type={"text"}
              value={street}
              setValue={setStreet}
              required={true}
              placeholder={"Rue *"}
            />
            <InputForm
              format={"capitalize"}
              type={"text"}
              value={country}
              setValue={setCountry}
              placeholder={"Pays"}
            />
          </div>

          <div className="right-row">
            <InputForm
              type={"text"}
              format={"capitalize"}
              value={lastName}
              setValue={setLastName}
              required={true}
              placeholder={"Nom de famille *"}
            />

            <div className="line">
              <InputForm
                size={"small"}
                type={"text"}
                value={phoneCode}
                setValue={setPhoneCode}
                placeholder={"Code pays"}
              />
              <InputForm
                size={"medium"}
                type={"text"}
                value={phoneNumber}
                setValue={setPhoneNumber}
                required={true}
                placeholder={"Numéro de téléphone *"}
              />
            </div>
            <div className="line">
              <InputForm
                size={"small"}
                type={"text"}
                value={postalCode}
                setValue={setPostalCode}
                required={true}
                placeholder={"Code postal *"}
              />
              <InputForm
                format={"uppercase"}
                size={"medium"}
                type={"text"}
                value={city}
                setValue={setCity}
                required={true}
                placeholder={"Ville *"}
              />
            </div>
          </div>
        </div>
        <div className="date-birth">
          <span></span>
          <div className="line">
            <InputForm
              type={"text"}
              size={"small"}
              maxLength={2}
              format={"capitalize"}
              value={dayOfBirth}
              setValue={setDayOfBirth}
              required={true}
              placeholder={"JJ *"}
            />
            <InputForm
              type={"text"}
              size={"small"}
              maxLength={2}
              format={"capitalize"}
              value={monthOfBirth}
              setValue={setMonthOfBirth}
              required={true}
              placeholder={"MM *"}
            />
            <InputForm
              type={"text"}
              size={"medium"}
              maxLength={4}
              format={"capitalize"}
              value={yearOfBirth}
              setValue={setYearOfBirth}
              required={true}
              placeholder={"AAAA *"}
            />
          </div>
        </div>
        <h1>vérifier et réserver</h1>
        <div className="price-detail">
          <PriceDetails
            offer={offer}
            agency={agency}
            rentalDays={rentalDays}
            configurationData={configurationData}
            totalPrice={totalPrice}
            extraFees={extraFees}
          />
        </div>

        <p>
          En cliquant sur le bouton, je confirme que j'ai lu et accepté les <b>informations de location</b> et
          les <b>termes et conditions</b>
        </p>
        <div className="submit-btn">
          <button type="submit">réserver</button>
          {(!firstName ||
            !lastName ||
            !email ||
            !street ||
            !phoneNumber ||
            !postalCode ||
            !city ||
            !dayOfBirth ||
            !monthOfBirth ||
            !yearOfBirth) && (
            <div className="missing-msg">
              <span>champs obligatoires manquants</span>
              <i className={"ico-info"}></i>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonnalDetails;
