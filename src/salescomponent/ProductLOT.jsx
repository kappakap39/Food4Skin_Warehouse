// import React from "react";
import "../css/Salesperson.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiSearchAlt } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuNavSales from "./MenuNavSales";

function ProductLOT() {
  const navigate = useNavigate();

  // http://localhost:2001/NameProduct
  const [nameproduct, setNameproduct] = useState([]);
  const [saveoption, setSaveoption] = useState(""); // กำหนดค่าเริ่มต้นเป็นสตริงว่าง
  const [showtable, setShowtable] = useState([]);
  
  // useEffect(() => {
  //   if (saveoption !== "") { // ตรวจสอบว่า saveoption ไม่ใช่สตริงว่าง
  //     axios
  //       .get("http://localhost:2001/ShowProduct/" + saveoption)
  //       .then((res) => setShowtable(res.data))
  //       .catch((err) => console.log(err));
  //   } else {
  //     setShowtable([]);
  //   }
  // }, [saveoption]);

  const [initialData, setInitialData] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:2001/selectlot")
    .then((res) => setInitialData(res.data))
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  if (saveoption === "") {
    setShowtable(initialData); // แสดงข้อมูลเริ่มต้นเมื่อยังไม่ได้เลือกสินค้า
  } else {
    axios
      .get("http://localhost:2001/ShowProduct/" + saveoption)
      .then((res) => setShowtable(res.data))
      .catch((err) => console.log(err));
  }
}, [saveoption, initialData]);

  console.log("showtable", showtable);
  console.log("saveoption", saveoption);

  useEffect(() => {
    axios
      .get("http://localhost:2001/NameProduct")
      .then((res) => setNameproduct(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("nameproduct", nameproduct);
  //แสดงข้อมูลทั้งหมด
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/selectlot")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //!next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = showtable.slice(firstIndex, lastIndex);
  const npage = Math.ceil(showtable.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage < firstIndex) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === firstIndex) {
      setCurrentPage(changeCPage + 0);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  console.log("records",records);

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      {/* rounded ขอบมีมุม */}
      <div className="container1 ">
        <h3 className="h3">ตารางแสดงข้อมูลล็อตรายการสินค้า</h3>
        {/* <hr /> */}
        <Row>
          <Col md={2}>
            <div className="selectSale">
              <select
                name=""
                id=""
                type="text"
                className="form-select mb-4"
                onChange={(e) => setSaveoption(e.target.value)}
                style={{ marginLeft: '15px' }} 
              >
                <option value="">เลือกสินค้า</option>
                {nameproduct.map((item, index) => (
                  <option key={index} value={item.Name_product}>
                    {item.Name_product}
                  </option>
                ))}
              </select>
            </div>
          </Col>

          <Col className="add2">
            <Col className="col2" style={{ marginRight: '15px' ,marginBottom: '10px', marginTop: '10px'}} >
              <button className="addProduct" onClick={() => navigate("")}>
                เบิกสินค้า
              </button>
              <button className="addProduct" onClick={() => navigate("")}>
                รับเข้าสินค้า
              </button>
              {/* <button className="add mb-3" onClick={() => navigate("")}>
                <BiSolidUserPlus /> เพิ่ม
              </button> */}
            </Col>
          </Col>
        </Row>
        {/* <hr /> */}

        <div className="table-container">
          <table className=" table table-striped table-dark ">
            <thead className="table-secondary">
              <tr>
                <th>รหัสล็อต</th>
                <th>ชื่อผลิตภัณฑ์</th>
                <th>จุดต่ำกว่าจุดสั่งผลิต (ชิ้น)</th>
                <th>จำนวนสินค้า (ชิ้น)</th>
                <th>ราคาปลีก</th>
                <th>ราคาส่ง ระดับ1</th>
                <th>ราคาส่ง ระดับ2</th>
                <th>ราคาส่ง ระดับ3</th>
                <th>พนักงานที่เพิ่มสินค้า</th>

                <th className="readtext">ข้อมูล/แก้ไข</th>
              </tr>
            </thead>

<tbody>
  {saveoption === "" ? ( // เช็คว่ายังไม่ได้เลือกตัวเลือก
    initialData.map((data, index) => (
      <tr key={index}>
        <td scope="row">{data.ID_lot}</td>
        <td>{data.Name_product}</td>
        <td>{data.Production_point}</td>
        <td>{data.Inventories_lot}</td>
        <td>{data.Retail_price}</td>
        <td>{data.Level_1_price}</td>
        <td>{data.Level_2_price}</td>
        <td>{data.Level_3_price}</td>
        <td>{data.fullname}</td>

        <td className="centericon">
          <div className="read2">
            <BiSearchAlt />
          </div>
        </td>
      </tr>
    ))
  ) : (
    showtable.map((data, index) => (
      <tr key={index}>
        <td scope="row">{data.ID_lot}</td>
        <td>{data.Name_product}</td>
        <td>{data.Production_point}</td>
        <td>{data.Inventories_lot}</td>
        <td>{data.Retail_price}</td>
        <td>{data.Level_1_price}</td>
        <td>{data.Level_2_price}</td>
        <td>{data.Level_3_price}</td>
        <td>{data.fullname}</td>

        <td className="centericon">
          <div className="read2">
            <BiSearchAlt />
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>




          </table>
        </div>
        <nav className="Nextpage">

          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                หน้าก่อน
              </a>
            </li>
            {number.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                หน้าถัดไป
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductLOT;
