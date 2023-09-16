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

function ImportProduct() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  //!เพิ่มข้อมูลหลายชุด
  const [importedProducts, setImportedProducts] = useState([]);
  const [allImportedProducts, setAllImportedProducts] = useState([]); // เก็บข้อมูลทั้งหมดที่คุณต้องการบันทึกลงในฐานข้อมูล

  const handleAddProduct = () => {
    // ตรวจสอบว่าข้อมูลสินค้าถูกกรอกครบหรือไม่
    if (
      values.ID_product &&
      values.date_import &&
      values.date_list &&
      values.date_list_EXP &&
      values.Quantity &&
      values.Inventories_lot &&
      values.remark &&
      values.ID_sales
    ) {
      // สร้างอ็อบเจ็กต์ใหม่เพื่อเก็บข้อมูลสินค้าที่เพิ่ม
      const newProduct = {
        ID_product: values.ID_product,
        date_import: values.date_import, // ให้ค่า date_import เป็นค่าปัจจุบันทุกครั้ง
        date_list: values.date_list,
        date_list_EXP: values.date_list_EXP,
        Quantity: values.Quantity,
        Inventories_lot: values.Inventories_lot,
        remark: values.remark,
        ID_sales: values.ID_sales,
      };
  
      // เพิ่มข้อมูลสินค้าใหม่ลงใน State
      setImportedProducts([...importedProducts, newProduct]);
      setAllImportedProducts([...allImportedProducts, newProduct]);
  
      // ล้างค่าใน State ที่ใช้ในการกรอกข้อมูล
      setValues((prevValues) => ({
        ...prevValues,
        // ID_product: "",
        // date_import: "", // ไม่ต้องล้างค่า date_import ที่นี่
        // date_list: "",
        // date_list_EXP: "",
        // Quantity: "",
        // Inventories_lot: "",
        // remark: "",
      }));
    } else {
      // แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };  

  console.log("importedProducts",importedProducts)
  //!date
  useEffect(() => {
    // สร้างวันที่ปัจจุบันในรูปแบบ ISO (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];

    // กำหนดค่าเริ่มต้นให้กับ date_import เป็นวันที่ปัจจุบัน
    setValues((prev) => ({ ...prev, date_import: currentDate }));
  }, []);

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
    date_import: "",
    date_list: "",
    date_list_EXP: "",
    Quantity: "",
    Inventories_lot: "",
    remark: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
  });
  console.log("ข้อมูลที่กรอก", values);
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลต่อไป
  //   axios
  //     .post("http://localhost:2001/addproductLOT", {
  //       ...values,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/ProductLOT");
  //     })
  //     .catch((err) => console.log(err));
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (importedProducts.length === 0) {
      alert("ยังไม่มีข้อมูลสินค้าที่เพิ่ม");
      return;
    }
  
    // ส่งข้อมูล importedProducts ไปยังเซิร์ฟเวอร์
    axios
      .post("http://localhost:2001/addproductLOT", {
        importedProducts,
      })
      .then((res) => {
        console.log(res);
        navigate("/ProductLOT");
      })
      .catch((err) => console.log(err));
  };
  

  // ใช้ useEffect เพื่อติดตามการเปลี่ยนแปลงใน Quantity
  useEffect(() => {
    // อัปเดตค่า Inventories_lot ให้เท่ากับ Quantity เมื่อ Quantity มีการเปลี่ยนแปลง
    setValues((prev) => ({ ...prev, Inventories_lot: prev.Quantity }));
  }, [values.Quantity]); // เซ็ต dependencies เป็น values.Quantity เพื่อให้ useEffect ทำงานเมื่อ Quantity เปลี่ยนแปลง

  const handleInput = (event) => {
    const { name, value } = event.target;

    // ตรวจสอบว่าค่าที่ป้อนเป็นติดลบหรือไม่
    if (name === "Quantity") {
      // ถ้าเป็นค่าติดลบให้กำหนดค่าให้เป็น 1
      const quantityValue = Number(value);
      if (quantityValue < 1) {
        setValues((prev) => ({ ...prev, Quantity: "1" }));
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
        <div className="bodyImportLOT">
          <Row>
            <Col md={4}>
              {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
              <div className="spanProduct">
                <Row>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>ชื่อสินค้า
                    </span>
                    <select
                      name="ID_product"
                      id="ID_product"
                      type="text"
                      className="form-select"
                      onChange={handleInput}
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
              <Row>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">
                      <h6>*</h6>จำนวนสินค้า
                    </span>
                    <input
                      class="form-control"
                      name="Quantity"
                      type="number"
                      onChange={handleInput}
                    />
                  </div>
                </Col>
                {/* <Col>
              <div className="spanProduct">
                <span>สินค้าคงเหลือ</span>
                <input
                  class="form-control"
                  name="Inventories_lot"
                  type="number"
                  onChange={handleInput}
                />
              </div>
            </Col> */}
              </Row>

              <div className="spanProduct">
                <Row>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>วันที่ผลิต
                    </span>
                    <input
                      class="form-control"
                      name="date_list"
                      type="date"
                      onChange={handleInput}
                    />
                  </Col>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>วันที่หมดอายุ
                    </span>
                    <input
                      class="form-control"
                      name="date_list_EXP"
                      type="date"
                      onChange={handleInput}
                    />
                  </Col>
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
                </Row>
                <div className="spanProduct">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddProduct}
                  >
                    เพิ่มสินค้า
                  </button>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="table-containerLOT">
                <table className=" table table-striped table-dark ">
                  <thead className="table-secondary">
                    <tr>
                      <th>รหัสสินค้า</th>
                      <th>จำนวน(ชิ้น)</th>
                      <th>วันที่ผลิต</th>
                      <th>วันที่หมดอายุ</th>
                      <th>หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importedProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.ID_product}</td>
                        <td>{product.Quantity}</td>
                        <td>{product.date_list}</td>
                        <td>{product.date_list_EXP}</td>
                        <td>{product.remark}</td>
                      </tr>
                    ))}
                  </tbody>

                  {/* <tbody>
                    {records.map((records, index) => {
                      return (
                        <tr key={index}>
                          <td scope="row">{records.ID_requisition}</td>
                          <td>{records.Amount_products}</td>
                          <td>{records.agent_fullname}</td>
                          <td>{formatDate(records.Dete_requisition)}</td>
                          <td>{records.sales_fullname}</td>
                          <td>{records.remark}</td>
                        </tr>
                      );
                    })}
                  </tbody> */}
                </table>
              </div>
            </Col>
          </Row>

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
                  <button className="save btn btn-success" onClick={handleSubmit} >บันทึก</button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ImportProduct;
