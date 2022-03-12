import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offerlist" element={<OfferList />} />
        <Route path="/offerconfig" element={<OfferConfig />} />
        <Route path="/personnaldetails" element={<PersonnalDetails />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
    </Router>
  );
}

export default App;
