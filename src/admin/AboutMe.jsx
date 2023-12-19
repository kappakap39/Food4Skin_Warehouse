import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../css/EditSales.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Figure from "react-bootstrap/Figure";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";

import { useParams } from "react-router-dom";
import Modal from "./Modal";

// import img from "../assets/002.png";
// import imgpr from "../../../../Backend/ImgUP/Fw0X_JBiI.jpg";
import MenuNav from "./MenuNav";
import { useLocation } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
function AboutMe() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  console.log(userLoginData)
  //showpassword
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      <form className="containerread" onSubmit={""}>
        <h3 className="h3Editsale">
          ข้อมูลส่วนตัวของ {userLoginData[0].fullname}
        </h3>

        <Row>
          <Col md={4}>
            <Row className="liferow">
              <Col md={4}>
                <h6 className="txt">รหัสพนักงาน</h6>
                <input
                  name="text"
                  className="InputID"
                  id=""
                  type="text"
                  value={userLoginData[0].ID_admin}
                  disabled
                  // value={values.ID_sales}
                />
              </Col>
              <Col md={8}>
                <h6 className="txt">เพศ</h6>
                <input
                  name="text"
                  className="InputSex"
                  id="Sex"
                  type="text"
                  value={userLoginData[0].sex}
                  disabled
                  // value={values.sex}
                />
              </Col>
            </Row>

            <h6 className="txt">เลขบัตรประชาชน</h6>
            <input
              name="text"
              className="Input2"
              id="Card_ID"
              type="text"
              value={userLoginData[0].Card_ID}
              disabled
              // value={values.Card_ID}
            />

            <h6 className="txt">ชื่อ-นามสกุล</h6>
            <input
              name="text"
              className="Input2"
              id="fullname"
              type="text"
              value={userLoginData[0].fullname}
              disabled
              // value={values.fullname}
            />

            <h6 className="txt">อีเมล</h6>
            <input
              name="text"
              className="Input2"
              id="email"
              type="text"
              value={userLoginData[0].email}
              disabled
              // value={values.email}
            />

            <h6 className="txt">รหัสผ่าน</h6>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                name="password"
                className="Input2"
                id="password"
                placeholder="Password"
                aria-label="Password"
                type={showPassword ? "text" : "password"}
                aria-describedby="passwordHelpBlock"
                value={userLoginData[0].password}
                disabled
              />
              <div
                onClick={togglePasswordVisibility}
                className="IconPassword2"
                style={{
                  position: "absolute",
                  right: 50,
                  top: "-5%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </Col>

          <Col md={4}>
            <Row>
              <Col>
                <Row></Row>
                <h6 className="txt">จังหวัด</h6>
                <input
                  name="text"
                  className="Input3"
                  id="province"
                  type="text"
                  value={userLoginData[0].province}
                  disabled
                  // value={values.province}
                />
                <h6 className="txt">ตำบล</h6>
                <input
                  name="text"
                  className="Input3"
                  id="subdistricts"
                  type="text"
                  disabled
                  value={userLoginData[0].subdistricts}
                />
              </Col>
              <Col>
                <h6 className="txt">อำเภอ</h6>
                <input
                  name="text"
                  className="Input3"
                  id="districts"
                  type="text"
                  disabled
                  value={userLoginData[0].districts}
                />
                <h6 className="txt">รหัสไปรษณีย์</h6>
                <input
                  name="text"
                  className="Input3"
                  id="zip_code"
                  type="text"
                  disabled
                  value={userLoginData[0].zip_code}
                />
              </Col>
            </Row>
            <h6 className="txt">เบอร์โทรศัพท์</h6>
            <input
              name="text"
              className="Input"
              id="Tel"
              type="text"
              aria-describedby="passwordHelpBlock"
              disabled
              value={userLoginData[0].PhoneNumber}
            />

            <h6 className="txt">ช่องทางติดต่อ</h6>
            <input
              name="text"
              className="Input"
              id="contact"
              type="text"
              disabled
              value={userLoginData[0].contact}
            />

            <Row>
              <Col>
                {/* <Link
                style={{ alignItems: "end", marginTop: "26px" }}
                className="bgedit btn"
                onClick={handleOpenModal}
              >
                แก้ไข
              </Link> */}
                <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
                <textarea
                  name="text"
                  className="textareaeditshow"
                  id="AddressSale"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  value={userLoginData[0].Address}
                />
              </Col>
              <Col>
                {/* <h6 className="txt">สถานะ</h6>
                <input
                  name="text"
                  className="Input3"
                  id="Persistent_status"
                  type="text"
                  disabled
                /> */}
              </Col>
            </Row>

            {/* <div className="AppModal">
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h3>แก้ไขสถานะ</h3>
                <Form.Select
                  aria-label="Default select example"
                  className="bgstatus"
                  type="text"
                  name="Persistent_status"
                  id="Persistent_status"
                  value={values.Persistent_status}
                  onChange={(e) =>
                    setValues({ ...values, Persistent_status: e.target.value })
                  }
                >
                  <option
                    onChange={(e) =>
                      setValues({
                        ...values,
                        Persistent_status: e.target.value,
                      })
                    }
                  >
                    {values.Persistent_status}
                  </option>
                  <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                  <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                </Form.Select>
                <div className="bgedit2">
                  <button type="submit" className="bgeditModal">
                    แก้ไข
                  </button>
                </div>
              </Modal>
            </div> */}
          </Col>
          <Col md={2}>
            <img
              style={{ marginLeft: "20%", marginTop: "30px" }}
              src={userLoginData[0].picture}
              // src={`data:image/jpeg;base64,${values.picture}`}
              className="img"
              alt="ภาพ"
            ></img>

            {/* <div>
              {values.picture && (
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={`data:image/jpeg;base64,${values.picture}`}
                  alt="ภาพ"
                />
              )}
            </div> */}
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col className="cancel" md={5}></Col>
          <Col className="button2" md={6}>
            <Row style={{ marginRight: "25px" }}>
              <Col>
                {/* <Link to="/Salesperson" className="back btn btn-danger">
                  {" "}
                  กลับ{" "}
                </Link> */}
              </Col>
              <Col>
                <button
                  className="bgedit btn"
                  // to="/EditMe"
                  onClick={() =>
                    navigate(`/EditMe/${userLoginData[0].ID_admin}`)
                  }
                >
                  แก้ไข
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default AboutMe;
