import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { register } from "../../service/api";
import { URL_ROOT } from "../../constants/routes";
import { useNavigate } from "react-router-dom";



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
    <div>
      <input type="text" name="username" placeholder="username" value={username} onChange={(e) => {
        setUsername(e.target.value)
      }}/>
      <input type="password" name="password" placeholder="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}/>
      <button onClick={onSignUpClick}>Sign Up</button>
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

  )
}