import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

function EditUser() {
  const navigate=useNavigate();
  const [cookie,setCookie,removeCookie]=useCookies();
  useEffect(()=>{
    const ifLogged=()=>{
      if(!cookie.token){
        navigate('/adminlogin')
      }
    }
    ifLogged();
  },[cookie,navigate]);
  const { id } = useParams("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    _id:""
  });

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`http://localhost:3001/editUser?id=${id}`);
      setValues(data);
    };
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/updateUser",
        {
          ...values,
        },
        { withCredentials: true }
       );
       if(data.status){
        navigate('/admin');
        alert("User edited successfully")
       }

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
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
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
              value={values.email}
              readOnly
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <button type="submit" className="green_btn">
            Update
          </button>
        </form>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default EditUser;
