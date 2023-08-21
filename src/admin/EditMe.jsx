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
import Validation from "../function/CreateSalesValidation.jsx";

import img from "../assets/002.png";
import MenuNav from "./MenuNav";

function EditMe() {
    const navigate = useNavigate();

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
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
  
    const handleSubmit = (event) => {
        
    };
  
    const handleInput = (event) => {
    };

  //!Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      <form className="containerread" onSubmit={handleSubmit}>
        <h3 className="h3Editsale">แก้ไขข้อมูลส่วนตัวของฉัน</h3>

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
                  disabled
                  // value={values.ID_sales}
                />
              </Col>
              <Col md={8}>
                <h6 className="txt">เพศ</h6>
                <input
                  name="text"
                  className="InputSex0"
                  id="Sex"
                  type="text"
                  // value={values.sex}
                />
              </Col>
            </Row>

            <h6 className="txt">เลขบัตรประชาชน</h6>
            <input
              name="text"
              className="Input20"
              id="IDcard"
              type="text"
              disabled
              // value={values.Card_ID}
            />

            <h6 className="txt">ชื่อ-นามสกุล</h6>
            <input
              name="text"
              className="Input20"
              id="fullname"
              type="text"
              disabled
              // value={values.fullname}
            />

            <h6 className="txt">อีเมล</h6>
            <input
              name="text"
              className="Input20"
              id="email"
              type="text"
              disabled
              // value={values.email}
            />
            <Row>
              <Col>
                <h6 className="txt">รหัสผ่าน</h6>
                <input
                  name="password"
                  className="Input20"
                  id="password"
                  type="password"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  // value={values.password}
                />

                <div className="AppModal">
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h6 className="txt">รหัสผ่าน</h6>
                    <input
                      name="password"
                      className="Input40"
                      id="password"
                      type="password"
                      aria-describedby="passwordHelpBlock"
                      disabled
                      // value={values.password}
                    />
                    <h6 className="txt">ยืนยันรหัสผ่าน</h6>
                    <input
                      name="password"
                      className="Input40"
                      id="password"
                      type="password"
                      aria-describedby="passwordHelpBlock"
                      disabled
                      // value={values.password}
                    />

                    <div>
                      <button type="submit" className="bgeditModalPass">
                        แก้ไข
                      </button>
                    </div>
                  </Modal>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
          <Col md={12}>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <h6 className="txt">
                  <h6>*</h6>อำเภอ
                </h6>
                <InputGroup className="" style={{ width: "215px" }}>
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
              </Col>
            </Row>
          </Col>
          <Row md={5}>
              <Col>
                <h6 className="txt">
                  <h6>*</h6>ตำบล
                  {errors.zip_code && (
                  <span className="text-danger">{errors.zip_code}</span>
                )}
                </h6>
                {/* <h6 className="txt">*ตำบล</h6> */}
                <InputGroup className="mb-3">
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
                {errors.districts && (
                  <span className="text-danger">{errors.districts}</span>
                )}
              </Col>
              <Col>
                <h6 className="txt">
                รหัสไปรษณีย์
                  <h6></h6>
                </h6>
                
                <input
                  name="zip_code"
                  className="InputZip"
                  id="contact"
                  type="text"
                  disabled
                  value={values.zip_code}
                  onChange={handleInput}
                />
              </Col>
            </Row>

            <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
            <input
              name="text"
              className="Input0"
              id="AddressSale"
              type="text"
              aria-describedby="passwordHelpBlock"
              disabled
              // value={values.AddressSale}
            />
            <h6 className="txt">ช่องทางติดต่อ</h6>
            <input
              name="text"
              className="Input0"
              id="contact"
              type="text"
              disabled
              // value={values.contact}
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
                  className="Input30"
                  id="Tel"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  disabled
                  // value={values.PhoneNumber}
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
          <Col className="editme" md={5}>
            <Link to="/AboutMe" className="back btn btn-danger">
              {" "}
              กลับ{" "}
            </Link>
          </Col>
          <Col className="button2" md={6}>
            <Row style={{ marginRight: "25px" }}>
              <Col>
                <Link
                  // style={{ alignItems: "end", marginTop: "26px" }}
                  className="editpassword btn"
                  onClick={handleOpenModal}
                >
                  แก้ไขรหัสผ่าน
                </Link>
              </Col>
              <Col>
                <button
                  // style={{ alignItems: "end", marginTop: "26px" }}
                  className="bgedit btn"
                  type="submit"
                >
                  ยืนยัน
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default EditMe;
