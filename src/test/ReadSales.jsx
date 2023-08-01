import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./ReadSales.css";

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
import Modal from "../component/Modal";

function ReadSales() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //update

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:2001/datasale/" + ID_sales)
  //     .then((res) => setValues({
  //       ...values, fullname: res.data[0].name,
  //       Persistent_status: res.data[0].Persistent_status
  //     }))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="containerread">
      {Data.map((dt, index) => (
        <div key={index}>
          <h3 className="h3">ข้อมูลของ {dt.fullname}</h3>

          <Row>
            <Col md={5}>
              <Row md={5} className="liferow">
                <Col md={6}>
                  <ul className="list-group">
                    <li
                      className="list-group-item"
                      aria-label="รหัสพนักงานฝ่ายขาย"
                      placeholder="รหัสพนักงาน"
                      disabled
                    >
                      ID : SALES 0{dt.ID_sales}
                    </li>
                  </ul>
                  {/* <InputGroup className="mb-3">
                    <Form.Control
                    aria-label="รหัสพนักงานฝ่ายขาย"
                    placeholder="รหัสพนักงาน"
                    disabled
                     />
                    <InputGroup.Text type="text">
                      SALES 0{dt.ID_sales}
                    </InputGroup.Text>
                  </InputGroup> */}
                </Col>
                <Col md={6}>
                  <ul className="list-group">
                    <li
                      className="list-group-item"
                      aria-label="เพศ"
                      type="text"
                      name="sex"
                      id="sex"
                      // value={dt.sex}
                      disabled
                    >
                      เพศ : {dt.sex}
                    </li>
                  </ul>
                  {/* <InputGroup className="mb-3">
                    <InputGroup.Text>เพศ</InputGroup.Text>
                    <Form.Control
                      aria-label="เพศ"
                      type="text"
                      name="sex"
                      id="sex"
                      value={dt.sex}
                      disabled
                    />
                  </InputGroup> */}
                </Col>
              </Row>

              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="ชื่อ-นามสกุล"
                  type="text"
                  name="fullname"
                  id="fullname"
                  disabled
                  // value={dt.fullname}
                >
                  ชื่อ-นามสกุล : {dt.fullname}
                </li>

                <li
                  className="list-group-item"
                  aria-label="อีเมล"
                  type="email"
                  name="mail"
                  id="email"
                  disabled
                >
                  อีเมล : {dt.mail}
                </li>
                <li
                  className="list-group-item"
                  aria-label="บัตรประชาชน"
                  type="text"
                  name="IDcard"
                  id="IDcard"
                  disabled
                  // value={dt.fullname}
                >
                  บัตรประชาชน : {dt.IDcard}
                </li>
              </ul>

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>ชื่อ-นามสกุล</InputGroup.Text>
                <Form.Control
                  aria-label="ชื่อ-นามสกุล"
                  type="text"
                  name="fullname"
                  id="fullname"
                  disabled
                  value={dt.fullname}
                />
              </InputGroup> */}

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>อีเมล</InputGroup.Text>
                <Form.Control
                  aria-label="อีเมล"
                  type="email"
                  name="mail"
                  id="email"
                  disabled
                  value={dt.mail}
                />
              </InputGroup> */}
            </Col>

            <Col md={3}>
              <Row>
                <COl>
                </COl>
                <COl></COl>
              </Row>

              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="จังหวัด"
                  type="text"
                  name="province"
                  id="province"
                  disabled
                  // value={dt.fullname}
                >
                  จังหวัด : {dt.province}
                </li>

                <li
                  className="list-group-item"
                  aria-label="อำเภอ"
                  type="text"
                  name="district"
                  id="district"
                  disabled
                >
                  อำเภอ : {dt.amphures}
                </li>

                <li
                  className="list-group-item"
                  aria-label="ตำบล"
                  type="text"
                  name=""
                  id=""
                  // value={dt.districts}
                  disabled
                >
                  ตำบล : {dt.districts}
                </li>
              </ul>
              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="รหัสพนักงานฝ่ายขาย"
                  placeholder="รหัสพนักงาน"
                  disabled
                >
                  รหัสไปรษณีย์ : {dt.zipcode}
                </li>
              </ul>

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>บัตรประชาชน</InputGroup.Text>
                <Form.Control
                  aria-label="บัตรประชาชน"
                  type="text"
                  name="IDcard"
                  id="IDcard"
                  disabled
                  value={dt.IDcard}
                />
              </InputGroup> */}

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>จังหวัด</InputGroup.Text>
                <Form.Control
                  aria-label="จังหวัด"
                  type="text"
                  name="province"
                  id="province"
                  disabled
                  value={dt.province}
                />
              </InputGroup> */}

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>อำเภอ</InputGroup.Text>
                <Form.Control
                  aria-label="อำเภอ"
                  type="text"
                  name="district"
                  id="district"
                  disabled
                  value={dt.amphures}
                />
              </InputGroup> */}

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>ตำบล</InputGroup.Text>
                <Form.Control
                  aria-label="ตำบล"
                  type="text"
                  name=""
                  id=""
                  value={dt.districts}
                  disabled
                />
              </InputGroup> */}
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
              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="เบอร์โทรศัพท์"
                  type="text"
                  name="Tel"
                  id="Tel"
                  disabled
                >
                  เบอร์โทรศัพท์ : {dt.Tel}
                </li>
              </ul>
              {/* <InputGroup className="mb-3">
                <InputGroup.Text>เบอร์โทรศัพท์</InputGroup.Text>
                <Form.Control
                  aria-label="เบอร์โทรศัพท์"
                  type="text"
                  name="Tel"
                  id="Tel"
                  disabled
                  value={dt.Tel}
                />
              </InputGroup> */}
            </Col>
            <Col md={5}>
              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="ที่อยู่เพิ่มเติม"
                  type="text"
                  name="Address"
                  id="Address"
                  disabled
                >
                  ที่อยู่เพิ่มเติม : {dt.Address}
                </li>
              </ul>
              {/* <InputGroup className="mb-3">
                <InputGroup.Text>ที่อยู่เพิ่มเติม</InputGroup.Text>
                <Form.Control
                  aria-label="ที่อยู่เพิ่มเติม"
                  type="text"
                  name="Address"
                  id="Address"
                  disabled
                  value={dt.Address}
                />
              </InputGroup> */}
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <ul className="list-group">
                <li
                  className="list-group-item"
                  type="password"
                  name="password"
                  id="password"
                  aria-describedby="passwordHelpBlock"
                  disabled
                >
                  รหัสผ่าน : {dt.password}
                </li>
              </ul>
              {/* <InputGroup className="mb-3">
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
              </InputGroup> */}
            </Col>
            <Col md={5}>
              <ul className="list-group">
                <li
                  className="list-group-item"
                  aria-label="ช่องทางติดต่อออนไลน์"
                  type="text"
                  name="contact"
                  id="contact"
                  disabled
                >
                  ช่องทางติดต่อออนไลน์ : {dt.contact}
                </li>
              </ul>

              {/* <InputGroup className="mb-3">
                <InputGroup.Text>ช่องทางติดต่อออนไลน์</InputGroup.Text>
                <Form.Control
                  aria-label="ช่องทางติดต่อออนไลน์"
                  type="text"
                  name="contact"
                  id="contact"
                  disabled
                  value={dt.contact}
                />
              </InputGroup> */}
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <ul className="list-group">
                <li
                  className="list-group-item"
                  type="password"
                  name="password"
                  id="password"
                  aria-describedby="passwordHelpBlock"
                  disabled
                >
                  ยืนยันรหัสผ่าน : {dt.password}
                </li>
              </ul>
              {/* <InputGroup className="mb-3">
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
              </InputGroup> */}
            </Col>
            <Col md={3}>
              {/* <Editsales /> */}

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

              {/* <ul className="list-group">
                <li className="list-group-item">สถานะ : {dt.Persistent_status}</li>
              </ul> */}
            </Col>
            <Col md={2}>
              <button className="bgedit">edit</button>
              {/* <div className="AppModal">
                <Link className="bgedit" onClick={handleOpenModal}>
                  แก้ไข
                </Link>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <h3>แก้ไขสถานะการทำงาน</h3>
                  <Form.Select
                    aria-label="Default select example"
                    className="bgstatus"
                    type="text"
                    name="Persistent_status"
                    id="Persistent_status"

                    //   disabled
                  >
                    <option >{dt.Persistent_status}</option>
                    <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                    <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                  </Form.Select>
                  <div className="bgedit2">
                    <button type="submit" className="bgeditModal">แก้ไข</button>
                  </div>
                </Modal>
              </div> */}
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
            <Col className="button2" md={5}></Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default ReadSales;
