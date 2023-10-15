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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Validation from "../function/CreateSalesValidation.jsx";

function EditAgent() {
  const MySwal = withReactContent(Swal); //icon aleart
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id", id);

  //!ข้อมูลคนล็อคอิน
  //   const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

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

  //!update
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/getupdateAgent/" + id)
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

  //!
  // const [selectedImage, setSelectedImage] = useState(null);
  // const file = event.target.files[0]; // Get the first selected file
  // setSelectedImage(file);

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
    // ID_sales: `${userLoginData[0].ID_sales}`,
  });

  //   const handleUpdate = (event) => {
  //     event.preventDefault();
  //     axios
  //       .put("http://localhost:2001/agentUpdate/" + id, values)
  //       .then((res) => {
  //         console.log(res);
  //         navigate("/TableAgent");
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //!
  const [errors, setErrors] = useState({});
  const handleUpdate = (event) => {
    event.preventDefault();
    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    // const formattedPhone = values.Tel.replace(/-/g, "");
    const err = Validation({ ...values });
    setErrors(err);
    if (
      err.sex === "" &&
      err.IDcard === "" &&
      err.fullname === "" &&
      err.email === "" &&
      err.picture === "" &&
      err.Address === "" &&
      err.Tel === "" &&
      err.zip_code === "" &&
      err.level === "" &&
      err.contact === ""
    ) {
      axios
        .put("http://localhost:2001/agentUpdate/" + id, {
          ...values,
        })
        .then((res) => {
          console.log(res);
          // MySwal.fire({
          //   title: <strong>อัพเดทข้อมูลส่วนตัวสำเร็จ</strong>,
          //   html: <i>ออกจากระบบเพื่ออัพเดทข้อมูลการล็อคอิน</i>,
          //   icon: "warning",
          // });
          navigate("/TableAgent");
        })
        .catch((err) => console.log(err));
    }
  };
  console.log("values :", values);
  //Check
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;

    // if (name === "IDcard") {
    //   const formattedCardID = value.replace(/-/g, "");
    //   const formattedText1 = formattedCardID
    //     .replace(/\D/g, "")

    //     .slice(0, 13)
    //     .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

    //   setCradID(formattedText1);
    //   setValues((prev) => ({ ...prev, [name]: formattedText1 }));
    // }
    // if (name === "Tel") {
    //   const formattedPhoneNumber = value.replace(/-/g, "");
    //   const formattedText = formattedPhoneNumber.replace(/\D/g, "");

    //   let formattedPhoneNumberFinal;
    //   if (formattedText.length === 9) {
    //     formattedPhoneNumberFinal = formattedText.replace(
    //       /(\d{2})(\d{3})(\d{4})/,
    //       "$1-$2-$3"
    //     );
    //   } else {
    //     formattedPhoneNumberFinal = formattedText
    //       .slice(0, 10)
    //       .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    //   }

    //   setPhoneNumber(formattedPhoneNumberFinal);
    //   setValues((prev) => ({ ...prev, [name]: formattedPhoneNumberFinal }));
    // } else {
    //   setValues((prev) => ({ ...prev, [name]: value }));
    // }
    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "picture") {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setSelectedImage(selectedFile);
      }
    }
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
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
                  value={values.ID_agent}
                />
              </Col>
              <Col md={8}>
                <h6 className="txt">เพศ</h6>
                <Form.Select
                  className="InputSex0"
                  aria-label="เพศ"
                  name="sex"
                  type="text"
                  id="Sex"
                  style={{ width: "275px" }}
                  value={values.sex}
                  // onChange={(e) =>
                  //   setValues({ ...values, sex: e.target.value })
                  // }
                  onChange={handleInput}
                >
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                  {/* <option value="อื่น ๆ">อื่น ๆ</option> */}
                </Form.Select>
                {errors.sex && (
                  <span className="text-danger">{errors.sex}</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="txt">เลขบัตรประชาชน</h6>
                <input
                  name="IDcard"
                  className="Input2"
                  id="IDcard"
                  type="text"
                  onChange={handleInput}
                  style={{ backgroundColor: "white" }}
                  value={values.IDcard}
                  maxLength={13}
                />
              </Col>
              {errors.IDcard && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.IDcard}</span>
                  </Col>
                </div>
              )}
            </Row>

            <Row>
              <Col>
                <h6 className="txt">ชื่อ-นามสกุล</h6>
                <input
                  name="fullname"
                  className="Input2"
                  id="fullname"
                  type="text"
                  onChange={handleInput}
                  style={{ backgroundColor: "white" }}
                  value={values.fullname}
                />
              </Col>
              {errors.fullname && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.fullname}</span>
                  </Col>
                </div>
              )}
            </Row>

            <Row>
              <Col>
                <h6 className="txt">อีเมล</h6>
                <input
                  name="email"
                  className="Input2"
                  id="email"
                  type="text"
                  onChange={handleInput}
                  value={values.email}
                  style={{ backgroundColor: "white" }}
                />
              </Col>
              {errors.email && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.email}</span>
                  </Col>
                </div>
              )}
            </Row>

            {/* <h6 className="txt">พนักงานที่เพิ่มตัวแทน</h6>
            <input
              name=""
              className="Input2"
              id=""
              type="text"
              disabled
              value={values.Sales_Fullname}
            /> */}
          </Col>

          <Col md={4}>
            <Row style={{ marginBottom: "20px" }}>
              <Col>
                <Row>
                  <Col>
                    <h6 className="txt">จังหวัด</h6>
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
                        <option>{values.province}</option>
                        {province.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name_in_thai}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  {errors.province && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">{errors.province}</span>
                      </Col>
                    </div>
                  )}
                </Row>

                <Row>
                  <Col>
                    <h6 className="txt">ตำบล</h6>
                    {/* <h6 className="txt">*ตำบล</h6> */}
                    <InputGroup className="">
                      {/* <InputGroup.Text>ตำบล</InputGroup.Text> */}
                      <Form.Select
                        aria-label="ตำบล"
                        type="text"
                        name="subdistricts"
                        id="subdistricts"
                        onChange={(e) => onChangeSubdistricts(e)}
                      >
                        <option>{values.subdistricts}</option>
                        {subdistricts.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name_in_thai}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  {errors.subdistricts && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">
                          {errors.subdistricts}
                        </span>
                      </Col>
                    </div>
                  )}
                </Row>

                {/* {errors.districts && (
                  <span className="text-danger">{errors.districts}</span>
                )} */}
              </Col>
              <Col>
                <Row>
                  <Col>
                    <h6 className="txt">อำเภอ</h6>
                    <InputGroup className="" style={{ width: "230px" }}>
                      <Form.Select
                        aria-label="อำเภอ"
                        type="text"
                        name="districts"
                        id="districts"
                        onChange={(e) => onChangeDistricts(e)}
                      >
                        <option>{values.districts}</option>
                        {districts.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name_in_thai}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  {errors.districts && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">{errors.districts}</span>
                      </Col>
                    </div>
                  )}
                </Row>

                <Row>
                  <Col>
                    <h6 className="txt" style={{ marginTop: "15px" }}>
                      รหัสไปรษณีย์
                      <h6></h6>
                    </h6>
                    <input
                      name="zip_code"
                      class="form-control"
                      style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      id="contact"
                      type="text"
                      disabled
                      value={values.zip_code}
                      onChange={handleInput}
                    />
                  </Col>
                  {errors.zip_code && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">{errors.zip_code}</span>
                      </Col>
                    </div>
                  )}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
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
                  name="Tel"
                  class="form-control"
                  id="Tel"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  onChange={handleInput}
                  maxLength={10}
                  value={values.Tel}
                />
                {errors.Tel && (
                  <div className="erroredit">
                    <Col>
                      <span className="text-danger">{errors.Tel}</span>
                    </Col>
                  </div>
                )}
              </Col>

              <Col>
                <h6 className="txt">ระดับขั้นตัวแทนจำหน่าย</h6>
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  name="level"
                  id="level"
                  onChange={handleInput}
                >
                  <option value={values.level}>{values.level}</option>
                  <option value="ระดับขั้น 1">ระดับขั้น 1</option>
                  <option value="ระดับขั้น 2">ระดับขั้น 2</option>
                  <option value="ระดับขั้น 3">ระดับขั้น 3</option>
                </Form.Select>
                {errors.level && (
                  <div className="erroredit">
                    <Col>
                      <span className="text-danger">{errors.level}</span>
                    </Col>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ marginBottom: "15px" }}>
                  <h6 className="txt">ช่องทางติดต่อ</h6>
                  <input
                    name="contact"
                    class="form-control"
                    id="contact"
                    type="text"
                    onChange={handleInput}
                    value={values.contact}
                  />
                </div>
              </Col>
              {errors.contact && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.contact}</span>
                  </Col>
                </div>
              )}
            </Row>
            <Row>
              <Col>
                <div>
                  <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
                  <textarea
                    name="Address"
                    className="textareaaddAgent"
                    id="Address"
                    type="text"
                    aria-describedby="passwordHelpBlock"
                    onChange={handleInput}
                    value={values.Address}
                  />
                </div>
              </Col>
              {errors.Address && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Address}</span>
                  </Col>
                </div>
              )}
            </Row>
          </Col>
          <Col md={2}>
            <h6
              className="txt"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <h6>*</h6>ภาพถ่ายพร้อมบัตรประชาชน
            </h6>
            <img
              style={{ marginLeft: "20%", marginTop: "30px" }}
              src={values.picture}
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
            <Row>
              <Col>
                <InputGroup
                  className="mb-3"
                  style={{ marginLeft: "20%", width: "85%", marginTop: "5%" }}
                >
                  <Form.Control
                    type="file"
                    accept="image/*"
                    id="picture"
                    name="picture"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {errors.picture && (
                <span
                  style={{
                    marginLeft: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="text-danger"
                >
                  {errors.picture}
                </span>
              )}
            </Row>
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
            <button className="bgedit btn" type="submit">
              ยืนยัน
            </button>
            {/* <button className="bgedit btn" type="submit">แก้ไข</button> */}
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default EditAgent;
