import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Signin.css";
import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState(null);
    
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
            setErrorStatus(null);
            console.log("Login successful", username, password);

            // navigate('/secure-landing');

          } catch (error) {
            if (error.response) {
                const status = error.response.status;
                console.error(`Request failed with status code: ${status}`);
                setErrorStatus(400);

                if (status === 400) {
                  // Handle Bad Request
                } else if (status === 401) {
                  // Handle Unauthorized
                } else if (status === 404) {
                  // Handle Not Found
                } else {
                  // Handle other status codes
                }
              } else if (error.request) {
                console.error("Request made but no response received");
              } else {
                console.error("Error setting up the request:", error.message);
              }
          }
        };
  


    return (
        <div className="Signin">
            <div className="input-box">
                <h3>Login</h3>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errorStatus === 400 ? 'error' : ''}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errorStatus === 400 ? 'error' : ''}
                />

                <button onClick={handleLogin}>Submit</button>
                <div>
                <Link to="/register">Create Account</Link>
                </div>
            </div>
        </div>
    );
};


export default Signin;