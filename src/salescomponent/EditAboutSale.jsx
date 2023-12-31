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
import MenuNavSales from "./MenuNavSales";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function EditAboutSale() {
  const MySwal = withReactContent(Swal); //icon aleart
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID", id);

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
          password2: res.data[0].password,
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
          PhoneNumber: res.data[0].PhoneNumber,
          Card_ID: res.data[0].Card_ID,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  //!
  // const [selectedImage, setSelectedImage] = useState(null);
  // const file = event.target.files[0]; // Get the first selected file
  // setSelectedImage(file);

  const [values, setValues] = useState({
    Persistent_status: "",
    fullname: "",
    districts: "",
    email: "",
    password: "",
    password2: "",
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
  //add
  const [errors, setErrors] = useState({});
  const handleUpdate = (event) => {
    event.preventDefault();
    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    // const formattedPhone = values.Tel.replace(/-/g, "");

    const err = Validation({ ...values });
    setErrors(err);
    if (
      err.fullname === "" &&
      err.email === "" &&
      err.password === "" &&
      err.password2 === "" &&
      err.sex === "" &&
      err.IDcard === "" &&
      err.AddressSale === "" &&
      err.Tel === "" &&
      err.picture === "" &&
      err.zip_code === "" &&
      err.contact === ""
    ) {
      axios
        .put("http://localhost:2001/saleUpdate/" + id, {
          ...values
        })
        .then((res) => {
          console.log(res);
          MySwal.fire({
            title: <strong>อัพเดทข้อมูลส่วนตัวสำเร็จ</strong>,
            html: <i>ออกจากระบบเพื่ออัพเดทข้อมูลการล็อคอิน</i>,
            icon: "warning",
          });
          navigate("/");
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
    //   const formattedText1 = formattedCardID.replace(/\D/g, "")

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
      const selectedFile = event.target.files[0]; // Get the selected image file
      if (selectedFile) {
        setSelectedImage(selectedFile); // Set the selected image to the state

        if (name === "picture") {
          const selectedFile = event.target.files[0]; // Get the selected image file
          if (selectedFile) {
            setSelectedImage(selectedFile); // Set the selected image to the state

            const reader = new FileReader();
            reader.onload = (event) => {
              const base64Image = event.target.result;

              // นำรูปภาพมาเพิ่มใน values
              setValues({
                ...values,
                picture: base64Image,
              });

              // นำ base64 ของรูปภาพไปเก็บลงในโฟลเดอร์ (ถ้าต้องการ)
              // saveBase64ImageToFile(base64Image);
            };

            reader.readAsDataURL(selectedFile);
          }
        }
      }
    }
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containerread" onSubmit={handleUpdate}>
        <h3 className="h3Editsale">แก้ไขข้อมูลส่วนตัวของ {values.fullname}</h3>

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
                  value={values.ID_sales}
                  disabled
                  // value={values.ID_sales}
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
              </Col>
              {errors.sex && <span className="text-danger">{errors.sex}</span>}
            </Row>

            <Row>
              <Col>
                <h6 className="txt">เลขบัตรประชาชน</h6>
                <input
                  name="IDcard"
                  className="Input20"
                  id="IDcard"
                  type="text"
                  maxLength={13}
                  value={values.IDcard}
                  // onChange={(e) =>
                  //   setValues({ ...values, IDcard: e.target.value })
                  // }
                  onChange={handleInput}
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
                  className="Input20"
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={values.fullname}
                  onChange={(e) =>
                    setValues({ ...values, fullname: e.target.value })
                  }
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
                  className="Input20"
                  id="email"
                  type="text"
                  value={values.email}
                  // onChange={(e) =>
                  //   setValues({ ...values, email: e.target.value })
                  // }
                  onChange={handleInput}
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
            <Row>
              <Col>
                <h6 className="txt">รหัสผ่าน</h6>
                <input
                  style={{ backgroundColor: " rgb(211, 211, 211)" }}
                  // name="password"
                  className="Input20"
                  // id="password"
                  type="password"
                  // aria-describedby="passwordHelpBlock"
                  value={values.password}
                />

                <div className="AppModal">
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h6 className="txt">
                      <h6>*</h6>รหัสผ่าน
                    </h6>
                    <Row>
                      <Col>
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
                      {errors.password && (
                        <Col md={4}>
                          <span className="text-danger">{errors.password}</span>
                        </Col>
                      )}
                    </Row>
                    <h6 className="txt">
                      <h6>*</h6>ยืนยันรหัสผ่าน
                    </h6>
                    <Row>
                      <Col>
                        <InputGroup className="mb-3">
                          <Form.Control
                            type="password"
                            aria-describedby="passwordHelpBlock"
                            name="password2"
                            id="password2"
                            onChange={handleInput}
                          />
                        </InputGroup>
                      </Col>
                      {errors.password2 && (
                        <Col md={4}>
                          <span className="text-danger">
                            {errors.password2}
                          </span>
                        </Col>
                      )}
                    </Row>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "5px",
                      }}
                    >
                      <button
                        className="btn btn-danger left-button"
                        onClick={() => {
                          handleCloseModal();
                          // handleDeleteProductLotALL();
                        }}
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        className="bgeditModalPass right-button"
                      >
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
                  <h6 className="txt mb-2">จังหวัด</h6>
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
                  {errors.province && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">{errors.province}</span>
                      </Col>
                    </div>
                  )}
                </Col>
                <Col md={6}>
                  <h6 className="txt mb-2">อำเภอ</h6>
                  <InputGroup className="" style={{ width: "225px" }}>
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
                  {errors.districts && (
                    <div className="erroredit">
                      <Col>
                        <span className="text-danger">{errors.districts}</span>
                      </Col>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Row md={5}>
              <Col>
                <h6 className="txt mb-2">ตำบล</h6>
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
                {errors.subdistricts && (
                  <div className="erroredit">
                    <Col>
                      <span className="text-danger">{errors.subdistricts}</span>
                    </Col>
                  </div>
                )}
              </Col>
              <Col>
                <h6 className="txt mb-2">
                  รหัสไปรษณีย์
                  <h6></h6>
                </h6>

                <input
                  name="zip_code"
                  className="InputZip"
                  id="zip_code"
                  type="text"
                  disabled
                  value={values.zip_code}
                  onChange={handleInput}
                />
                {errors.zip_code && (
                  <div className="erroredit">
                    <Col>
                      <span className="text-danger">{errors.zip_code}</span>
                    </Col>
                  </div>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <h6 className="txt">เบอร์โทรศัพท์</h6>
                <input
                  name="Tel"
                  className="Input0"
                  id="Tel"
                  type="text"
                  // aria-describedby="passwordHelpBlock"
                  // value={phoneNumber}
                  maxLength={10}
                  value={values.Tel}
                  onChange={handleInput}
                />
              </Col>
              {errors.Tel && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Tel}</span>
                  </Col>
                </div>
              )}
            </Row>

            <Row>
              <Col>
                <h6 className="txt">ช่องทางติดต่อ</h6>
                <input
                  name="contact"
                  className="Input0"
                  id="contact"
                  type="text"
                  value={values.contact}
                  // onChange={(e) =>
                  //   setValues({ ...values, contact: e.target.value })
                  // }
                  onChange={handleInput}
                />
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
                {/* <Link
                style={{ alignItems: "end", marginTop: "26px" }}
                className="bgedit btn"
                onClick={handleOpenModal}
              >
                แก้ไข
              </Link> */}

                <h6 className="txt">ที่อยู่เพิ่มเติม</h6>
                <textarea
                  name="AddressSale"
                  className="textareaedit"
                  id="AddressSale"
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  value={values.AddressSale}
                  // onChange={(e) =>
                  //   setValues({ ...values, Address: e.target.value })
                  // }
                  onChange={handleInput}
                />
              </Col>
              {errors.AddressSale && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.AddressSale}</span>
                  </Col>
                </div>
              )}
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
            <h6
              className="txt"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "20%",
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
                    id="picture"
                    name="picture"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {errors.picture && (
                <span style={{ marginLeft: "10%" ,display:"flex",alignItems:"center",justifyContent:"center" }} className="text-danger">
                  {errors.picture}
                </span>
              )}
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col className="editme" md={5}>
            <Link to="/AboutSale" className="back btn btn-danger">
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

export default EditAboutSale;
