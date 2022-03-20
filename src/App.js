import { useState } from "react";

import "./App.scss";
import "./assets/icons/style.css";
import "./assets/fonts/stylesheet.css";

//context
import { SearchProvider } from "./context/SearchContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import OfferList from "./pages/OfferList";
import OfferConfig from "./pages/OfferConfig";
import PersonnalDetails from "./pages/PersonnalDetails";
import BackOffice from "./pages/BackOffice";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [adminLogged, setAdminLogged] = useState(localStorage.getItem("storedAdminPassword") ? true : false);
  // modal states

  const setPassword = (password) => {
    if (password) {
      localStorage.setItem("storedAdminPassword", String(password));
      setAdminLogged(true);
    } else {
      localStorage.removeItem("storedAdminPassword");
      setAdminLogged(false);
    }
  };

  return (
    <Router>
      <div className="App-container">
        <Header setPassword={setPassword} adminLogged={adminLogged} />
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offerlist" element={<OfferList />} />
            <Route path="/offerconfig" element={<OfferConfig />} />
            <Route path="/personnaldetails" element={<PersonnalDetails />} />
            <Route
              path="/backoffice"
              element={<BackOffice setPassword={setPassword} adminLogged={adminLogged} />}
            />
          </Routes>
        </SearchProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
