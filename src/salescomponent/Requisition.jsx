import React, { useEffect } from "react";
import "../css/product.css";

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
import { BiSolidUserPlus } from "react-icons/bi";
import FormText from "react-bootstrap/esm/FormText";
import MenuNavSales from "./MenuNavSales";

function Requisition() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  const [ID_lot, setInventories_lot] = useState("");

  //!add
  const [values, setValues] = useState({
    // ID_requisition: "",
    Dete_requisition: "",
    Amount_products: "",
    remark: "",
    ID_agent: "",
    ID_lot: "",
    // ID_product: "",
    Nameproduct: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
  });
  console.log("ข้อมูลที่กรอก", values);

   //! select agent
   const [nameagent, setNameagent] = useState([]);
   useEffect(() => {
     axios
       .get("http://localhost:2001/NameAgent")
       .then((res) => setNameagent(res.data))
       .catch((err) => console.log(err));
   }, []);

  //! LOT
  //! select product
  const [nameproduct, setNameproduct] = useState([]);
  const [nameLot, setNameLot] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/NameProduct")
      .then((res) => setNameproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onChangeProduct = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/Lotforproduct/${id}`)
      .then((res) => {
        setNameLot(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeInventories_lot = (e) => {
    const filterDistrict = nameLot.filter((item) => {
      return e.target.value == item.ID_lot;
    });
    console.log("ID_lot", filterDistrict[0].ID_lot);
    console.log("Inventories_lot", filterDistrict[0].Inventories_lot);

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].ID_lot,
      Inventories_lot: filterDistrict[0].Inventories_lot,
    });
    console.log(e.target.value);
  };

  //!date
  useEffect(() => {
    // สร้างวันที่ปัจจุบันในรูปแบบ ISO (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];

    // กำหนดค่าเริ่มต้นให้กับ date_import เป็นวันที่ปัจจุบัน
    setValues((prev) => ({ ...prev, Dete_requisition: currentDate }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
    axios
      .post("http://localhost:2001/addRequisition", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/ProductLOT");
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    // ตรวจสอบว่าค่าที่ป้อนเป็นติดลบหรือไม่
    if (name === "Amount_products") {
      // ถ้าเป็นค่าติดลบให้กำหนดค่าให้เป็น 1
      const Amount_productsValue = Number(value);
      if (Amount_productsValue < 1) {
        setValues((prev) => ({ ...prev, Amount_products: "1" }));
      } else {
        // ถ้าไม่ใช่ค่าติดลบ ให้อัปเดตค่า "สินค้าคงเหลือ" ด้วยค่า "จำนวนสินค้า"
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log("Values", values);
  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containerPRODUCT" action="" onSubmit={handleSubmit}>
        <h3 className="h3">นำสินค้าเข้าคลังสินค้า</h3>
        <div className="bodyImport">
          {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
          <div className="spanProduct">
            <Row>
              <Col>
                <span className="txt">
                  <h6>*</h6>ชื่อสินค้า
                </span>
                <select
                  name="Nameproduct"
                  id="Nameproduct"
                  type="text"
                  className="form-select"
                  onChange={(e) => onChangeProduct(e)}
                  // style={{ marginLeft: "15px" }}
                >
                  <option value="">เลือกสินค้า</option>
                  {nameproduct.map((item, index) => (
                    <option key={index} value={item.ID_product}>
                      {item.Name_product}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </div>
          <div className="spanProduct">
            <Row>
              <Col>
                <span className="txt">
                  <h6>*</h6>ล็อตสินค้า
                </span>
                <select
                  name="ID_lot"
                  id="ID_lot"
                  type="text"
                  className="form-select"
                  onChange={(e) => {
                    setInventories_lot(e.target.value); // เมื่อมีการเลือกล็อตใหม่ กำหนดค่าให้กับ state ID_lot
                    onChangeInventories_lot(e);
                  }}
                >
                  <option value="">เลือกล็อต</option>
                  {nameLot.map((item, index) => (
                    <option key={index} value={item.ID_lot}>
                      {item.ID_lot}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <span className="txt">
                  <h6>*</h6>คงเหลือ
                </span>
                <input
                  style={{ backgroundColor: "rgba(240, 248, 255, 0.814)" }}
                  className="form-control"
                  name="Inventories_lot"
                  type="text"
                  value={values.Inventories_lot}
                  disabled
                  onChange={handleInput}
                />
              </Col>
              <Col>
                <span className="txt">
                  <h6>*</h6>จำนวนสินค้า
                </span>
                <input
                  class="form-control"
                  name="Amount_products"
                  type="number"
                  onChange={handleInput}
                />
              </Col>
            </Row>
          </div>

          <div className="spanProduct">
            <span className="txt">
              <h6>*</h6>ตัวแทนจำหน่าย
            </span>
            <select
              name="ID_agent"
              id="ID_agent"
              type="text"
              className="form-select"
              onChange={handleInput}
              // style={{ marginLeft: "15px" }}
            >
              <option value="">ลูกค้า</option>
              <option value="ลูกค้าปลีก">ลูกค้าปลีก</option>
              {nameagent.map((item, index) => (
                <option key={index} value={item.ID_agent}>
                  {item.fullname}
                </option>
              ))}
            </select>
          </div>
          <div className="spanProduct">
            <span className="txt">
              <h6>*</h6>หมายเหตุ
            </span>
            <textarea
              class="form-control"
              name="remark"
              type="text"
              placeholder="หมายเหตุ"
              onChange={handleInput}
            />
          </div>
          <div style={{ marginTop: "20px" }} className="spanProduct">
            <Row>
              <Col>
                <Link to="/ProductLOT" className="backProduct btn btn-danger">
                  {" "}
                  กลับ{" "}
                </Link>
              </Col>

              <Col>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button className="save btn btn-success">บันทึก</button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Requisition;
