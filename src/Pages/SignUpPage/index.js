import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {register} from "../../service/api";
import {URL_ROOT} from "../../constants/routes";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const onSignUpClick = async () => {
    if (!username || !password) {
      setErrorMessages(['Username or password cannot be empty'])
    }
    try {
      await register(username, password)
      navigate(URL_ROOT);
    } catch (err) {
      console.log(err)
      const errMessages = err.response.data.errorMessages;
      if (errMessages && errMessages.length > 0) {
        setErrorMessages(errMessages);
      }
    }
  }

  return (
      <div className={"main-body"}>
      <div className={"container signup-form"}>
        <div className={"row"}>
          <div className={"col col-md-auto-4"}>
            <div className={"signup-title"}> Sign Up</div>
            <div className={"form-group"}>

              <input className={"signup-username form-control"} type="text"
                     name="username" placeholder="username"
                     value={username} onChange={(e) => {
                setUsername(e.target.value)
              }}/>


              <small id="passHelp" className="form-text text-muted"> Password
                doesn't have any restrictions currently.</small>
              <input className={"signup-password form-control"} id={"passInput"}
                     type="password" name="password" placeholder="password"
                     value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}/>

              <button className={"signup-button btn btn-warning"}
                      onClick={onSignUpClick}>Sign Up
              </button>
              {errorMessages.length > 0 && (
                  <li>
                    {
                      errorMessages.map((message) => (
                          <p className="text-danger">{message}</p>
                      ))
                    }
                  </li>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

  )
}