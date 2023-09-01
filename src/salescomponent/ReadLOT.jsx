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
      <form form className="containerread">
        <h3 className="h3">แสดงข้อมูลล็อตสินค้า</h3>
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
              <span>จำนวนสินค้า</span>
              <input name="Quantity" type="text" value={values.Quantity}/>
              <span>สินค้าคงเหลือ</span>
              <input name="Inventories_lot" type="text" value={values.Inventories_lot}/>
              <span>วันที่ทำรายการ</span>
              <input name="date_list" type="text" value={formatDate(values.date_list)}/>
              <span>วันที่หมดอายุ</span>
              <input name="date_list_EXP" type="text" value={formatDate(values.date_list_EXP)}/>
              <span>หมายเหตุ</span>
              <textarea name="remark" type="text" value={values.remark}/>
              <span>พนักงานที่เพิ่มสินค้า</span>
              <input name="fullname" type="text" value={values.fullname}/>
            </Col>

            <Col className="add2"></Col>
          </Row>
          <br />
          <button onClick={() => navigate(`/ProductLOT`)}>กลับ</button>
        </div>
      </form>
    </div>
  );
}

export default ReadLOT;
