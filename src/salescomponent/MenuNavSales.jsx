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
function MenuNavSales() {
  // const navigate = useNavigate();
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  console.log("NAV", userLoginData);
  return (
    <form action="" className="">

      <Navbar expand="xg" className="nav">
        <Container>
          
          <Navbar.Brand href="/Product" className="menunav">
          {/* <img src={logo} alt="" style={{height: "50px"}} /> */}
            Food4Skin
          </Navbar.Brand>
          

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="menunav" /> */}
          <div>
          {userLoginData && userLoginData.length > 0 ? (
              <Navbar.Brand className="navname">
                {userLoginData[0].fullname}
              </Navbar.Brand>
            ) : (
              <Navbar.Brand className="navname">Welcome</Navbar.Brand>
            )}
          <Navbar.Toggle className="menunav"><FcMenu/></Navbar.Toggle>
          </div>
          

          <Navbar.Offcanvas id="basic-navbar-nav " className="nav">
            <Nav className="justify-content-end d-flex">

              <img src={logo} alt="" style={{height: "100px", width:"100px",marginLeft:"95px"}} />
              <h5 style={{textAlign:"center",marginBottom:"20px",marginTop:"10px"}}>Menu</h5>
              
              
              <Nav.Link href="" className="menunavSales">
                ข้อมูลส่วนตัว<hr />
              </Nav.Link>
              
              <Nav.Link href="" className="menunavSales">
                ข้อมูลตัวแทนจำหน่าย<hr />
              </Nav.Link>

              <Nav.Link href="" className="menunavSales">
                จัดการข้อมูลสินค้า<hr />
              </Nav.Link>

              <Nav.Link href="" className="menunavSales">
                ตรวจสอบสินค้าหมดอายุ<hr />
              </Nav.Link>

              <Nav.Link href="" className="menunavSales">
                รายงานรายการเบิก<hr />
              </Nav.Link>

              <Nav.Link href="" className="menunavSales">
                รายงานรายการรับเข้า<hr />
              </Nav.Link>
              
              <Nav.Link href="/" className="menunavSales">
                ออกจากระบบ<hr />
              </Nav.Link>
              
            </Nav>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    </form>
  );
}

export default MenuNavSales;
