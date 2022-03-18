import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { SearchContext } from "../context/SearchContext";
import "./PersonnalDetails.scss";

import PriceDetails from "../components/PriceDetails";

const PersonnalDetails = () => {
  // Get data from Context
  const data = useContext(SearchContext);

  // Get data from routing from /offerconfig page
  const { state } = useLocation();
  const offer = state.offer;
  const configurationData = state.configurationData;
  const totalPrice = state.totalPrice;
  const extraFees = state.extraFees;

  // number of rental days (from context)
  const rentalDays = data.rentalDays;

  // States values of personal details form data
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [company, setCompany] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("France");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({});

  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", {
    //     email: email,
    //     username: name,
    //     password: password,
    //     newsletter: newsletter,
    //   });
    //   // const response = await axios.post("https://brandao-vinted.herokuapp.com/user/signup", {
    //   //   email: email,
    //   //   username: name,
    //   //   password: password,
    //   //   newsletter: newsletter,
    //   // });
    //   console.log(response.data);
    //   setReference(response.data.token, response.data._id);
    //   setSignupModal(false);
    //   // setSignupError("");
    // } catch (error) {
    //   if (error.response.status === 400) {
    //     setSignupError("Paramètres manquants");
    //   } else if (error.response.status === 409) {
    //     setSignupError("Cet email a déjà un compte !");
    //   }
    // }
  };

  return (
    <div className={`personnaldetails-container ${confirmationModal && "modal"}`}>
      <span>TEST</span>
      <form onSubmit={handleSubmit}>
        <div className="gender">
          <i
            className={isMale ? "ico-radio-selected" : "ico-radio"}
            onClick={() => {
              if (!isMale && isFemale) {
                setIsFemale(false);
              }
              setIsMale(!isMale);
            }}
          ></i>
          <span>M.</span>
          <i
            className={isFemale ? "ico-radio-selected" : "ico-radio"}
            onClick={() => {
              if (!isFemale && isMale) {
                setIsMale(false);
              }
              setIsFemale(!isFemale);
            }}
          ></i>
          <span>Mme</span>
        </div>
        <div className="input-rows">
          <div className="left-row"></div>
          <div className="right-row"></div>
        </div>

        {/* <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div className="form-input-password">
          <input
            className="input"
            value={password}
            type={passwordVisibility ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <span onClick={() => setPasswordVisibility(!passwordVisibility)} className="eye-icon">
            <FontAwesomeIcon icon="eye" />
          </span>
        </div>
        <div className="form-newsletter">
          <input
            value={newsletter}
            type="checkbox"
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
        </div> */}

        {/* <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de
          Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
        </p> */}
        {/* {signupError && <span className="error-msg">{signupError}</span>} */}
        <button type="submit">S'inscrire</button>
      </form>
      <PriceDetails
        offer={offer}
        rentalDays={rentalDays}
        configurationData={configurationData}
        totalPrice={totalPrice}
        extraFees={extraFees}
      />
    </div>
  );
};

export default PersonnalDetails;
