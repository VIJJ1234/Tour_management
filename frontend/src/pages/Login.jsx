import React, { useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");  // Debugging step to check if the function is called

    dispatch({ type: "LOGIN_START" });

    setLoading(true); // Start loading state

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log("Login Response:", result);  // Debugging step to see the API response

      if (!res.ok) {
        alert(result.message || "Login failed");
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
        setLoading(false); // End loading state
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/"); // Navigate to home page after login
    } catch (err) {
      console.error("Login Error:", err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      setLoading(false); // End loading state
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>

                <form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      id="email"
                      onChange={handleChange}
                      value={credentials.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      id="password"
                      onChange={handleChange}
                      value={credentials.password}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Logging in..." : "Login"} {/* Button text change */}
                  </Button>
                </form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
