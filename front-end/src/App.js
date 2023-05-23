import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import Home from "./components/User/home/home";
import Login from "./components/User/Login/Login";
import Signup from "./components/User/Signup/Signup";

import UserList from './components/Admin/UserList';
import AddUser from './components/Admin/AddUser';
import EditUser from './components/Admin/EditUser';
import AdminLogin from './components/Admin/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>}/>
        <Route path='/admin' element={<UserList/>}/>
        <Route path='/addUser' element={<AddUser/>}/>
        <Route path='/EditUser/:id' element={<EditUser/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
