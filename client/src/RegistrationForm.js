import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/RegistrationForm.css"; 
import nflLogo from "./Assets/BlackNFLlogo.jpg"; 

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        // Registration successful, navigate to the login page
        navigate("/login");
      }
    } catch (error) {
      // Handle registration error, e.g., display an error message
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="registration-container">
      {/* NFL logo */}
      <img src={nflLogo} alt="NFL Logo" className="nfl-logo" />

      <h2 className="registration-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="registration-form-label">Username</label>
          <input
            className="registration-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="registration-form-label">Email</label>
          <input
            className="registration-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="registration-form-label">Password</label>
          <input
            className="registration-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="registration-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;


