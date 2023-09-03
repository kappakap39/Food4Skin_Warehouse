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
import { BiSolidUserPlus } from "react-icons/bi";
import FormText from "react-bootstrap/esm/FormText";
import MenuNavSales from "./MenuNavSales";

function AddProduct() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  //add
  const [values, setValues] = useState({
    Name_product: "",
    Production_point: "",
    Retail_price: "",
    Level_1_price: "",
    Level_2_price: "",
    Level_3_price: "",
    ID_sales: `${userLoginData[0].ID_sales}`, 
  });
  console.log(values);
  const handleSubmit = (event) => {
    event.preventDefault();

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
    axios
      .post("http://localhost:2001/addproduct", {
        ...values,
      })
      .then((res) => {
        console.log(res);
        navigate("/Product");
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containerPRODUCT" action="" onSubmit={handleSubmit}>
        <h3 className="h3">เพิ่มข้อมูลสินค้า</h3>
        <div className="bodyImport">
          <span className="txt">
            <h6>*</h6>ชื่อสินค้า
          </span>
          <input
            class="form-control"
            name="Name_product"
            type="text"
            onChange={handleInput}
          />
          <Row>
            <Col>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>จุดต่ำกว่าจุดสั่งผลิต
                </span>
                <input
                  // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Production_point"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>ราคาปลีก
                </span>
                <input
                  // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Retail_price"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>ราคาระดับขั้น1
                </span>
                <input
                  // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_1_price"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>ราคาระดับขั้น2
                </span>
                <input
                  // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_2_price"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>ราคาระดับขั้น3
                </span>
                <input
                  // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_3_price"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }} className="spanProduct">
            <Row>
              <Col>
                <Link to="/Product" className="backProduct btn btn-danger">
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

export default AddProduct;
