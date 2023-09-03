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

  //!date
  function formatDate(dateString) {
    if (!dateString) {
      return ""; // ถ้าไม่มีข้อมูลวันที่ให้แสดงเป็นข้อความว่าง
    }

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, options);
  }

  //!
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
  // กำหนด state และฟังก์ชันสำหรับเปลี่ยนหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  // คำนวณดัชนีแรกและดัชนีสุดท้ายของรายการที่ต้องแสดง
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // คัดลอกรายการที่ต้องแสดงสำหรับหน้าปัจจุบัน
  const records = showtable.slice(firstIndex, lastIndex);
  // คำนวณจำนวนหน้าทั้งหมด
  const npage = Math.ceil(showtable.length / recordsPerPage);
  // สร้างรายการของหมายเลขหน้า
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  console.log("records", records);

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
                style={{ marginLeft: "15px" }}
              >
                <option value="">สินค้าทั้งหมด</option>
                {nameproduct.map((item, index) => (
                  <option key={index} value={item.Name_product}>
                    {item.Name_product}
                  </option>
                ))}
              </select>
            </div>
          </Col>

          <Col className="add2">
            <Col
              className="col2"
              style={{
                marginRight: "15px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <button className="addProduct" onClick={() => navigate("")}>
                เบิกสินค้า
              </button>
              <button
                className="addProduct"
                onClick={() => navigate("/ImportProduct")}
              >
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
                <th>สินค้าทั้งหมด (ชิ้น)</th>
                <th>สินค้าคงเหลือ (ชิ้น)</th>
                <th>วันที่ทำรายการ</th>
                <th>วันที่หมดอายุ</th>
                <th>พนักงานที่เพิ่มสินค้า</th>
                {/* <th>หมายเหตุ</th> */}

                <th className="readtext">ข้อมูล</th>
              </tr>
            </thead>

            <tbody>
              {saveoption === "" // เช็คว่ายังไม่ได้เลือกตัวเลือก
                ? records.map((data, index) => (
                    <tr key={index}>
                      <td scope="row">{data.ID_lot}</td>
                      <td>{data.Name_product}</td>
                      <td>{data.Production_point}</td>
                      <td>{data.Quantity}</td>
                      <td>{data.Inventories_lot}</td>
                      <td>{formatDate(data.date_list)}</td>
                      <td>{formatDate(data.date_list_EXP)}</td>
                      <td>{data.fullname}</td>
                      {/* <td>{data.remark}</td> */}

                      <td className="centericon">
                        <div
                          className="read2"
                          onClick={() => navigate(`/ReadLOT/${data.ID_lot}`)}
                        >
                          <BiSearchAlt />
                        </div>
                      </td>
                    </tr>
                  ))
                : records.map((data, index) => (
                    <tr key={index}>
                      <td scope="row">{data.ID_lot}</td>
                      <td>{data.Name_product}</td>
                      <td>{data.Production_point}</td>
                      <td>{data.Quantity}</td>
                      <td>{data.Inventories_lot}</td>
                      <td>{formatDate(data.date_list)}</td>
                      <td>{formatDate(data.date_list_EXP)}</td>
                      <td>{data.fullname}</td>
                      {/* <td>{data.remark}</td> */}

                      <td className="centericon">
                        <div
                          className="read2"
                          onClick={() => navigate(`/ReadLOT/${records.ID_lot}`)}
                        >
                          <BiSearchAlt />
                        </div>
                      </td>
                    </tr>
                  ))}
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
