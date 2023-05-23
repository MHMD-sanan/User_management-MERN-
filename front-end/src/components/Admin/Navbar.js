/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCookies} from 'react-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
function Navbar() {
  const [cookies,setCookies,removeCookie]=useCookies([]);
  const navigate=useNavigate();
  const handleLogout=()=>{
    removeCookie("token");
    navigate('/adminlogin');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
          <NavLink to={'/admin'}>
            <button className="btn btn-outline-success">Home</button>
          </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" ></a>
            </li> */}
          </ul>
          {/* <form className="d-flex" role="search"> */}
            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
            <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
          {/* </form> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar