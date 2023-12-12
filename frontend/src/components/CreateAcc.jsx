import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Signin.css";
import axios from "axios";

const CreateAcc = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState(null);
    
    const handleRegister = async () => {
        try {
            console.log(username, password);
            // eslint-disable-next-line 
            const response = await axios.post("http://localhost:3000/auth/register", {
              username: username,
              password: password,
            });

            setError(null);
            console.log("Registration successful");

            navigate('/login');

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
      <div className="Signup">
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
                <h3 className="heading">Create an account</h3>
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

                <button className="submit" onClick={handleRegister}>Submit</button>
                <div>
                Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
          </div>
        </div>
    );
};


export default CreateAcc;