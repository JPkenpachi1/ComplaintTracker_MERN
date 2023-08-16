
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Register from "./pages/registrationpage";
import Sample from "./pages/Samplepage1"
import Enquiry from "./pages/EnquiryPage";
import ComplaintGrid from "./pages/ComplaintGrid";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} exact/>
        <Route path="/Register" element={<Register/>} exact/>
        <Route path="Sample" element={<Sample/>} exact/>
        <Route path="Enquiry" element={<Enquiry/>} exact />
        <Route path="ComplaintGrid" element={<ComplaintGrid/>} exact/>
      </Routes>
    </Router>
  )
}

export default App;
