import { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/sixt-logo.png";
import "./Header.scss";

const Header = ({ setPassword, adminLogged }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo} alt="sixt" />
      </Link>

      <div className="center-header">
        {location.pathname === "/" || location.pathname === "/backoffice" ? (
          <nav className="home">
            <span>RENT</span>
            <span>SHARE</span>
            <span>RIDE</span>
            <span>SIXT+</span>
          </nav>
        ) : (
          <div className="offer">
            <div
              className={
                (location.pathname === "/offerlist" ||
                  location.pathname === "/offerconfig" ||
                  location.pathname === "/personnaldetails") &&
                "color-status"
              }
            >
              <i
                className={
                  (location.pathname === "/offerconfig" || location.pathname === "/personnaldetails") &&
                  "ico-bullet-xl"
                }
              >
                {location.pathname === "/offerconfig" || location.pathname === "/personnaldetails" ? "" : "1"}
              </i>
              <span>SÉLECTION DES VÉHICULES</span>
            </div>

            <div
              className={
                (location.pathname === "/offerconfig" || location.pathname === "/personnaldetails") &&
                "color-status"
              }
            >
              <i className={location.pathname === "/personnaldetails" && "ico-bullet-xl"}>
                {location.pathname === "/personnaldetails" ? "" : "2"}
              </i>
              <span>PROTECTIONS ET OPTIONS</span>
            </div>
            <div className={location.pathname === "/personnaldetails" && "color-status"}>
              <i>3</i>
              <span>CONDUCTEUR</span>
            </div>
          </div>
        )}
      </div>

      {location.pathname === "/backoffice" && adminLogged && (
        <button
          onClick={() => {
            setPassword();
            navigate("/");
          }}
        >
          se deconnecter
        </button>
      )}

      <Link className="back-office" to="/backoffice">
        <i className="ico-planet" />
        <span>BACKOFFICE</span>
      </Link>

      {/* <span>Hello world</span> */}
    </div>
  );
};

export default Header;
