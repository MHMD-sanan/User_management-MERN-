import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

function AdminLogin() {
  const navigate = useNavigate();
  const [cookie,setCookie,removeCookie]=useCookies();
  useEffect(()=>{
    const ifLogged=()=>{
      cookie.token?navigate('/admin'):navigate('/adminlogin');
    }
    ifLogged();
  },[cookie,navigate]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/admin/login",
        { ...values },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          generateError(data.errors);
        } else {
          navigate("/admin");
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
        <div className="right">
          <form className="form_container" onSubmit={handleLogin}>
            <h1>Admin Login</h1>
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
              Login
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
