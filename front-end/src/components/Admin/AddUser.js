import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
function AddUser() {

  const navigate = useNavigate();
  const [cookie,setCookie,removeCookie]=useCookies();
  useEffect(()=>{
    const ifLogged=()=>{
      if(!cookie.token){
        navigate('/adminlogin')
      }
    }
    ifLogged();
  },[cookie,navigate]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    profileImage:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var formData=new FormData();
      formData.append('profileImage',values.profileImage);
      formData.append('name',values.name);
      formData.append('email',values.email);
      formData.append('password',values.password);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const { data } = await axios.post("http://localhost:3001/admin/adduser",formData,config,{ withCredentials: true });

      if (data) {
        if (data.errors) {
          console.log(data.errors);
          const { name, email, password } = data.errors;
          if (name) {
            generateError(name);
          } else if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          } else {
            navigate("/admin");
          }
        } else {
          navigate("/admin");
          alert("User added successfully");
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
    <Fragment>
      <Navbar />
      <div className="container">
        <form className="mt-5 formStyle" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              aria-describedby="emailHelp"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Profile image
            </label>
            <input
              type="file"
              className="form-control"
              name="profileImage"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.files[0]})}
              required
            />
          </div>
          <button type="submit" className="green_btn">
            Add User
          </button>
        </form>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default AddUser;
