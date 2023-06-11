import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Login from "../pages/login";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateContact = (contact) => {
    const re = /^[0-9]{10}$/;
    return re.test(contact);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === password;
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("user"));
    if (users) {
      if (users.email === email) {
        return alert("user already exist");
      }
    }
    const user = {
      name: name,
      email: email,
      contact: contact,
      password: password,
    };

    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }
    if (!validateContact(contact)) {
      alert("Invalid contact number");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be 6-20 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    if (!validateConfirmPassword(confirmPassword)) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="loginContent">
          <div className="loginHeading">Signup</div>
          <div className="formInput">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="formInput">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="formInput">
            <input
              type="number"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact"
              min={0}
              max={10}
              minLength={0}
              maxLength={10}
            />
          </div>
          <div className="formInput">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onBlur={(e) => validatePassword(e.target.value)}
            />
          </div>
          <div className="formInput">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              onBlur={(e) => validateConfirmPassword(e.target.value)}
            />
          </div>
          <div className="formButton">
            <Button variant="primary" onClick={() => handleSignup()}>
              Submit
            </Button>
          </div>
          <div className="mt-4">
            Already have an account? <Link to="/"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
