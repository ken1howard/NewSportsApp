import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Implement registration logic here, e.g., sending a POST request to your backend API

    // Assuming registration is successful, navigate to the login page
    navigate("/LoginPage");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/LoginPage">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
