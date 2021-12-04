import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { login } from "../../service/api";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const onLoginClick = async () => {
    try {
      const res = await login(username, password)
    } catch (err) {
      console.log(err.response)
      if (err.response.data.errorCode === 'INVALID_CREDENTIALS') {
        setIsInvalidCredentials(true);
      }
    }
    // TODO redirect
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
      {isInvalidCredentials && <p className="label label-danger">Invalid username or password</p>}
    </div>
  )
}
