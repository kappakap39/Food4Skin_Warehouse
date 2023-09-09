import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../css/MenuNav.css";
import { Link } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import logo from "../assets/logo1.png";
import { useLocation } from "react-router-dom";

function MenuNav() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const handleLogout = () => {
    // ล้างข้อมูลใน sessionStorage เมื่อคลิก "ออกจากระบบ"
    sessionStorage.clear();
    // ส่งผู้ใช้กลับไปยังหน้าหลักหรือหน้าเข้าสู่ระบบ
    // ในกรณีนี้คือการใช้ Link ไปยังหน้าหลัก "/"
    // คุณอาจต้องเปลี่ยนเส้นทาง URL ตามความต้องการของคุณ
  };

  return (
    <form action="" className="">
      <Navbar expand="xg" className="nav">
        <Container>
          <Navbar.Brand href="/Salesperson" className="menunav">
            Food4Skin
          </Navbar.Brand>

          <div>
            {userLoginData && userLoginData.length > 0 ? (
              <Navbar.Brand className="navname">
                {userLoginData[0].fullname}
              </Navbar.Brand>
            ) : (
              <Navbar.Brand className="navname">Welcome</Navbar.Brand>
            )}
            <Navbar.Toggle className="menunav">
              <FcMenu />
            </Navbar.Toggle>
          </div>

          <Navbar.Offcanvas id="basic-navbar-nav " className="nav">
            <Nav className="justify-content-end d-flex">
              <img
                src={logo}
                alt=""
                style={{ height: "100px", width: "100px", marginLeft: "95px" }}
              />
              <h5
                style={{
                  textAlign: "center",
                  marginBottom: "50px",
                  marginTop: "10px",
                }}
              >
                Menu
              </h5>

              <Nav.Link href="/AboutMe" className="menunav">
                ข้อมูลส่วนตัว
                <hr />
              </Nav.Link>

              <Nav.Link href="/Salesperson" className="menunav">
                ข้อมูลพนักงานฝ่ายขาย
                <hr />
              </Nav.Link>

              <Nav.Link href="/" className="menunav" onClick={handleLogout}>
                ออกจากระบบ
                <hr />
              </Nav.Link>
            </Nav>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </form>
  );
}

export default MenuNav;
