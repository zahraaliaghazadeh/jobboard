import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { login } from "../../service/api";
import { URL_ROOT } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const { setGlobalUsername } = props;

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const onLoginClick = async () => {
    try {
      await login(username, password)
      setGlobalUsername(username);
      navigate(URL_ROOT);
    } catch (err) {
      if (err.response.data.errorCode === 'INVALID_CREDENTIALS') {
        setIsInvalidCredentials(true);
      }
    }
  }

  return (
    <div>
      <input type="text" name="username" placeholder="username" value={username} onChange={(e) => {
        setUsername(e.target.value)
      }}/>
      <input type="password" name="password" placeholder="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}/>
      <button onClick={onLoginClick}>Login</button>
      {isInvalidCredentials && <p className="text-danger">Invalid username or password</p>}
    </div>
  )
}
