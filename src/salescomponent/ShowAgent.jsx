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

import img from "../assets/002.png";
import MenuNavSales from "./MenuNavSales";

function ShowAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  //!read
  useEffect(() => {
    axios
      .get("http://localhost:2001/getAgent/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          level: res.data[0].level,
          fullname: res.data[0].fullname,
          districts: res.data[0].districts,
          email: res.data[0].email,
          sex: res.data[0].sex,
          IDcard: res.data[0].IDcard,
          province: res.data[0].province,
          subdistricts: res.data[0].subdistricts,
          Address: res.data[0].Address,
          Tel: res.data[0].Tel,
          contact: res.data[0].contact,
          picture: res.data[0].picture,
          zip_code: res.data[0].zip_code,
          ID_agent: res.data[0].ID_agent,
          ID_sales: res.data[0].ID_sales,
          PhoneNumber: res.data[0].PhoneNumber,
          Card_ID: res.data[0].Card_ID,
          Sales_Fullname: res.data[0].Sales_Fullname,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const [values, setValues] = useState({
    level: "",
    fullname: "",
    districts: "",
    email: "",
    sex: "",
    IDcard: "",
    province: "",
    subdistricts: "",
    Address: "",
    Tel: "",
    contact: "",
    picture: "",
    zip_code: "",
    ID_agent: "",
  });

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containerread">
        <h3 className="h3Editsale">ข้อมูลของ {values.fullname}</h3>

        <Row>
          <Col md={4}>
            <Row className="liferow">
              <Col md={4}>
                <h6 className="txt">รหัสพนักงาน</h6>
                <input
                  name="text"
                  className="InputID"
                  id="ID_sales"
                  type="text"
                  disabled
                  value={values.ID_agent}
                />
              </Col>
              <Col md={8}>
                <h6 className="txt">เพศ</h6>
                <input
                  name="text"
                  className="InputSex"
                  id="Sex"
                  type="text"
                  disabled
                  value={values.sex}
                />
              </Col>
            </Row>

            <h6 className="txt">เลขบัตรประชาชน</h6>
            <input
              name="text"
              className="Input2"
              id="IDcard"
              type="text"
              disabled
              value={values.Card_ID}
            />

            <h6 className="txt">ชื่อ-นามสกุล</h6>
            <input
              name="text"
              className="Input2"
              id="fullname"
              type="text"
              disabled
              // value={values.fullname}
              value={values.fullname}
            />

            <h6 className="txt">อีเมล</h6>
            <input
              name="text"
              className="Input2"
              id="email"
              type="text"
              disabled
              value={values.email}
            />

            <h6 className="txt">พนักงานที่เพิ่มตัวแทน</h6>
            <input
              name="Sales_Fullname"
              className="Input2"
              id="Sales_Fullname"
              type="text"
              disabled
              value={values.Sales_Fullname}
            />
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
                  disabled
                  value={values.province}
                />
                <h6 className="txt">ตำบล</h6>
                <input
                  name="text"
                  className="Input3"
                  id="subdistricts"
                  type="text"
                  disabled
                  value={values.subdistricts}
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
                  value={values.districts}
                />
                <h6 className="txt">รหัสไปรษณีย์</h6>
                <input
                  name="text"
                  className="Input3"
                  id="zipcode"
                  type="text"
                  disabled
                  value={values.zip_code}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <Link
                style={{ alignItems: "end", marginTop: "26px" }}
                className="bgedit btn"
                onClick={handleOpenModal}
              >
                แก้ไข
              </Link> */}
                <h6 className="txt">เบอร์โทรศัพท์</h6>
                <input
                  name="text"
                  className="Input3"
                  id="Tel"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  value={values.PhoneNumber}
                />
              </Col>
              <Col>
                <h6 className="txt">ระดับขั้นตัวแทนจำหน่าย</h6>
                <input
                  name="level"
                  className="Input3"
                  id="level"
                  type="text"
                  disabled
                  value={values.level}
                />
              </Col>
            </Row>
            <h6 className="txt">ช่องทางติดต่อ</h6>
            <input
              name="text"
              className="Input"
              id="contact"
              type="text"
              disabled
              value={values.contact}
            />
            <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
            <textarea
              name="Address"
              className="textarea"
              id="Address"
              type="text"
              aria-describedby="passwordHelpBlock"
              disabled
              value={values.Address}
            />
          </Col>
          <Col md={2}>
            {/* {values.picture && ( // เช็คว่ามี URL ของรูปภาพหรือไม่
              <div>
                <img
                  src={values.picture} // ใช้ URL ของรูปภาพจาก state values.picture
                  // alt={values.picture}
                  alt={"ไม่สามารถแสดงภาพได้"}
                  style={{ marginLeft: "20%", marginTop: "30px" }}
                />
              </div>
            )} */}
            <img
              style={{ marginLeft: "20%", marginTop: "30px" }}
              src={img}
              // src={`data:image/jpeg;base64,${values.picture}`}
              className="img"
              alt="ภาพ"
            ></img>
          </Col>
          {/* <Col md={2}>
            <img
              style={{ marginLeft: "20%", marginTop: "30px" }}
              src={img}
              className="img"
              alt="ภาพ"
            ></img>
            <input
              type="text"
              value={values.picture}
              style={{ marginLeft: "46px", width: "201px" }}
              // readOnly
              disabled
            />
          </Col> */}
        </Row>

        <Row style={{ marginTop: "20px", marginBottom: "40px" }}>
          <Col className="cancel" md={5}>
            <Link to="/TableAgent" className="back btn btn-danger">
              {" "}
              กลับ{" "}
            </Link>
          </Col>
          <Col className="button2" md={6}>
            <button
              className="bgedit btn"
              onClick={() => navigate(`/EditAgent/${values.ID_agent}`)}
            >
              แก้ไข
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default ShowAgent;
