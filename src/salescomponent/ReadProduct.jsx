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
    fullname: "",
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
          fullname: res.data[0].fullname,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerPRODUCT">
        <h3 className="h3">แสดงข้อมูล {values.Name_product} </h3>
        <div className="bodyImport">
          <Row>
            <Col>
            <div className="spanProduct">
            <span style={{ color: "white" }}>ชื่อสินค้า</span>
            <input
              style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
              class="form-control"
              name="Name_product"
              type="text"
              value={values.Name_product}
            />
          </div>
            </Col>
            <Col>
            <div className="spanProduct">
            <span style={{ color: "white" }}>ชื่อพนักงานที่เพิ่ม</span>
            <input
              style={{
                backgroundColor: " rgba(240, 248, 255, 0.814)",
                
              }}
              class="form-control"
              name="fullname"
              type="text"
              value={values.fullname}
            />
          </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="spanProduct">
            <span style={{ color: "white" }}>จุดต่ำกว่าจุดสั่งผลิต</span>
            <input
              style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
              class="form-control"
              name="Production_point"
              type="text"
              value={values.Production_point}
            />
          </div>
            </Col>
            <Col>
            <div className="spanProduct">
            <span style={{ color: "white" }}>ราคาปลีก</span>
            <input
              style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
              class="form-control"
              name="Retail_price"
              type="text"
              value={values.Retail_price}
            />
          </div>
            </Col>
          </Row>
          
          
          <Row>
            <Col>
              <div className="spanProduct">
                <span style={{ color: "white" }}>ราคาระดับขั้น1</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_1_price"
                  type="text"
                  value={values.Level_1_price}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span style={{ color: "white" }}>ราคาระดับขั้น2</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_2_price"
                  type="text"
                  value={values.Level_2_price}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span style={{ color: "white" }}>ราคาระดับขั้น3</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Level_3_price"
                  type="text"
                  value={values.Level_3_price}
                />
              </div>
            </Col>
          </Row>
          
          <Row style={{marginTop: "20px"}}>
            <Col>
              <button onClick={() => navigate(`/Product`)} className="backProduct btn btn-danger">กลับ</button>
            </Col>
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={() => navigate(`/UpdateProduct/${values.ID_product}`)}
                className="bgedit btn"
              >
                แก้ไข
              </button>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}

export default ReadProduct;
