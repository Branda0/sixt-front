import { useEffect, useState } from "react";
import axios from "axios";

import "./BackOffice.scss";
import InputForm from "../components/InputForm";

const BackOffice = ({ setPassword, adminLogged }) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // Scroll to Top screen when coming from another page with navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    try {
      //   const response = await axios.post("https://brandao-sixt.herokuapp.com/rental/new", {
      const response = await axios.post("http://localhost:4000/backoffice/login", {
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
      } else if (error.response.status === 409) {
      }
    }
  };

  return (
    <div className="backoffice-container">
      {/* <button onClick={() => setAdminPassword("YOYO")}>test</button> */}

      {/* <button onClick={() => handleAdminSignIn(password)}>TEST</button>; */}
      {/* <button onClick={() => setPassword()}>vide</button> */}
      {adminLogged ? (
        <span>Connected</span>
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
