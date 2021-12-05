import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { URL_FAVORITES, URL_LOGIN, URL_MY_JOBS, URL_ROOT, URL_SETTINGS, URL_SIGNUP } from "../../constants/routes";
import { logout } from "../../service/api";

export default function Navbar(props) {
  const { username } = props;

  const [showHamburgerContent, setShowHamburgerContent] = useState(false);

  const show = (showHamburgerContent) ? "show" : "";

  function toggleHamburger() {
    setShowHamburgerContent(!showHamburgerContent);
  }

  const onLogoutClick = async () => {
    try {
      await logout()
      window.location = URL_ROOT
    } catch (err) {
      console.error(err);
    }
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
          </ul>



          <ul className="nav navbar-nav navbar-right pull-right">
            {
              !username && (
                <li>
                  <button type="button" className="btn btn-warning login-button">
                    <a className="btn-link" href={URL_LOGIN}>
                      Login
                    </a>
                  </button>
                </li>
              )
            }
            {
              !username && (
                <li>
                  <button type="button" className="btn btn-warning signup-button">
                    <a className="btn-link" href={URL_SIGNUP}>
                      Sign Up
                    </a>
                  </button>
                </li>
              )
            }
            {
              username &&
              <li>
                <button type="button" className="btn btn-warning signup-button">
                  <a className="btn-link" href={URL_FAVORITES}>
                    Favorites
                  </a>
                </button>
              </li>
            }
            {
              username &&
              <li>
                <button type="button" className="btn btn-warning signup-button">
                  <a className="btn-link" href={URL_MY_JOBS}>
                    {username}
                  </a>
                </button>
              </li>
            }
            {
              username &&
              <li>
                <button onClick={onLogoutClick} type="button" className="btn btn-warning signup-button">
                    Logout
                </button>
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}
