import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Welcome from "./components/Welcome.component.js";
import Receipts from "./components/Receipts.component.js";
import Customers from "./components/Customers.component.js";
import Reports from "./components/Reports.component.js";

function App() {

  useEffect(() => {
    document.title = "Noreste App"
  }, [])

  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Welcome} />
        <Route path="/receipts" component={Receipts} />
        <Route path="/customers" component={Customers} />
        <Route path="/reports" component={Reports} />
      </div>
    </Router>
  );
}

export default App;