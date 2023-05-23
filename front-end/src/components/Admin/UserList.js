import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Navbar from "./Navbar";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies([]);

  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3001/deleteUser?id=${id}`
    );
    if (data.status) {
      navigate("/admin");
      alert("User deleted");
      removeCookie("jwt");
    }
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.token) {
        navigate("/adminlogin");
      } else {
        //const {data}=await axios.post('http://localhost:3001/admin/verifyAdmin',{},{withCredentials:true});
        // if(!data.status){
        //   removeCookie('admin');
        //   navigate('/adminlogin');
        // }else{
        //   navigate('/admin');
        // }
      }
    };
    verifyAdmin();
  }, [cookies, navigate]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:3001/getUsers");
      setUsers(data);
    };
    getUsers();
  });

  const handleEdit = async (id) => {
    const { data } = await axios.get(`http://localhost:3001/editUser?id=${id}`);
  };

  const handleLogout = () => {
    removeCookie("token");
    navigate("/adminlogin");
  };

  return (
    <Fragment>
      <Navbar />
        <div className="container mt-3">
          <div class="d-flex justify-content-between">
            <div div class="search-box mt-2">
              <input id="gfg" type="text" class="form-control" placeholder="Search&hellip;"/>
            </div>
            <div>
              <Link to="/addUser"><button className="green_btn ">Add user</button></Link>
            </div>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th>Profile</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((eachUser, index) => (
                <tr key={eachUser._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{eachUser.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3001/uploads/${eachUser.imgPath}`}
                      alt="profile"
                      width='100px'
                    />
                  </td>
                  <td>{eachUser.email}</td>
                  <td className="">
                    <Link to={`/EditUser/${eachUser._id}`}>
                      <button
                        className="btn btn-primary ms-3"
                        onClick={() => handleEdit(eachUser._id)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => handleDelete(eachUser._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </Fragment>
  );
}

export default UserList;
