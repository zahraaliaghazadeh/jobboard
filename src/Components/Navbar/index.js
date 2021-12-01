import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { URL_ROOT } from "../../constants/routes";
// import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const [showHamburgerContent, setShowHamburgerContent] = useState(false);

  const show = (showHamburgerContent) ? "show" : "";

  function toggleHamburger() {
    setShowHamburgerContent(!showHamburgerContent);
  }

  return (


    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <a className="navbar-brand logo" href="#">Battleship</a> */}
        <a className="logo" href={URL_ROOT}>
          <div className="logo"><img src="/favicon.ico" alt="logo of a battleship"></img></div>
          <div className="navbar-brand logo">Job Board</div>
        </a>
        <button
          onClick={() => toggleHamburger()}
          className="navbar-toggler hamburger"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse " + show} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link sr-only" href="/">
                Home
              </a>
            </li>
            <li>
              {/*<input class="form-control mr-sm-2" type="search" placeholder="Search jobs" aria-label="Search">*/}
              {/*</input>*/}
              {/*<button type="button" class="btn btn-warning"><a className="btn-link" href="/search-page">Search Jobs</a></button>*/}
            </li>
          </ul>



          <ul class="nav navbar-nav navbar-right pull-right">
            <li>
            <button type="button" class="btn btn-warning login-button"><a className="btn-link" href="/login-page">Login</a></button>
            </li>
            <li>
            <button type="button" class="btn btn-warning signup-button"><a className="btn-link" href="/signup-page">Sign Up</a></button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
