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
import MenuNav from "./MenuNav";

function EditSales() {
  const { id } = useParams();
  const navigate = useNavigate();

  //!read
  // const [Data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:2001/datasale/" + ID_sales)
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // console.log(Data);

  //!Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //!update
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/getupdateSale/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Persistent_status: res.data[0].Persistent_status,
          fullname: res.data[0].fullname,
          districts: res.data[0].districts,
          email: res.data[0].email,
          password: res.data[0].password,
          sex: res.data[0].sex,
          IDcard: res.data[0].IDcard,
          province: res.data[0].province,
          subdistricts: res.data[0].subdistricts,
          AddressSale: res.data[0].AddressSale,
          Tel: res.data[0].Tel,
          contact: res.data[0].contact,
          picture: res.data[0].picture,
          zip_code: res.data[0].zip_code,
          ID_sales: res.data[0].ID_sales,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    Persistent_status: "",
    fullname: "",
    districts: "",
    email: "",
    password: "",
    sex: "",
    IDcard: "",
    province: "",
    subdistricts: "",
    AddressSale: "",
    Tel: "",
    contact: "",
    picture: "",
    zip_code: "",
    ID_sales: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:2001/saleUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/Salesperson");
      })
      .catch((err) => console.log(err));
  };

  //!
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [cradID, setCradID] = useState("");

  // const handleInput = (event) => {
  //   const { name, value } = event.target;

  //   if (name === "IDcard") {
  //     const formattedCardID = value.replace(/-/g, "");
  //     const formattedText1 = formattedCardID
  //       .replace(/\D/g, "")
  //       .slice(0, 13)
  //       .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

  //     setCradID(formattedText1);
  //     setValues((prev) => ({ ...prev, [name]: formattedText1 }));
  //   }
  //   if (name === "Tel") {
  //     const formattedPhoneNumber = value.replace(/-/g, "");
  //     const formattedText = formattedPhoneNumber.replace(/\D/g, "");

  //     // ตรวจสอบเงื่อนไขเพื่อให้ตัวเลขในเบอร์โทรศัพท์เป็นเฉพาะตัวเลขและตัดจำนวนให้เหลือเพียง 10 หรือ 9 ตัว
  //     let formattedPhoneNumberFinal;
  //     if (formattedText.length === 9) {
  //       formattedPhoneNumberFinal = formattedText.replace(
  //         /(\d{2})(\d{3})(\d{4})/,
  //         "$1-$2-$3"
  //       );
  //     } else {
  //       formattedPhoneNumberFinal = formattedText
  //         .slice(0, 10)
  //         .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  //     }

  //     setPhoneNumber(formattedPhoneNumberFinal);
  //     setValues((prev) => ({ ...prev, [name]: formattedPhoneNumberFinal }));
  //   } else {
  //     setValues((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
  return (
    // <div className="containerread">
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      <form className="containerread" onSubmit={handleUpdate}>
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
                  value={values.ID_sales}
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
              value={values.IDcard}
              
            />

            <h6 className="txt">ชื่อ-นามสกุล</h6>
            <input
              name="text"
              className="Input2"
              id="fullname"
              type="text"
              disabled
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

            <h6 className="txt">รหัสผ่าน</h6>
            <input
              name="password"
              className="Input2"
              id="password"
              type="password"
              aria-describedby="passwordHelpBlock"
              disabled
              value={values.password}
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

            <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
            <input
              name="text"
              className="Input"
              id="AddressSale"
              type="text"
              aria-describedby="passwordHelpBlock"
              disabled
              value={values.AddressSale}
            />
            <h6 className="txt">ช่องทางติดต่อ</h6>
            <input
              name="text"
              className="Input"
              id="contact"
              type="text"
              disabled
              value={values.contact}
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
                <h6 className="txt">เบอร์โทรศัพท์</h6>
                <input
                  name="text"
                  className="Input3"
                  id="Tel"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  value={values.Tel}
                />
              </Col>
              <Col>
                <h6 className="txt">สถานะ</h6>
                <input
                  name="text"
                  className="Input3"
                  id="Persistent_status"
                  type="text"
                  disabled
                  value={values.Persistent_status}
                />
              </Col>
            </Row>

            <div className="AppModal">
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

                  //   disabled
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
            </div>
          </Col>
          <Col md={2}>
            <img
              style={{ marginLeft: "20%", marginTop: "30px" }}
              src={img}
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
                <Link to="/Salesperson" className="back btn btn-danger">
                  {" "}
                  กลับ{" "}
                </Link>
              </Col>
              <Col>
                <Link
                  // style={{ alignItems: "end", marginTop: "26px" }}
                  className="bgedit btn"
                  onClick={handleOpenModal}
                >
                  ปรับสถานะ
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>

    /* </div> */
  );
}

export default EditSales;
