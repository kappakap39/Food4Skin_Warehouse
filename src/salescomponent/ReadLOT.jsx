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

function ReadLOT() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID_Lot", id);
  // const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const [values, setValues] = useState({
    ID_product: "",
    Name_product: "",
    Quantity: "",
    Inventories_lot: "",
    date_list: "",
    date_list_EXP: "",
    remark: "",
    ID_sales: "",
    ID_lot: "",
    fullname: "",
  });

  //!Read
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/Showlot/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Name_product: res.data[0].Name_product,
          Quantity: res.data[0].Quantity,
          Inventories_lot: res.data[0].Inventories_lot,
          date_list: res.data[0].date_list,
          date_list_EXP: res.data[0].date_list_EXP,
          remark: res.data[0].remark,
          ID_sales: res.data[0].ID_sales,
          ID_product: res.data[0].ID_product,
          ID_lot: res.data[0].ID_lot,
          fullname: res.data[0].fullname,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  //!date
  function formatDate(dateString) {
    if (!dateString) {
      return ""; // ถ้าไม่มีข้อมูลวันที่ให้แสดงเป็นข้อความว่าง
    }

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerPRODUCT">
        <h3 className="h3">แสดงข้อมูลล็อตสินค้า</h3>

        <div className="bodyImport">
          {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
          <Row>
            <Col>
              <div className="spanProduct">
                <span>ชื่อสินค้า</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="fullname"
                  type="text"
                  value={values.Name_product}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span>พนักงานที่เพิ่มสินค้า</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
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
                <span>จำนวนสินค้า</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Quantity"
                  type="text"
                  value={values.Quantity}
                />
              </div>
            </Col>
            <Col>
              <div className="spanProduct">
                <span>สินค้าคงเหลือ</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="Inventories_lot"
                  type="text"
                  value={values.Inventories_lot}
                />
              </div>
            </Col>
          </Row>

          <div className="spanProduct">
            <Row>
              <Col>
                <span>วันที่ทำรายการ</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="date_list"
                  type="text"
                  value={formatDate(values.date_list)}
                />
              </Col>
              <Col>
                <span>วันที่หมดอายุ</span>
                <input
                  style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                  class="form-control"
                  name="date_list_EXP"
                  type="text"
                  value={formatDate(values.date_list_EXP)}
                />
              </Col>
            </Row>
          </div>
          <div className="spanProduct">
            <span>หมายเหตุ</span>
            <textarea
              style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
              class="form-control"
              name="remark"
              type="text"
              value={values.remark}
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

              <Col></Col>
            </Row>
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default ReadLOT;
