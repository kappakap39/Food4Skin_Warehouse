import React, { useEffect } from "react";
import "../css/Addsales.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Validation from "../function/CreateSalesValidation.jsx";
import MenuNav from "./MenuNav";
import { v4 as uuidv4 } from "uuid";
import shortid  from 'shortid'

// import { subdistricts } from "../../../../Backend/controller/provinces";
function AddSales() {
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
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
    sex: "",
    IDcard: "",
    districts: "",
    province: "",
    subdistricts: "",
    AddressSale: "",
    Tel: "",
    Persistent_status: "",
    contact: "",
    picture: "",
    zip_code: "",
  });

  // post("http://localhost:2001/addsale", values)
  const [errors, setErrors] = useState({});
  // const [filename, setFilename] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // const file = event.target.files;
    // const fileex = file.picture.split('.').toLowerCase();
    // const uuid = uuid()
    // const filename = `${uuid}.${fileex}`
    // setFilename(filename)

    // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
    const formattedPhone = values.Tel.replace(/-/g, "");

    const err = Validation({ ...values, Tel: formattedPhone });
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
      err.Persistent_status === "" &&
      err.picture === "" &&
      err.zip_code === "" &&
      err.contact === ""
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
  // console.log("filename",filename)

  // const uuid = ()=> {
  //   return 'xxx'
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // ตรวจสอบและลบขีดคั่นออกจากเบอร์โทรศัพท์
  //   const formattedPhone = values.Tel.replace(/-/g, "");

  //   const err = Validation({ ...values, Tel: formattedPhone });
  //   setErrors(err);

  //   if (
  //     err.fullname === "" &&
  //     err.email === "" &&
  //     err.password === "" &&
  //     err.password2 === "" &&
  //     err.sex === "" &&
  //     err.IDcard === "" &&
  //     err.AddressSale === "" &&
  //     err.Tel === "" &&
  //     err.Persistent_status === "" &&
  //     err.picture === "" &&
  //     err.zip_code === "" &&
  //     err.contact === ""
  //   ) {
  //     // ตรวจสอบ IDcard ที่เพิ่มขึ้นมา
  //     const isDuplicate = await checkDuplicateIDcard(values.IDcard);

  //     if (isDuplicate) {
  //       // ถ้า IDcard ซ้ำกัน แสดงข้อความแจ้งเตือน
  //       alert("IDcard นี้มีอยู่ในระบบแล้ว");
  //     } else {
  //       // ถ้าไม่มี IDcard ซ้ำกัน ส่งข้อมูลไปยังเซิร์ฟเวอร์
  //       axios
  //         .post("http://localhost:2001/addsale", {
  //           ...values,
  //           Tel: formattedPhone,
  //         })
  //         .then((res) => {
  //           console.log(res);
  //           navigate("/Salesperson");
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cradID, setCradID] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgs, setImgs] = useState();

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "IDcard") {
      const formattedCardID = value.replace(/-/g, "");
      const formattedText1 = formattedCardID
        .replace(/\D/g, "")
        .slice(0, 13)
        .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1-$2-$3-$4-$5");

      setCradID(formattedText1);
      setValues((prev) => ({ ...prev, IDcard: value })); // เก็บค่าที่ไม่ผ่านการจัดรูปแบบและเครื่องหมาย "-"
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
  console.log(cradID);

  console.log("values", values);

  return (
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      <form className="containeradd" action="" onSubmit={handleSubmit}>
        <h3 className="h3add">เพิ่มรายชื่อพนักงานฝ่ายขาย</h3>
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
                      value={cradID}
                      onChange={handleInput}
                      maxLength={17}
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
                  {errors.province && (
                    <span className="text-danger">{errors.province}</span>
                  )}
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
                  {errors.districts && (
                    <span className="text-danger">{errors.districts}</span>
                  )}
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

              {errors.fullname && (
                <Col md={4}>
                  <span className="text-danger">{errors.fullname}</span>
                </Col>
              )}
            </Row>

            <Row>
              <h6 className="txt">
                <h6>*</h6>อีเมล
              </h6>
              <Col>
                <InputGroup className="mb-3">
                  {/* <InputGroup.Text>อีเมล</InputGroup.Text> */}
                  <Form.Control
                    aria-label="อีเมล"
                    type="email"
                    name="email"
                    id="email"
                    // onChange={(e) => setValues({ ...values, email: e.target.value })}
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {errors.email && (
                <Col md={4}>
                  <span className="text-danger">{errors.email}</span>
                </Col>
              )}
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
                  {errors.subdistricts && (
                    <span className="text-danger">{errors.subdistricts}</span>
                  )}
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
                  {errors.zip_code && (
                    <span className="text-danger">{errors.zip_code}</span>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <h6 className="txt">
                <h6>*</h6>สถานะ
              </h6>

              <Col className="mb-3">
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
              {errors.Persistent_status && (
                <Col md={4}>
                  <span className="text-danger">
                    {errors.Persistent_status}
                  </span>
                </Col>
              )}
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
                    id="picture"
                    name="picture"
                    onChange={handleInput}
                  />
                </InputGroup>
              </Col>
              {errors.picture && (
                <Col md={4}>
                  <span className="text-danger">{errors.picture}</span>
                </Col>
              )}
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
              {errors.Tel && (
                <Col md={4}>
                  <span className="text-danger">{errors.Tel}</span>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
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
          </Col>

          <Col md={5}>
            <h6 className="txt">
              <h6>*</h6>ช่องทางติดต่อ
            </h6>
            <Row>
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
              {errors.contact && (
                <Col md={4}>
                  <span className="text-danger">{errors.contact}</span>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={5}>
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
                  <span className="text-danger">{errors.password2}</span>
                </Col>
              )}
            </Row>
          </Col>

          <Col md={5}>
            <Row>
              <h6 className="txt">
                <h6>*</h6>ที่อยู่เพิ่มเติม
              </h6>
              <Col>
                <textarea
                  className="textareaadd mb-3"
                  aria-label="ที่อยู่เพิ่มเติม"
                  type="text"
                  name="AddressSale"
                  id="AddressSale"
                  onChange={handleInput}
                ></textarea>
              </Col>
              {errors.AddressSale && (
                <Col md={4}>
                  <span className="text-danger">{errors.AddressSale}</span>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Col md={5}>
            <Link
              to="/Salesperson"
              className="backadd btn btn-danger left-button "
            >
              {" "}
              ยกเลิก{" "}
            </Link>
          </Col>
          <Col className="button2" md={5}>
            <button type="submit" className="bgsuccess">
              บันทึก
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default AddSales;
