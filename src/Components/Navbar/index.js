import React from "react";
import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {
  URL_FAVORITES,
  URL_LOGIN,
  URL_MY_JOBS,
  URL_ROOT,
  URL_SIGNUP
} from "../../constants/routes";
import {logout} from "../../service/api";
import {
  Heart,
  PersonCheck,
  DoorClosed,
  FileEarmarkLock,
  Key,
  HouseDoor
} from 'react-bootstrap-icons';

export default function Navbar(props) {
  const {username} = props;

  const [showHamburgerContent, setShowHamburgerContent] = useState(false);

  const show = (showHamburgerContent) ? "show" : "";

  function toggleHamburger() {
    setShowHamburgerContent(!showHamburgerContent);
  }

  const onLoginClick = () => {
    const curUrl = window.location.toString();
    if (curUrl.includes(URL_LOGIN)) {
      window.location = curUrl
    } else {
      window.location = `${URL_LOGIN}?redirect=${encodeURIComponent(curUrl)}`
    }
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
          <a className="logo " href={URL_ROOT}>
            <div className="logo"><img src="/favicon.ico"
                                       alt="logo of a battleship"></img></div>
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

          <div
              className={"collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2 "
                  + show} id="navbarSupportedContent">

            <ul className="nav navbar-nav">
              {/*Home*/}
              <li className="nav-item active">
                <a className="nav-link sr-only" href="/">
                  {/*<span><HouseDoor/>  Home</span>*/}
                  <HouseDoor/>  Home
                </a>
              </li>
              {
                  !username && (
                      <li className="nav-item active" onClick={onLoginClick}>
                        <a className="nav-link">
                          {/*<span><FileEarmarkLock/>  Login</span>*/}
                          <FileEarmarkLock/> Login
                        </a>

                      </li>
                  )
              }
              {
                  !username && (
                      <li className="nav-item active">
                        <a className="nav-link" href={URL_SIGNUP} >
                          {/*<span><Key/>  Sign Up</span>*/}
                          <Key/> Sign Up
                        </a>
                      </li>
                  )
              }
              {
                  username &&
                  <li className="nav-item active">
                    {/*<button type="button" className="btn btn-warning signup-button">*/}
                    <a className="nav-link" href={URL_FAVORITES}>
                      <span><Heart/>  Favorites</span>
                    </a>
                  </li>
              }
              {
                  username &&
                  <li className="nav-item active">
                    <a className="nav-link" onClick={onLogoutClick}>
                      {/*<span><DoorClosed/>  Logout</span>*/}
                      <DoorClosed/> Logout
                    </a>
                  </li>
              }

              {
                  username &&
                  <li className="nav-item active">
                    <a className="nav-link" id={"username"} href={URL_MY_JOBS}>
                      {/*<span><PersonCheck/> {username}</span>*/}
                      <PersonCheck/> {username}
                    </a>
                  </li>
              }
            </ul>


          </div>
        </nav>
      </div>
  );
}
