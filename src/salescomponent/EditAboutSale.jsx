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

function EditAboutSale() {
  const { ID_sales } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/datasale/" + ID_sales)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(Data);

  return (
    <div className="containerread">
      {Data.map((dt, index) => (
        <div key={index}>
          <h3 className="h3">ข้อมูลของ {dt.fullname}</h3>

          <Row>
            <Col md={5}>
              <Row md={5} className="liferow">
                <Col md={6}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="รหัสพนักงานฝ่ายขาย"
                      placeholder="รหัสพนักงาน"
                      disabled
                    />
                    <InputGroup.Text type="text">
                      {dt.ID_sales}
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>เพศ</InputGroup.Text>
                    <Form.Control
                      aria-label="เพศ"
                      type="text"
                      name="sex"
                      id="sex"
                      value={dt.sex}
                      disabled
                    />
                  </InputGroup>
                </Col>
              </Row>

              <InputGroup className="mb-3">
                <InputGroup.Text>ชื่อ-นามสกุล</InputGroup.Text>
                <Form.Control
                  aria-label="ชื่อ-นามสกุล"
                  type="text"
                  name="fullname"
                  id="fullname"
                  disabled
                  value={dt.fullname}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>อีเมล</InputGroup.Text>
                <Form.Control
                  aria-label="อีเมล"
                  type="email"
                  name="mail"
                  id="email"
                  disabled
                  value={dt.mail}
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <InputGroup className="mb-3">
                <InputGroup.Text>บัตรประชาชน</InputGroup.Text>
                <Form.Control
                  aria-label="บัตรประชาชน"
                  type="text"
                  name="IDcard"
                  id="IDcard"
                  disabled
                  value={dt.IDcard}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>จังหวัด</InputGroup.Text>
                <Form.Control
                  aria-label="จังหวัด"
                  type="text"
                  name="province"
                  id="province"
                  disabled
                  value={dt.province}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>อำเภอ</InputGroup.Text>
                <Form.Control
                  aria-label="อำเภอ"
                  type="text"
                  name="district"
                  id="district"
                  disabled
                  value={dt.districts}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>ตำบล</InputGroup.Text>
                <Form.Control
                  aria-label="ตำบล"
                  type="text"
                  name="subdistricts"
                  id="subdistricts"
                  value={dt.subdistricts}
                  disabled
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              {/* <img src="../assets/logo1.png" class="img" alt=""></img> */}
              {/* <Form.Control
              type="file"
              accept=" "
              id="picture"
              name="picture"
              value={""}
            /> */}
            </Col>
          </Row>

          <Row>
            <Col md={5}></Col>
            <Col md={3}></Col>
            <Col md={2}></Col>
          </Row>

          <Row>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text>เบอร์โทรศัพท์</InputGroup.Text>
                <Form.Control
                  aria-label="เบอร์โทรศัพท์"
                  type="text"
                  name="Tel"
                  id="Tel"
                  disabled
                  value={dt.Tel}
                />
              </InputGroup>
            </Col>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text>ที่อยู่เพิ่มเติม</InputGroup.Text>
                <Form.Control
                  aria-label="ที่อยู่เพิ่มเติม"
                  type="text"
                  name="Address"
                  id="Address"
                  disabled
                  value={dt.Address}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text htmlFor="inputPassword5">
                  รหัสผ่าน
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  value={dt.password}
                />
              </InputGroup>
            </Col>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text>ช่องทางติดต่อออนไลน์</InputGroup.Text>
                <Form.Control
                  aria-label="ช่องทางติดต่อออนไลน์"
                  type="text"
                  name="contact"
                  id="contact"
                  disabled
                  value={dt.contact}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text htmlFor="inputPassword5">
                  ยืนยันรหัสผ่าน
                </InputGroup.Text>
                <Form.Control
                  name="password"
                  id="password"
                  type="password"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  value={dt.password}
                />
              </InputGroup>
            </Col>
            <Col md={5}>
              <Form.Select
                aria-label="Default select example"
                className="bgstatus"
                type="text"
                name="Persistent_status"
                id="Persistent_status"

                //   disabled
              >
                <option>{dt.Persistent_status}</option>
                <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col className="cancel" md={5}>
              <div>
                <Link to="/Salesperson" className="back btn btn-danger">
                  {" "}
                  กลับ{" "}
                </Link>
              </div>
            </Col>
            <Col className="button2" md={5}>
              <div className="bgedit2">
                <button className="bgeditsale">แก้ไข</button>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default EditAboutSale;
