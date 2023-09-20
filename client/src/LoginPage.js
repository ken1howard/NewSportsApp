import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement authentication logic here, e.g., sending a POST request to your backend API

    // Assuming authentication is successful, navigate to the main app page
    navigate("/app");
  };

  return (
    <div>
      <h2>Log In</h2>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/SignupPage">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
