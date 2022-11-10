import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import CardsList from "./components/listCard.component";


class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar-expand-lg navbar navbar-expand navbar-light bg-light">
          <a href="/cards" className="navbar-brand">
            Credit Card System
          </a>
        </nav>

        <div className="mt-3">
          <Routes>
            <Route path="/" element={<CardsList/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;