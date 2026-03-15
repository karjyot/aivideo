
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import Dashboard from "./components/dashboard";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<App />}>
         
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);

reportWebVitals();