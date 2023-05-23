import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Signup() {
	
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/register",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          const { name, email, password } = data.errors;
          if (name) {
            generateError(email);
          } else if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          }
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign In
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="name"
              required
              className="input"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
              className="input"
            />
            <button type="submit" className="green_btn">
              Sing Up
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
