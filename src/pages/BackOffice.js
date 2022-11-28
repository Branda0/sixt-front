import { useEffect, useState } from "react";
import axios from "axios";

import "./BackOffice.scss";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import RentalLine from "../components/RentalLine";
import PriceDetails from "../components/PriceDetails";

const BackOffice = ({ setPassword, adminLogged }) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [rentalsData, setRentalsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(false);
  const [detailsOffer, setDetailsOffer] = useState();

  // Scroll to Top screen when coming from another page with navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (adminLogged) fetchData();
  }, [adminLogged]);

  const fetchData = async () => {
    try {
      // const response = await axios.get("http://localhost:4000/rentals");
      const response = await axios.get("https://branda0-sixt.up.railway.app/rentals");
      setRentalsData(response.data);
      console.log("data", response.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://branda0-sixt.up.railway.app/backoffice/login", {
        adminPassword,
      });

      if (response.data.status === "success") {
        setPassword(adminPassword);
        setErrorMsg("");
      } else {
        setPassword();
        setErrorMsg("Accès refusé");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMsg("Accès refusé");
      } else {
        console.log({ errorMessage: error });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://branda0-sixt.up.railway.app/rental/delete?id=${id}`);
      // const response = await axios.delete(`http://localhost:4000/rental/delete?id=${id}`);
      fetchData();
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMsg("Accès refusé");
      } else if (error.response.status === 409) {
      }
    }
  };

  return (
    <div className="backoffice-container">
      {adminLogged ? (
        isLoading ? (
          <Loader />
        ) : (
          <div className="logged-page">
            <div className={`details-modal-bg ${detailsModal && "visible"}`}>
              <div className="modal">
                {detailsOffer && (
                  <PriceDetails
                    backoffice={detailsOffer}
                    offer={detailsOffer.offer}
                    configurationData={detailsOffer.configuration}
                    totalPrice={detailsOffer.price}
                    extraFees={detailsOffer.extraFees}
                  />
                )}

                <i
                  className="ico-close"
                  onClick={() => {
                    setDetailsModal(false);
                    // navigate("/");
                  }}
                ></i>
              </div>
            </div>

            <div className="rental-count">
              <span className="title">Réservations validées :</span>
              <span className="count">{rentalsData.count}</span>
            </div>
            <div className="rental-tab-top ">
              <RentalLine
                menu={true}
                reference={"Réference"}
                firstName={"Prénom"}
                lastName={"Nom"}
                dateStart={"Date de retrait"}
                dateEnd={"Date de retour"}
                timeStart={"à"}
                timeEnd={"à"}
                days={"Nombres de jours"}
                price={"Prix Total"}
              />
            </div>
            {rentalsData.rentals.map((rental, index) => {
              return (
                <div
                  onClick={() => {
                    setDetailsOffer(rental);
                    setDetailsModal(true);
                  }}
                  key={index}
                  className="close-relative"
                >
                  <RentalLine
                    setDetailsModal={setDetailsModal}
                    setDetailsOffer={setDetailsOffer}
                    reference={rental.reference}
                    firstName={rental.client.firstName}
                    lastName={rental.client.lastName}
                    dateStart={rental.date.dateStart}
                    dateEnd={rental.date.dateEnd}
                    timeStart={rental.date.timeStart}
                    timeEnd={rental.date.timeEnd}
                    days={rental.date.daysPaid}
                    price={rental.price}
                  />
                  <i
                    className="ico-close"
                    onClick={(event) => {
                      handleDelete(rental._id);
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <form className="password-form" onSubmit={handleAdminSignIn}>
          <h1>BackOffice</h1>
          <InputForm
            type={"password"}
            value={adminPassword}
            setValue={setAdminPassword}
            required={true}
            placeholder={"Mot de Passe"}
          />
          <div className="btn-msg-container">
            <button className="login-btn" type="submit">
              se connecter
            </button>
            <span className="errormsg">{errorMsg}</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default BackOffice;
