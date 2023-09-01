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

function ImportProduct() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  //! select
  const [nameproduct, setNameproduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/NameProduct")
      .then((res) => setNameproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  //!add
  const [values, setValues] = useState({
    ID_product: "",
    Inventories_lot: "",
    date_list: "",
    date_list_EXP: "",
    Quantity: "",
    remark: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
  });
  console.log("ข้อมูลที่กรอก",values);
  const handleSubmit = (event) => {
    event.preventDefault();

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
    axios
      .post("http://localhost:2001/addproductLOT", {
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
              {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
              <div className="selectSale">
                <select
                  name="ID_product"
                  id="ID_product"
                  type="text"
                  className="form-select mb-4"
                  onChange={handleInput}
                  style={{ marginLeft: "15px" }}
                >
                  <option value="">เลือกสินค้า</option>
                  {nameproduct.map((item, index) => (
                    <option key={index} value={item.ID_product}>
                      {item.Name_product}
                    </option>
                  ))}
                </select>
              </div>
              <span>จำนวนสินค้า</span>
              <input
                name="Quantity"
                type="text"
                onChange={handleInput}
              />
              <span>สินค้าคงเหลือ</span>
              <input name="Inventories_lot" type="text" onChange={handleInput} />
              <span>วันที่ทำรายการ</span>
              <input name="date_list" type="date" onChange={handleInput} />
              <span>วันที่หมดอายุ</span>
              <input name="date_list_EXP" type="date" onChange={handleInput} />
              <span>หมายเหตุ</span>
              <input name="remark" type="text" onChange={handleInput} />
              {/* <span>พนักงานที่เพิ่มสินค้า</span> */}
              {/* <input type="text" disabled value={userLoginData[0].fullname} /> */}
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

export default ImportProduct;
