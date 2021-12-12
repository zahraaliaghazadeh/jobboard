import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import {login} from "../../service/api";
import {URL_ROOT} from "../../constants/routes";
import {useLocation, useNavigate} from "react-router-dom";
import {parse} from "query-string";

export default function LoginPage(props) {
  const {setGlobalUsername} = props;
  const location = useLocation();
  const redirect = parse(location.search).redirect;

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const onLoginClick = async () => {
    try {
      await login(username, password)
      setGlobalUsername(username);
      if (redirect) {
        window.location = redirect;
      } else {
        navigate(URL_ROOT);
      }
    } catch (err) {
      if (err.response.data.errorCode === 'INVALID_CREDENTIALS') {
        setIsInvalidCredentials(true);
      }
    }
  }

  return (
      <div className={"container login-form"}>
        <div className={"row"}>
          <div className={"col col-md-auto-4"}>
            <div className={"login-title"}>Login</div>
            <div className={"login-instruction"}>If you have not registered a user and password yet, please try
              signing up first.
            </div>
            <div className={"form-group"}>
              <input className="login-username form-control" type="text"
                     name="username"
                     placeholder="username"
                     value={username} onChange={(e) => {
                setUsername(e.target.value)
              }}/>
            </div>
            <div className={"form-group"}>
              {/*<small id="passHelp" className="form-text text-muted"> Password*/}
              {/*  doesn't have any restrictions currently.</small>*/}

              <input className="login-password form-control"
                     type="password"
                     // id={"PassInput"}
                     name="password"
                     placeholder="password"
                     value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}/>
            </div>

            <button className="login-button btn btn-warning"
                    onClick={onLoginClick} type={"submit"}>Login
            </button>
            {isInvalidCredentials && <p className="text-danger">Invalid
              username
              or password</p>}
          </div>

        </div>

      </div>
  )
}
