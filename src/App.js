import "./App.scss";
import "./assets/icons/style.css";
import "./assets/fonts/stylesheet.css";

//context
import { SearchProvider } from "./context/SearchContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

//pages
import Home from "./pages/Home";
import OfferList from "./pages/OfferList";
import OfferConfig from "./pages/OfferConfig";
import PersonnalDetails from "./pages/PersonnalDetails";

//components
import Header from "./components/Header";

function App() {
  // modal states

  return (
    <div className="App-container">
      <Router>
        <Header />
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offerlist" element={<OfferList />} />
            <Route path="/offerconfig" element={<OfferConfig />} />
            <Route path="/personnaldetails" element={<PersonnalDetails />} />
            {/* <Route path="/backoffice" element={<BackOffice />} /> */}
          </Routes>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
