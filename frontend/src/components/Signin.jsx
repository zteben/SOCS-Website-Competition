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

                {/* 


                <form name="LoginForm" action="#" method="get" autocomplete="on">

                    
                    <h1 style="margin-top: 10px; margin-bottom: 20px;">Lemonz</h1>
                    <div class="form-group">
                        <label for="email" id="email_label">Email Address</label>
                        <input type="text" id="email" name="email" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="password" id="password_label">Password</label>
                        <input type="password" id="password" name="password" class="form-control">
                    </div>
                    <span class="centered-links"><a href="#">Forgot Password?<br><br></a></span>

                    <button type="submit" class="btn btn-light">Login</button>
                </form> */}
        </div>
    );
};


export default Signin;