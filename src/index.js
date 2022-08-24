import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// importe de componentes
import CList from "./components/Company/CompanyList";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CompanyForm from "./components/Company/CompanyForm";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <Navbar/>

      <div className="container my-4">
        <Routes>

        <Route exact path="/" element={<CList/>}/>
        <Route exact path="/companyForm" element={<CompanyForm/>}/>
        <Route exact path="/updateCompany/:id" element={<CompanyForm/>}/>
        </Routes>

        
      </div>
        
      </BrowserRouter>
      
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
