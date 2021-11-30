import React from 'react'
import LandingPage from "./Pages/LandingPage/index";
import SearchPage from "./Pages/SearchPage/index";
import FavoritesPage from "./Pages/FavoritesPage/index";
import LoginPage from "./Pages/LoginPage/index";
import SignUpPage from "./Pages/SignUpPage/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/index"

import './App.css';

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
      </Routes>
    </Router>
  );
}




export default App;
