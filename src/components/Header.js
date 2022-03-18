import logo from "../assets/img/sixt-logo.png";
import "./Header.scss";

import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo} alt="sixt" />
      </Link>

      <div className="center-header">
        {location.pathname === "/" ? (
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
                  location.pathname === "/offerconfig" ||
                  (location.pathname === "/personnaldetails" && "ico-bullet-xl")
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
      <div className="back-office">
        <i className="ico-planet" />
        <span>BACKOFFICE</span>
      </div>

      {/* <span>Hello world</span> */}
    </div>
  );
};

export default Header;
