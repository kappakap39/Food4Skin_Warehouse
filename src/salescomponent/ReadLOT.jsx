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

import { BsPrinterFill } from "react-icons/bs";
import { FcSynchronize } from "react-icons/fc";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ReadLOT() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID_Lot", id);
  // const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const [values, setValues] = useState({
    ID_product: "",
    Name_product: "",
    Bill: "",
    Quantity: "",
    Inventories_lot: "",
    date_list: "",
    date_list_EXP: "",
    remark: "",
    ID_sales: "",
    ID_lot: "",
    fullname: "",
    date_import: "",
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
          date_import: res.data[0].date_import,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  //แสดงข้อมูลทั้งหมด
  const [dataLOT, setDataLOT] = useState([]);
  //! Export
  useEffect(() => {
    axios
      .get("http://localhost:2001/ShowProductLOT/" + id)
      .then((res) => setDataLOT(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("DATA :", dataLOT);

  //!date
  function formatDate(dateString) {
    if (!dateString) {
      return ""; // ถ้าไม่มีข้อมูลวันที่ให้แสดงเป็นข้อความว่าง
    }

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, options);
  }
  function formatDateY(dateString) {
    if (!dateString) {
      return ""; // ถ้าไม่มีข้อมูลวันที่ให้แสดงเป็นข้อความว่าง
    }
  
    const date = new Date(dateString);
  
    // ลบ 543 จากปีพ.ศ. เพื่อแสดงในรูปแบบค.ศ.
    const yearBC = date.getFullYear();
  
    return yearBC.toString(); // แสดงปีค.ศ. เป็นข้อความ
  }

  //!next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataLOT.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataLOT.length / recordsPerPage);
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

  //!PDF
  function generatePDF() {
    const pdf = new jsPDF("l", "mm", "a4"); // สร้างอ็อบเจ็กต์ PDF แนวนอน (landscape)
    const pdfWidth = pdf.internal.pageSize.width;
    const pdfHeight = pdf.internal.pageSize.height;
    const margin = 10; // ขอบ 10 พิกเซล

    // กำหนดสีพื้นหลังของเอกสารเป็นสีดำ
    pdf.setFillColor(255); // สีพื้นหลังขาว (RGB)
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F"); // วาดกล่องสีดำลงบนหน้ากระดาษทั้งหมด

    const table = document.querySelector(".table"); // เลือกตาราง HTML

    // กำหนดสีขอบเป็นสีดำ
    pdf.setDrawColor(255); // สีขอบขาว (RGB)

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // แปลง HTML เป็นรูปภาพ

      const imgWidth = pdfWidth - 2 * margin; // ขนาดกว้างของรูปภาพเท่ากับความกว้างของเอกสารลบขอบมารอบ
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // ปรับค่าของ imgX, imgY, และ downloadDateX ดังนี้
      const imgX = (pdfWidth - imgWidth) / 2; // ภาพอยู่ตรงกลางแนวนอน
      const imgY = (pdfHeight - imgHeight) / 2; // ภาพอยู่ตรงกลางแนวตั้ง
      // const downloadDateX = pdfWidth - margin - downloadDateWidth; // คำอธิบายอยู่ทางขวาขอบกระดาษ

      // คำนวณตำแหน่งแนวนอนของภาพและคำอธิบาย
      // const imgX = margin; // ภาพอยู่ทางซ้าย
      // const imgY = margin + 20; // ภาพอยู่ห่างจากด้านบน 20 พิกเซล
      const downloadDateX =
        pdfWidth -
        margin -
        (pdf.getStringUnitWidth(
          "Download date : " + new Date().toLocaleDateString()
        ) *
          10) /
          pdf.internal.scaleFactor; // คำอธิบายอยู่ทางขวา

      // เริ่มเพิ่มเนื้อหาใน PDF
      pdf.setFontSize(16); // กำหนดขนาดฟอนต์สำหรับหัวข้อ
      pdf.setTextColor(0); // สีข้อความดำ (RGB)
      const textWidth =
        (pdf.getStringUnitWidth("LOT Food4Skin") * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textX = (pdfWidth - textWidth) / 2; // คำนวณตำแหน่ง X สำหรับหัวข้อ
      pdf.text("LOT Food4Skin", textX, margin + 10); // เพิ่มหัวข้อ "LOT Food4Skin" ที่ตำแหน่งตรงกลางและห่างจากตาราง 20 พิกเซล

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight); // เพิ่มรูปภาพลงใน PDF

      // เพิ่มข้อความ "วันที่ดาวน์โหลด" ชิดขวา
      const downloadDate = "Download date : " + new Date().toLocaleDateString();
      pdf.setFontSize(10); // กำหนดขนาดฟอนต์สำหรับข้อความ
      pdf.setTextColor(0); // กำหนดสีข้อความดำ (RGB)
      pdf.text(downloadDate, downloadDateX, pdfHeight - margin - 5); // เพิ่มข้อความ "วันที่ดาวน์โหลด"

      pdf.save("Food4Skin.pdf"); // ดาวน์โหลด PDF ด้วยชื่อ "Food4Skin.pdf"
    }); // เพิ่มวงเล็บปิดนี้
  }
  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerPRODUCT">
        <h3 className="h3">แสดงข้อมูลล็อตสินค้า</h3>

        <div className="bodyImportLOT">
          {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
          <Row>
            <Col md={4}>
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
                    <span>วันที่นำเข้า</span>
                    <input
                      style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      class="form-control"
                      name="date_import"
                      type="text"
                      value={formatDate(values.date_import)}
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
                    <span>วันที่ผลิต</span>
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
            </Col>
            <Col md={8}>
              <div className="table-containerLOT" style={{height:"330px"}} >
                <table className=" table table-striped table-dark " >
                  <thead className="table-secondary">
                    <tr>
                      <th>รหัสบิล</th>
                      <th>รหัสล็อต</th>
                      <th>จำนวน(ชิ้น)</th>
                      <th>ชื่อผู้รับ</th>
                      <th>วันที่ทำรายการ</th>
                      <th>พนักงาน</th>
                      <th>หมายเหตุ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((records, index) => {
                      return (
                        <tr key={index}>
                          <td scope="row">{`${formatDateY(
                            records.Dete_requisition
                          )}-${records.Bill}`}</td>
                          <td scope="row">{`${formatDateY(
                            records.date_list
                          )}-${records.Lot_ID}`}</td>
                          {/* <td>{records.Name_product}</td> */}
                          <td>{records.Amount_products}</td>
                          <td>{records.agent_fullname}</td>
                          <td>{formatDate(records.Dete_requisition)}</td>
                          <td>{records.sales_fullname}</td>
                          <td>{records.remark}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
                <nav className="Nextpage">
                  {/* <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {number.slice(0, 1).map((n, i) => (
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
                Next
              </a>
            </li>
          </ul> */}

                  <ul className="pagination">
                    <li className="page-item">
                      <a href="#" className="page-link" onClick={prePage}>
                        หน้าก่อน
                      </a>
                    </li>
                    {number.map((n, i) => (
                      <li
                        className={`page-item ${
                          currentPage === n ? "active" : ""
                        }`}
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

              <Col style={{ display: "flex", justifyContent: "end" }}>
                <button
                  style={{ backgroundColor: "white", marginBottom: "10px" }}
                  className="addProduct"
                  type="button" // Add this line
                  onClick={generatePDF}
                >
                  <BsPrinterFill />
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReadLOT;
