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
import Validation from "../function/CreateSalesValidation.jsx";
import FormText from "react-bootstrap/esm/FormText";
import MenuNavSales from "./MenuNavSales";
import { useParams } from "react-router-dom";

function ReadProduct() {
  const [values, setValues] = useState({
    ID_product: "",
    Name_product: "",
    Production_point: "",
    Retail_price: "",
    Level_1_price: "",
    Level_2_price: "",
    Level_3_price: "",
    ID_sales: "",
    // ID_sales: `${userLoginData[0].ID_sales}`,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID_Product", id);
  // const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  //!Read
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/productOneUP/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          ID_product: res.data[0].ID_product,
          Name_product: res.data[0].Name_product,
          Production_point: res.data[0].Production_point,
          Retail_price: res.data[0].Retail_price,
          Level_1_price: res.data[0].Level_1_price,
          Level_2_price: res.data[0].Level_2_price,
          Level_3_price: res.data[0].Level_3_price,
          ID_sales: res.data[0].ID_sales,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerread">
        <h3 className="h3">แสดงข้อมูล {values.Name_product} </h3>
        <div>
          <Row>
            <Col>
              <span>ชื่อสินค้า</span>
              <input
                name="Name_product"
                type="text"
                className=""
                value={values.Name_product}
              />
              <span>จุดต่ำกว่าจุดสั่งผลิต</span>
              <input
                name="Production_point"
                type="text"
                value={values.Production_point}
              />
              <span>ราคาปลีก</span>
              <input
                name="Retail_price"
                type="text"
                value={values.Retail_price}
              />
              <span>ราคาระดับขั้น1</span>
              <input
                name="Level_1_price"
                type="text"
                value={values.Level_1_price}
              />
              <span>ราคาระดับขั้น2</span>
              <input
                name="Level_2_price"
                type="text"
                value={values.Level_2_price}
              />
              <span>ราคาระดับขั้น3</span>
              <input
                name="Level_3_price"
                type="text"
                value={values.Level_3_price}
              />
              {/* <span>พนักงานที่เพิ่มสินค้า</span> */}
              {/* <input type="text" disabled value={userLoginData[0].fullname} /> */}
            </Col>

            <Col className="add2"></Col>
          </Row>
          <br />
          <button
            onClick={() => navigate(`/UpdateProduct/${values.ID_product}`)}
          >
            แก้ไข
          </button>
          <button onClick={() => navigate(`/Product`)}>กลับ</button>

        </div>
      </form>
    </div>
  );
}

export default ReadProduct;
