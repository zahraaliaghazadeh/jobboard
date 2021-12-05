import React, { useEffect, useState } from 'react'
import LandingPage from "./Pages/LandingPage";
import SearchPage from "./Pages/SearchPage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"

import './App.css';
import JobDetails from "./Pages/JobDetailsPage";
import {
  URL_CREATE_JOB, URL_EDIT_JOB,
  URL_FAVORITES,
  URL_JOB_DETAILS,
  URL_LOGIN, URL_MY_JOBS,
  URL_ROOT,
  URL_SEARCH,
  URL_SIGNUP
} from "./constants/routes";
import { getUsername } from "./service/api";
import CreateJobPage from "./Pages/CreateJobPage";
import MyJobsPage from "./Pages/MyJobsPage";
import EditJobPage from "./Pages/EditJobPage";

function App() {

  const [username, setUsername] = useState();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const username = await getUsername();
        setUsername(username);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsername();
  }, []);

  return (

    <Router>
      <Navbar username={username} />
      <Routes>
        <Route exact path={URL_ROOT} element={<LandingPage />} />
        <Route exact path={URL_SEARCH} element={<SearchPage />} />
        <Route exact path={URL_FAVORITES} element={<FavoritesPage />} />
        <Route exact path={URL_LOGIN} element={<LoginPage setGlobalUsername={setUsername} />} />
        <Route exact path={URL_SIGNUP} element={<SignUpPage />} />
        <Route exact path={URL_JOB_DETAILS} element={<JobDetails />} />
        <Route exact path={URL_MY_JOBS} element={<MyJobsPage />} />
        <Route exact path={URL_CREATE_JOB} element={<CreateJobPage />} />
        <Route exact path={URL_EDIT_JOB} element={<EditJobPage />} />
      </Routes>
    </Router>
  );
}




export default App;
