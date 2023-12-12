import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Signin.css";
import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState(null);
    
    const handleLogin = async () => {
        try {
            console.log(username, password);
            const response = await axios.post("http://localhost:3000/auth/login", {
              username: username,
              password: password,
            });

            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setError(null);
            console.log("Login successful");

            navigate('/select');

          } catch (error) {
            if (error.response) {
              console.error(`Request failed with status code ${error.response.status}: ${error.response.data}`);
              setError(error.response.data);

              } else if (error.request) {
                console.error("Request made but no response received");
              } else {
                console.error("Error setting up the request:", error.message);
              }
          }
        };
  
    return (
      <div className="Signin">
        <div className="bird">
          <Link to="/home">
            <img
                src="images/bird_white.png"
                alt="McGill Logo"
                width="70"
                height="70"
            />
          </Link>
        </div>
        <div className="form">
          <div className="input-box">
              <h3 className="heading">Sign in</h3>

              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`write ${errorMessage ? 'error' : ''}`}
              />

              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`write ${errorMessage ? 'error' : ''}`}
              />

              <button className="submit" onClick={handleLogin}>Submit</button>
              <div>
              <Link to="/register">Create Account</Link>
              </div>
          </div>
        </div>
      </div>
    );
};


export default Signin;