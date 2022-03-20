import { useEffect, useState } from "react";
import axios from "axios";

import "./BackOffice.scss";

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
      <form className="password-form" onSubmit={handleAdminSignIn}>
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
        />
        <button type="submit">réserver</button>
      </form>
      <span>{errorMsg}</span>
      {/* <button onClick={() => handleAdminSignIn(password)}>TEST</button>; */}
      {/* <button onClick={() => setPassword()}>vide</button> */}
      {adminLogged ? <span>Connected</span> : <span>Disconected</span>}
    </div>
  );
};

export default BackOffice;
