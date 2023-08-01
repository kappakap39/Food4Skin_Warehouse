import React, { useEffect } from "react";
import "../css/Addsales.css";

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
import MenuNav from "./MenuNav";
function AddSales() {
  const navigate = useNavigate();

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
    AddressSale: "",
    Tel: "",
    Persistent_status: "",
    contact: "",
    picture: "",
    zipcode: "",
  });

  // post("http://localhost:2001/addsale", values)
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    const formattedPhone = values.Tel.replace(/-/g, "");

    const err = Validation({ ...values, Tel: formattedPhone });
    setErrors(err);

    if (
      err.fullname === "" &&
      err.mail === "" &&
      err.password === "" &&
      err.sex === "" &&
      err.IDcard === "" &&
      err.AddressSale === "" &&
      err.Tel === "" &&
      err.Persistent_status === "" &&
      err.picture === "" &&
      err.zipcode === "" &&
      err.contact === ""

      //*
      // err.provinces === "" &&
      // err.amphures === "" &&
      // err.districts === ""
    ) {
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
      axios
        .post("http://localhost:2001/addsale", {
          ...values,
          Tel: formattedPhone,
        })
        .then((res) => {
          console.log(res);
          navigate("/Salesperson");
        })
        .catch((err) => console.log(err));
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "IDcard") {
      const formattedCardID = value.replace(/-/g, "");
      const formattedText1 = formattedCardID
        .replace(/\D/g, "")
        .slice(0, 13)
        .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

      setCradID(formattedText1);
      setValues((prev) => ({ ...prev, [name]: formattedText1 }));
    }
    if (name === "Tel") {
      const formattedPhoneNumber = value.replace(/-/g, "");
      const formattedText = formattedPhoneNumber.replace(/\D/g, "");

      // ตรวจสอบเงื่อนไขเพื่อให้ตัวเลขในเบอร์โทรศัพท์เป็นเฉพาะตัวเลขและตัดจำนวนให้เหลือเพียง 10 หรือ 9 ตัว
      let formattedPhoneNumberFinal;
      if (formattedText.length === 9) {
        formattedPhoneNumberFinal = formattedText.replace(
          /(\d{2})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
      } else {
        formattedPhoneNumberFinal = formattedText
          .slice(0, 10)
          .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }

      setPhoneNumber(formattedPhoneNumberFinal);
      setValues((prev) => ({ ...prev, [name]: formattedPhoneNumberFinal }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log(values);

  return (
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      <form className="containeradd" action="" onSubmit={handleSubmit}>
        <h3 className="h3add">ตารางเพิ่มรายชื่อพนักงานฝ่ายขาย</h3>
        <Row>
          <Col md={5}>
            <Row>
              <Col md={4}>
                <h6 className="txt">
                  <h6>*</h6>เพศ
                </h6>
                <Form.Select
                  aria-label="Default select example"
                  name="sex"
                  id="sex"
                  type="text"
                  onChange={handleInput}
                  // onChange={(e) =>
                  //   setValues({ ...values, sex: e.target.value })
                  // }
                >
                  <option>เพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </Form.Select>
                {errors.sex && (
                  <span className="text-danger">{errors.sex}</span>
                )}
              </Col>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>บัตรประชาชน
                </h6>
                {/* <h6 className="txt">*บัตรประชาชน</h6> */}
                <div className="fromadd">
                  <InputGroup>
                    {/* <InputGroup.Text>บัตรประชาชน</InputGroup.Text> */}
                    <Form.Control
                      aria-label="บัตรประชาชน"
                      type="text"
                      name="IDcard"
                      id="IDcard"
                      onChange={handleInput}
                      // onChange={(e) =>
                      //   setValues({ ...values, IDcard: e.target.value })
                      // }
                    />
                  </InputGroup>
                  {errors.IDcard && (
                    <span className="text-danger">{errors.IDcard}</span>
                  )}
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={5}>
            <Row>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>จังหวัด
                </h6>
                {/* <h6 className="txt">*จังหวัด</h6> */}
                <InputGroup className="mb-3">
                  {/* <InputGroup.Text>จังหวัด</InputGroup.Text> */}
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
              <Col>
                <h6 className="txt">
                  <h6>*</h6>อำเภอ
                </h6>
                <InputGroup className="mb-3">
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
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ชื่อ-นามสกุล
              </h6>
              <Col md={8}>
                <InputGroup className="mb-3">
                  {/* <InputGroup.Text>ชื่อ-นามสกุล</InputGroup.Text> */}
                  <Form.Control
                    aria-label="ชื่อ-นามสกุล"
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={handleInput}
                    // onChange={(e) =>
                    //   setValues({ ...values, fullname: e.target.value })
                    // }
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.fullname && (
                  <span className="text-danger">{errors.fullname}</span>
                )}
              </Col>
            </Row>

            <Row>
              <h6 className="txt">
                <h6>*</h6>อีเมล
              </h6>
              <Col md={8}>
                <InputGroup className="mb-3">
                  {/* <InputGroup.Text>อีเมล</InputGroup.Text> */}
                  <Form.Control
                    aria-label="อีเมล"
                    type="email"
                    name="mail"
                    id="email"
                    // onChange={(e) => setValues({ ...values, mail: e.target.value })}
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.mail && (
                  <span className="text-danger">{errors.mail}</span>
                )}
              </Col>
            </Row>

            {/* <h6 className="txt">*อีเมล</h6> */}
          </Col>

          <Col md={5}>
            <Row>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>ตำบล
                </h6>
                {/* <h6 className="txt">*ตำบล</h6> */}
                <InputGroup className="mb-3">
                  {/* <InputGroup.Text>ตำบล</InputGroup.Text> */}
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
                {/* {errors.districts && (
                  <span className="text-danger">{errors.districts}</span>
                )} */}
              </Col>
              <Col>
                <h6 className="txt">
                รหัสไปรษณีย์
                  <h6></h6>{errors.zipcode && (
                  <span className="text-danger">{errors.zipcode}</span>
                )}
                </h6>
                
                <input
                  name="zipcode"
                  className="Inputadd"
                  id="contact"
                  type="text"
                  disabled
                  value={values.zipcode}
                  onChange={handleInput}
                />
              </Col>
            </Row>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ที่อยู่เพิ่มเติม
              </h6>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="ที่อยู่เพิ่มเติม"
                    type="text"
                    name="AddressSale"
                    id="AddressSale"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.AddressSale && (
                  <span className="text-danger">{errors.AddressSale}</span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ภาพถ่ายพร้อมบัตรประชาชน
              </h6>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="file"
                    accept=" "
                    id="picture"
                    name="picture"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.picture && (
                  <span className="text-danger">{errors.picture}</span>
                )}
              </Col>
            </Row>

            {/* <h6 className="txt">ภาพถ่ายพร้อมบัตรประชาชน</h6> */}
            {/* <h6>*ภาพถ่ายพร้อมบัตรประชาชน</h6> */}

            {/* <h6 className="txt">*ภาพถ่ายพร้อมบัตรประชาชน</h6> */}
          </Col>
          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>เบอร์โทรศัพท์
            </h6>
            <Row>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="เบอร์โทรศัพท์"
                    type="text"
                    name="Tel"
                    id="Tel"
                    maxLength={12}
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.Tel && (
                  <span className="text-danger">{errors.Tel}</span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>รหัสผ่าน
            </h6>
            <Row>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </Col>
            </Row>
          </Col>

          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>ช่องทางติดต่อ
            </h6>
            <Row>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="ช่องทางติดต่อออนไลน์"
                    type="text"
                    name="contact"
                    id="contact"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.contact && (
                  <span className="text-danger">{errors.contact}</span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>ยืนยันรหัสผ่าน
            </h6>
            <Row>
              <Col md={8}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="password"
                    aria-describedby="passwordHelpBlock"
                  />
                </InputGroup>
              </Col>
              <Col>
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </Col>
            </Row>
          </Col>

          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>สถานะ
            </h6>
            <Row>
              <Col md={8}>
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  name="Persistent_status"
                  id="Persistent_status"
                  onChange={handleInput}
                >
                  <option>สถานะการทำงาน</option>
                  <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                  <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
                </Form.Select>
              </Col>
              <Col>
                {errors.Persistent_status && (
                  <span className="text-danger">
                    {errors.Persistent_status}
                  </span>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "5px" }}>
          <Col className="cancel" md={5}>
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
    </div>
  );
}

export default AddSales;
