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

// import ValidationAddAgent from "../function/CrealeAgent.jsx";
import MenuNavSales from "./MenuNavSales";
import FormText from "react-bootstrap/esm/FormText";

function AddAgent() {
  const navigate = useNavigate();
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  //จังหวัดอำเภอตำบล
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  useEffect(() => {
    //ดึงข้อมูลจังหวัด
    axios
      .get("http://localhost:2001/provinces/provinces")
      .then((res) => {
        setProvince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeProvince = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/provinces/provinces/${id}/districts`)
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeDistricts = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/provinces/districts/${id}`)
      .then((res) => {
        setSubdistricts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeSubdistricts = (e) => {
    // let index = e.nativeEvent.target.selectedIndex;
    // let label = e.nativeEvent.target[index].text;
    const filterDistrict = subdistricts.filter((item) => {
      return e.target.value == item.id;
    });
    console.log(filterDistrict[0].name_in_thai);
    console.log(filterDistrict[0].zip_code);

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].name_in_thai,
      zip_code: filterDistrict[0].zip_code,
    });
    console.log(e.target.value);
  };

  //add
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    sex: "",
    IDcard: "",
    districts: "",
    province: "",
    subdistricts: "",
    Address: "",
    Tel: "",
    level: "",
    contact: "",
    picture: "",
    zip_code: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
  });

  // post("http://localhost:2001/addagent", values)
  //   const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    const formattedPhone = values.Tel.replace(/-/g, "");
    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
    axios
      .post("http://localhost:2001/addagent", {
        ...values,
        Tel: formattedPhone,
      })
      .then((res) => {
        console.log(res);
        navigate("/TableAgent");
      })
      .catch((err) => console.log(err));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
  //   const formattedPhone = values.Tel.replace(/-/g, "");

  //   const err = Validation({ ...values, Tel: formattedPhone });
  //   setErrors(err);
  //   if (
  //     err.fullname === "" &&
  //     err.email === "" &&
  //     err.sex === "" &&
  //     err.IDcard === "" &&
  //     err.Address === "" &&
  //     err.Tel === "" &&
  //     err.level === "" &&
  //     err.picture === "" &&
  //     err.zip_code === "" &&
  //     err.contact === ""
  //   ) {
  //     // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
  //     axios
  //       .post("http://localhost:2001/addagent", {
  //         ...values,
  //         Tel: formattedPhone,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         navigate("/TableAgent");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "IDcard") {
      const formattedCardID = value.replace(/-/g, ""); // ลบเครื่องหมาย "-"
      const formattedText1 = formattedCardID
        .replace(/\D/g, "")
        .slice(0, 13)
        .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");
      setCradID(formattedText1);
      setValues((prev) => ({ ...prev, IDcard: formattedCardID }));
    }
    if (name === "Tel") {
      const formattedPhoneNumber = value.replace(/-/g, "");
      const formattedText = formattedPhoneNumber.replace(/\D/g, "");

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

    if (name === "picture") {
      const selectedFile = event.target.files[0]; // Get the selected image file
      if (selectedFile) {
        setSelectedImage(selectedFile); // Set the selected image to the state
      }
    }
  };
  console.log(cradID);

  console.log(values);

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containeradd" action="" onSubmit={handleSubmit}>
        <h3 className="h3add">ตารางเพิ่มรายชื่อตัวแทนจำหน่าย</h3>
        {selectedImage && (
          <div className="imgSale">
            <img
              src={URL.createObjectURL(selectedImage)} // Create a temporary URL for the selected image
              alt="Selected"
              style={{ maxWidth: "auto", height: "100px" }}
            />
            {/* <p>{URL.createObjectURL(selectedImage)} </p> */}
          </div>
        )}
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
                >
                  <option>เพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </Form.Select>
                {/* {errors.sex && (
                  <span className="text-danger">{errors.sex}</span>
                )} */}
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
                      value={cradID}
                      onChange={handleInput}
                      maxLength={17} 
                    />
                  </InputGroup>
                  {/* {errors.IDcard && (
                    <span className="text-danger">{errors.IDcard}</span>
                  )} */}
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
                <div>
                  <InputGroup className="">
                    {/* <InputGroup.Text>จังหวัด</InputGroup.Text> */}
                    <Form.Select
                      aria-label="จังหวัด"
                      type="text"
                      name="province"
                      id="province"
                      onChange={(e) => onChangeProvince(e)}
                    >
                      <option>จังหวัด</option>
                      {province.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name_in_thai}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {/* {errors.province && (
                    <span className="text-danger">{errors.province}</span>
                  )} */}
                </div>
              </Col>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>อำเภอ
                </h6>
                <div>
                  <InputGroup className="">
                    <Form.Select
                      aria-label="อำเภอ"
                      type="text"
                      name="districts"
                      id="districts"
                      onChange={(e) => onChangeDistricts(e)}
                    >
                      <option>อำเภอ</option>
                      {districts.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name_in_thai}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {/* {errors.districts && (
                    <span className="text-danger">{errors.districts}</span>
                  )} */}
                </div>
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
              <Col>
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

              {/* {errors.fullname && (
                <Col md={4}>
                  <span className="text-danger">{errors.fullname}</span>
                </Col>
              )} */}
            </Row>

            <Row>
              <h6 className="txt">
                <h6>*</h6>อีเมล
              </h6>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="อีเมล"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {/* {errors.email && (
                <Col md={4}>
                  <span className="text-danger">{errors.email}</span>
                </Col>
              )} */}
            </Row>

            {/* <h6 className="txt">*อีเมล</h6> */}
          </Col>

          <Col md={5}>
            <Row>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>ตำบล
                </h6>
                <div style={{ marginBottom: "15px" }}>
                  <InputGroup className="">
                    {/* <InputGroup.Text>ตำบล</InputGroup.Text> */}
                    <Form.Select
                      aria-label="ตำบล"
                      type="text"
                      name="subdistricts"
                      id="subdistricts"
                      onChange={(e) => onChangeSubdistricts(e)}
                    >
                      <option>ตำบล</option>
                      {subdistricts.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name_in_thai}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {/* {errors.subdistricts && (
                    <span className="text-danger">{errors.subdistricts}</span>
                  )} */}
                </div>
              </Col>
              <Col>
                <h6 className="txt mb-2">รหัสไปรษณีย์</h6>
                <div className="input-container">
                  <input
                    name="zip_code"
                    className="Inputadd"
                    id="contact"
                    type="text"
                    disabled
                    value={values.zip_code}
                    onChange={handleInput}
                  />
                  {/* {errors.zip_code && (
                    <span className="text-danger">{errors.zip_code}</span>
                  )} */}
                </div>
              </Col>
            </Row>
            <Row>
              <h6 className="txt">
                <h6>*</h6>เบอร์โทรศัพท์
              </h6>

              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="เบอร์โทรศัพท์"
                    type="text"
                    name="Tel"
                    id="Tel"
                    maxLength={12}
                    onChange={handleInput}
                    value={phoneNumber}
                  />
                </InputGroup>
              </Col>
              {/* {errors.Tel && (
                <Col md={4}>
                  <span className="text-danger">{errors.Tel}</span>
                </Col>
              )} */}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ภาพถ่ายพร้อมบัตรประชาชน
              </h6>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    id="picture"
                    name="picture"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {/* {errors.picture && (
                <Col md={4}>
                  <span className="text-danger">{errors.picture}</span>
                </Col>
              )} */}

              <h6 className="txt">
                <h6>*</h6>ช่องทางติดต่อ
              </h6>

              <Col>
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
              {/* {errors.contact && (
                <Col md={4}>
                  <span className="text-danger">{errors.contact}</span>
                </Col>
              )} */}
            </Row>

            {/* <h6 className="txt">ภาพถ่ายพร้อมบัตรประชาชน</h6> */}
            {/* <h6>*ภาพถ่ายพร้อมบัตรประชาชน</h6> */}

            {/* <h6 className="txt">*ภาพถ่ายพร้อมบัตรประชาชน</h6> */}
          </Col>
          <Col md={5}>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ที่อยู่เพิ่มเติม
              </h6>
              <Col>
                <textarea
                  className="textareaaddAgent mb-3"
                  aria-label="ที่อยู่เพิ่มเติม"
                  type="text"
                  name="Address"
                  id="Address"
                  onChange={handleInput}
                ></textarea>
              </Col>
              {/* {errors.Address && (
                <Col md={4}>
                  <span className="text-danger">{errors.Address}</span>
                </Col>
              )} */}

              <h6 className="txt">
                <h6>*</h6>ระดับขั้นของตัวแทน
              </h6>

              <Col>
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  name="level"
                  id="level"
                  onChange={handleInput}
                >
                  <option>ระดับขั้นของตัวแทน</option>
                  <option value="ระดับขั้น 1">ระดับขั้น 1</option>
                  <option value="ระดับขั้น 2">ระดับขั้น 2</option>
                  <option value="ระดับขั้น 3">ระดับขั้น 3</option>
                </Form.Select>
              </Col>
              {/* {errors.Persistent_status && (
                  <Col md={4}>
                    <span className="text-danger">
                      {errors.Persistent_status}
                    </span>
                  </Col>
                )} */}
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Col className="cancel" md={5}>
            <div></div>
          </Col>
          <Col className="button2" md={5}>
            <Row>
              <Col>
                <Link to="/TableAgent" className="backadd btn btn-danger ">
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

export default AddAgent;
