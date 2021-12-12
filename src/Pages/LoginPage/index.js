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
          <div className={"col col-md-auto"}>
            {/*<div>If you have not registered yet, try signing up first</div>*/}
            <input className="login-username" type="text" name="username"
                   placeholder="username"
                   value={username} onChange={(e) => {
              setUsername(e.target.value)
            }}/>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col col-md-auto"}>
            {/*<div>Password doesn't have any restrictions currently.</div>*/}
            <input className="login-password" type="password" name="password"
                   placeholder="password"
                   value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col col-md-auto"}>
            <button className="login-button btn-warning"
                    onClick={onLoginClick}>Login
            </button>
            {isInvalidCredentials && <p className="text-danger">Invalid
              username
              or password</p>}
          </div>
        </div>

      </div>
  )
}
