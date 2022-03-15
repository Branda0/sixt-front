import "./App.scss";
import "./assets/icons/style.css";
import "./assets/fonts/stylesheet.css";

//context
import { SearchProvider } from "./context/SearchContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import OfferList from "./pages/OfferList";

//components
import Header from "./components/Header";

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offerlist" element={<OfferList />} />
            {/* // <Route path="/offerconfig" element={<OfferConfig />} />
        // <Route path="/personnaldetails" element={<PersonnalDetails />} />
        // <Route path="/backoffice" element={<BackOffice />} /> */}
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
