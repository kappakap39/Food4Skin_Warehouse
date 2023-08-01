import React, { useEffect } from "react";
import "./AddSales.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Figure from "react-bootstrap/Figure";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";

import Validation from "../function/CreateSalesValidation.jsx";

function AddS() {
  const navigate = useNavigate();

  //add
  const [values, setValues] = useState({
    fullname: "",
    mail: "",
    password: "",
    sex: "",
    IDcard: "",
    districts: "",
    province: "",
    amphures: "",
    Address: "",
    Tel: "",
    Persistent_status: "",
    contact: "",
    picture: "",
    zipcode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2001/addsale", values)
      .then((res) => {
        console.log(res);
        navigate("/Salesperson");
      })
      .catch((err) => console.log(err));
  };

  //จังหวัดอำเภอตำบล
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/provinces/provinces")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChangeProvinces = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/provinces/provinces/${id}/amphures`)
      .then((res) => {
        setAmphures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeAmphures = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/provinces/amphures/${id}`)
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ดึงรหัสไปรษณีมาด้วย
  const onChangeDistricts = (e) => {
    // let index = e.nativeEvent.target.selectedIndex;
    // let label = e.nativeEvent.target[index].text;
    const filterDistrict = districts.filter((item) => {
      return e.target.value == item.id;
    });
    console.log(filterDistrict[0].name_th);
    console.log(filterDistrict[0].zip_code);

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].name_th,
      zipcode: filterDistrict[0].zip_code,
    });

    console.log(e.target.value);
  };

  return (
    <form className="containeradd" action="" onSubmit={handleSubmit}>
      <h3 className="h3add">ตารางเพิ่มรายชื่อพนักงานฝ่ายขาย</h3>
      <Row>
        <Col md={2}>
          <Form.Select
            aria-label="Default select example"
            name="sex"
            id="sex"
            type="text"
            onChange={(e) => setValues({ ...values, sex: e.target.value })}
          >
            <option>เพศ</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          {/* <InputGroup className="mb-3">
              <InputGroup.Text>บัตรประชาชน</InputGroup.Text>
              <Form.Control
                aria-label="บัตรประชาชน"
                type="text"
                name="IDcard"
                id="IDcard"
                onChange={(e) =>
                  setValues({ ...values, IDcard: e.target.value })
                }
              />
            </InputGroup> */}
        </Col>

        <Col md={5}>
          <InputGroup className="mb-3">
            <InputGroup.Text>จังหวัด</InputGroup.Text>
            <Form.Select
              aria-label="จังหวัด"
              type="text"
              name="province"
              id="province"
              onChange={(e) => onChangeProvinces(e)}
            >
              <option>จังหวัด</option>
              {provinces.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name_th}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text>บัตรประชาชน</InputGroup.Text>
            <Form.Control
              aria-label="บัตรประชาชน"
              type="text"
              name="IDcard"
              id="IDcard"
              onChange={(e) => setValues({ ...values, IDcard: e.target.value })}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>ชื่อ-นามสกุล</InputGroup.Text>
            <Form.Control
              aria-label="ชื่อ-นามสกุล"
              type="text"
              name="fullname"
              id="fullname"
              onChange={(e) =>
                setValues({ ...values, fullname: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>อีเมล</InputGroup.Text>
            <Form.Control
              aria-label="อีเมล"
              type="email"
              name="mail"
              id="email"
              onChange={(e) => setValues({ ...values, mail: e.target.value })}
            />
          </InputGroup>
        </Col>

        <Col md={5}>
          <InputGroup className="mb-3">
            <InputGroup.Text>อำเภอ</InputGroup.Text>
            <Form.Select
              aria-label="อำเภอ"
              type="text"
              name="amphures"
              id="amphures"
              onChange={(e) => onChangeAmphures(e)}
            >
              <option>อำเภอ</option>
              {amphures.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name_th}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>ตำบล</InputGroup.Text>
            <Form.Select
              aria-label="ตำบล"
              type="text"
              name="districts"
              id="districts"
              onChange={(e) => onChangeDistricts(e)}
            >
              <option>ตำบล</option>
              {districts.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name_th}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>รหัสไปรษณีย์</InputGroup.Text>
            <Form.Control
              aria-label="รหัสไปรษณีย์"
              type="text"
              name="zipcode"
              id="zipcode"
              value={values.zipcode}
              disabled
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              accept=" "
              id="picture"
              name="picture"
              onChange={(e) =>
                setValues({ ...values, picture: e.target.value })
              }
            />
          </InputGroup>
          <h6> *ภาพถ่ายพร้อมบัตรประชาชน</h6>
        </Col>
        <Col md={5}>
          <InputGroup className="mb-3">
            <InputGroup.Text>ที่อยู่เพิ่มเติม</InputGroup.Text>
            <Form.Control
              aria-label="ที่อยู่เพิ่มเติม"
              type="text"
              name="Address"
              id="Address"
              onChange={(e) =>
                setValues({ ...values, Address: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>เบอร์โทรศัพท์</InputGroup.Text>
            <Form.Control
              aria-label="เบอร์โทรศัพท์"
              type="text"
              name="Tel"
              id="Tel"
              onChange={(e) => setValues({ ...values, Tel: e.target.value })}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text htmlFor="inputPassword5">รหัสผ่าน</InputGroup.Text>
            <Form.Control
              type="password"
              name="password"
              id="password"
              aria-describedby="passwordHelpBlock"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
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
              onChange={(e) =>
                setValues({ ...values, contact: e.target.value })
              }
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <InputGroup className="mb-3">
            <InputGroup.Text htmlFor="inputPassword5">
              ยืนยันรหัสผ่าน
            </InputGroup.Text>
            <Form.Control
              name="password"
              id="password"
              type="password"
              aria-describedby="passwordHelpBlock"
            />
          </InputGroup>
        </Col>

        <Col md={5}>
          <Form.Select
            aria-label="Default select example"
            type="text"
            name="Persistent_status"
            id="Persistent_status"
            onChange={(e) =>
              setValues({ ...values, Persistent_status: e.target.value })
            }
          >
            <option>สถานะการทำงาน</option>
            <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
            <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
          </Form.Select>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <Col className="cancel" md={4}>
          <div></div>
        </Col>
        <Col className="button2" md={5}>
          <Row>
            <Col>
              <Link to="/Salesperson" className="backadd btn btn-danger ">
                {" "}
                ยกเลิก{" "}
              </Link>
            </Col>
            <Col>
              <button type="submit" className="bgsuccess">
                บันทึก
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
}

export default AddS;
