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
import Validation from "../function/CreateProduct";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddProduct() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

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

  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();

    const err = Validation({ ...values });
    setErrors(err);

    if (
      err.Name_product === "" &&
      err.Production_point === "" &&
      err.Retail_price === "" &&
      err.Level_1_price === "" &&
      err.Level_2_price === "" &&
      err.Level_3_price === ""
    ) {
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
      axios
        .post("http://localhost:2001/addproduct", {
          ...values,
        })
        .then((res) => {
          console.log(res);
          MySwal.fire({
            title: <strong>ทำการเพิ่มรายการสินค้าเสร็จสิ้น</strong>,
            // html: <i>คุณเข้าสู่ระบบในตำแหน่งพนักงานฝ่ายขาย</i>,
            icon: "success",
          });
          navigate("/Product");
        })
        .catch((err) => console.log(err));
    }
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
          <Row>
            <Col>
              <Row>
                <Col>
                  <span className="txt">
                    <h6>*</h6>ชื่อสินค้า
                  </span>
                  <input
                    class="form-control"
                    name="Name_product"
                    type="text"
                    onChange={handleInput}
                  />
                </Col>
                {errors.Name_product && (
                  <div className="erroredit">
                    <Col>
                      <span
                        style={{ paddingTop: "10%" }}
                        className="text-danger"
                      >
                        {errors.Name_product}
                      </span>
                    </Col>
                  </div>
                )}
              </Row>
            </Col>
            <Col>
              <span className="txt">ผู้ทำรายการ</span>
              <input
                style={{ backgroundColor: "#ffffffd7" }}
                class="form-control"
                name=""
                type="text"
                value={userLoginData[0].fullname}
                onChange={handleInput}
              />
            </Col>
          </Row>

          <Row>
            <Col>
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
                      type="number"
                      onChange={handleInput}
                    />
                  </div>
                </Col>
                {errors.Production_point && (
                  <div className="erroredit">
                    <Col>
                      <span
                        style={{ paddingTop: "10%" }}
                        className="text-danger"
                      >
                        {errors.Production_point}
                      </span>
                    </Col>
                  </div>
                )}
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">
                      <h6>*</h6>ราคาปลีก
                    </span>
                    <input
                      // style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      class="form-control"
                      name="Retail_price"
                      type="number"
                      onChange={handleInput}
                    />
                  </div>
                </Col>
                {errors.Retail_price && (
                  <div className="erroredit">
                    <Col>
                      <span
                        style={{ paddingTop: "10%" }}
                        className="text-danger"
                      >
                        {errors.Retail_price}
                      </span>
                    </Col>
                  </div>
                )}
              </Row>
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
                  type="number"
                  onChange={handleInput}
                />
              </div>
              {errors.Level_1_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_1_price}</span>
                  </Col>
                </div>
              )}
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
                  type="number"
                  onChange={handleInput}
                />
              </div>
              {errors.Level_2_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_2_price}</span>
                  </Col>
                </div>
              )}
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
                  type="number"
                  onChange={handleInput}
                />
              </div>
              {errors.Level_3_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_3_price}</span>
                  </Col>
                </div>
              )}
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
