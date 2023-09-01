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
 console.log(values)
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
      <form className="containeradd" action="" onSubmit={handleSubmit}>
        <h3 className="h3">เพิ่มข้อมูลสินค้า</h3>
        <div>
          <Row>
            <Col>
              <span>ชื่อสินค้า</span>
              <input name="Name_product" type="text" className="" onChange={handleInput}/>
              <span>จุดต่ำกว่าจุดสั่งผลิต</span>
              <input name="Production_point" type="text" onChange={handleInput}/>
              <span>ราคาปลีก</span>
              <input name="Retail_price" type="text" onChange={handleInput}/>
              <span>ราคาระดับขั้น1</span>
              <input name="Level_1_price" type="text" onChange={handleInput}/>
              <span>ราคาระดับขั้น2</span>
              <input name="Level_2_price" type="text" onChange={handleInput}/>
              <span>ราคาระดับขั้น3</span>
              <input name="Level_3_price" type="text" onChange={handleInput}/>
            </Col>

            <Col className="add2"></Col>
          </Row>
          <br />
          <button>บันทึก</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
