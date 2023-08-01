import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import '../css/MenuNav.css';
import { Link } from "react-router-dom";

import {FcMenu} from "react-icons/fc";
import logo from "../assets/logo1.png";
function MenuNav() {
  // const navigate = useNavigate();
  return (
    <form action="" className="">

      <Navbar expand="xg" className="nav">
        <Container>
          
          <Navbar.Brand href="/Salesperson" className="menunav">
          {/* <img src={logo} alt="" style={{height: "50px"}} /> */}
            Food4Skin
          </Navbar.Brand>
          

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="menunav" /> */}
          <div>
          <Navbar.Brand className="navname">
            นาย ภูวดลย์ เหล่าธง
          </Navbar.Brand>
          <Navbar.Toggle className="menunav"><FcMenu/></Navbar.Toggle>
          </div>
          

          <Navbar.Offcanvas id="basic-navbar-nav " className="nav">
            <Nav className="justify-content-end d-flex">

              <img src={logo} alt="" style={{height: "100px", width:"100px",marginLeft:"95px"}} />
              <h5 style={{textAlign:"center",marginBottom:"50px",marginTop:"10px"}}>Menu</h5>
              
              {/* <img src="../assets/logo1.png" class="img" alt=""></img> */}
             {/* <h2>Menu</h2> */}
              {/* <hr/> */}
              
              <Nav.Link href="/AboutMe" className="menunav">
                ข้อมูลส่วนตัว<hr />
              </Nav.Link>
              
              <Nav.Link href="/Salesperson" className="menunav">
                ข้อมูลพนักงานฝ่ายขาย<hr />
              </Nav.Link>
              
              <Nav.Link href="/" className="menunav">
                ออกจากระบบ<hr />
              </Nav.Link>
              
            </Nav>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    </form>
  );
}

export default MenuNav;
