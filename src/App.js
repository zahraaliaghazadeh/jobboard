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

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}>
        </Route>
        <Route exact path={"/search-page"} element={<SearchPage />}>
        </Route>
        <Route exact path={"/favorites-page"} element={<FavoritesPage />}>
        </Route>
        <Route exact path={"/login-page"} element={<LoginPage />}>
        </Route>
        <Route exact path={"/signup-page"} element={<SignUpPage />}>
        </Route>
        <Route exact path={"/job-details/:id"} element={<JobDetails />}>
        </Route>
      </Routes>
    </Router>
  );
}




export default App;
