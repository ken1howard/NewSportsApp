import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/LoginPage.css"; 
import { Form, Input, Button } from "antd"; 
import nflLogo from "./Assets/BlackNFLlogo.jpg";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      
      navigate("/app");
    };
  
    return (
      <div className="login-container">
        {/* NFL logo */}
      <img src={nflLogo} alt="NFL Logo" className="nfl-logo" />
        <h2 className="login-title">Log In</h2>
        <Form>
          <Form.Item label="Username" className="login-form-label">
            <Input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password" className="login-form-label">
            <Input.Password
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button className="login-button" type="primary" onClick={handleLogin}>
              Log In
            </Button>
          </Form.Item>
          <p className="signup-link">
            Don't have an account? <Link to="/SignupPage">Sign Up</Link>
          </p>
        </Form>
      </div>
    );
  };
  
  export default LoginPage;
  