import React from 'react'
import LandingPage from "./Pages/LandingPage";
import SearchPage from "./Pages/SearchPage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"

import './App.css';
import JobDetails from "./Pages/JobDetailsPage";
import { URL_FAVORITES, URL_JOB_DETAILS, URL_LOGIN, URL_ROOT, URL_SEARCH, URL_SIGNUP } from "./constants/routes";

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route exact path={URL_ROOT} element={<LandingPage />} />
        <Route exact path={URL_SEARCH} element={<SearchPage />} />
        <Route exact path={URL_FAVORITES} element={<FavoritesPage />} />
        <Route exact path={URL_LOGIN} element={<LoginPage />} />
        <Route exact path={URL_SIGNUP} element={<SignUpPage />} />
        <Route exact path={URL_JOB_DETAILS} element={<JobDetails />} />
      </Routes>
    </Router>
  );
}




export default App;
