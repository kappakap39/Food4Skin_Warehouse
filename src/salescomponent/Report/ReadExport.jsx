import React, { useEffect } from "react";
import "../../css/Addsales.css";

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
import MenuNavSales from "../MenuNavSales";
import { useParams } from "react-router-dom";

import { BsPrinterFill } from "react-icons/bs";
import { FcSynchronize } from "react-icons/fc";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ExportPDF from "./PDF/ExportPDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
function ReadExport() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Bill", id);
  // const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  const [values, setValues] = useState({
    Bill: "",
    Dete_requisition: "",
    agent_fullname: "",
    sales_fullname: "",
    province: "",
    districts: "",
    subdistricts: "",
    zip_code: "",
    Address: "",
    Tel: "",
    //!ข้อมูลในตาราง
    date_import: "",
    Lot_ID: "",
    Name_product: "",
    Amount_products: "",
  });

  //!Read
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/ShowBill/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Bill: res.data[0].Bill,
          Dete_requisition: res.data[0].Dete_requisition,
          agent_fullname: res.data[0].agent_fullname,
          sales_fullname: res.data[0].sales_fullname,
          province: res.data[0].province,
          districts: res.data[0].districts,
          subdistricts: res.data[0].subdistricts,
          zip_code: res.data[0].zip_code,
          Address: res.data[0].Address,
          Tel: res.data[0].Tel,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("values", values);
  //แสดงข้อมูลทั้งหมด
  const [dataLOT, setDataLOT] = useState([]);
  //! Export
  useEffect(() => {
    axios
      .get("http://localhost:2001/ShowProductBill/" + id)
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

    // ลบ 543 จากปีพ.ศ. เพื่อแสดงในรูปแบบค.ศ.
    // const yearBC = date.getFullYear() - 543;
    // date.setFullYear(yearBC);

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
  const recordsPerPage = 6;
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
  // function generatePDF() {
  //   const pdf = new jsPDF("l", "mm", "a4"); // สร้างอ็อบเจ็กต์ PDF แนวนอน (landscape)
  //   const pdfWidth = pdf.internal.pageSize.width;
  //   const pdfHeight = pdf.internal.pageSize.height;
  //   const margin = 10; // ขอบ 10 พิกเซล

  //   // กำหนดสีพื้นหลังของเอกสารเป็นสีดำ
  //   pdf.setFillColor(255); // สีพื้นหลังขาว (RGB)
  //   pdf.rect(0, 0, pdfWidth, pdfHeight, "F"); // วาดกล่องสีดำลงบนหน้ากระดาษทั้งหมด

  //   const table = document.querySelector(".table"); // เลือกตาราง HTML

  //   // กำหนดสีขอบเป็นสีดำ
  //   pdf.setDrawColor(255); // สีขอบขาว (RGB)

  //   html2canvas(table).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png"); // แปลง HTML เป็นรูปภาพ

  //     const imgWidth = pdfWidth - 2 * margin; // ขนาดกว้างของรูปภาพเท่ากับความกว้างของเอกสารลบขอบมารอบ
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     // ปรับค่าของ imgX, imgY, และ downloadDateX ดังนี้
  //     const imgX = (pdfWidth - imgWidth) / 2; // ภาพอยู่ตรงกลางแนวนอน
  //     const imgY = (pdfHeight - imgHeight) / 2; // ภาพอยู่ตรงกลางแนวตั้ง
  //     // const downloadDateX = pdfWidth - margin - downloadDateWidth; // คำอธิบายอยู่ทางขวาขอบกระดาษ

  //     // คำนวณตำแหน่งแนวนอนของภาพและคำอธิบาย
  //     // const imgX = margin; // ภาพอยู่ทางซ้าย
  //     // const imgY = margin + 20; // ภาพอยู่ห่างจากด้านบน 20 พิกเซล
  //     const downloadDateX =
  //       pdfWidth -
  //       margin -
  //       (pdf.getStringUnitWidth(
  //         "Download date : " + new Date().toLocaleDateString()
  //       ) *
  //         10) /
  //         pdf.internal.scaleFactor; // คำอธิบายอยู่ทางขวา

  //     // เริ่มเพิ่มเนื้อหาใน PDF
  //     pdf.setFontSize(16); // กำหนดขนาดฟอนต์สำหรับหัวข้อ
  //     pdf.setTextColor(0); // สีข้อความดำ (RGB)
  //     const textWidth =
  //       (pdf.getStringUnitWidth("LOT Food4Skin") * pdf.internal.getFontSize()) /
  //       pdf.internal.scaleFactor;
  //     const textX = (pdfWidth - textWidth) / 2; // คำนวณตำแหน่ง X สำหรับหัวข้อ
  //     pdf.text("LOT Food4Skin", textX, margin + 10); // เพิ่มหัวข้อ "LOT Food4Skin" ที่ตำแหน่งตรงกลางและห่างจากตาราง 20 พิกเซล

  //     pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight); // เพิ่มรูปภาพลงใน PDF

  //     // เพิ่มข้อความ "วันที่ดาวน์โหลด" ชิดขวา
  //     const downloadDate = "Download date : " + new Date().toLocaleDateString();
  //     pdf.setFontSize(10); // กำหนดขนาดฟอนต์สำหรับข้อความ
  //     pdf.setTextColor(0); // กำหนดสีข้อความดำ (RGB)
  //     pdf.text(downloadDate, downloadDateX, pdfHeight - margin - 5); // เพิ่มข้อความ "วันที่ดาวน์โหลด"

  //     pdf.save("Food4Skin.pdf"); // ดาวน์โหลด PDF ด้วยชื่อ "Food4Skin.pdf"
  //   }); // เพิ่มวงเล็บปิดนี้
  // }

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerPRODUCT">
        <h3 className="h3">แสดงข้อมูลรายการบิลเบิก</h3>

        <div className="bodyImportLOT">
          {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
          <Row>
            <Col md={4}>
              <Row>
                <Col>
                  <div className="spanProduct">
                    <span>รหัสบิล</span>
                    <input
                      style={{ backgroundColor: "rgba(240, 248, 255, 0.814)" }}
                      className="form-control"
                      type="text"
                      value={`${formatDateY(values.Dete_requisition)}-${
                        values.Bill
                      }`}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct">
                    <span>วันที่ทำรายการ</span>
                    <input
                      style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      class="form-control"
                      name="Dete_requisition"
                      type="text"
                      value={formatDate(values.Dete_requisition)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="spanProduct">
                    <span>ตัวแทนจำหน่าย</span>
                    <input
                      style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      class="form-control"
                      name="agent_fullname"
                      type="text"
                      value={values.agent_fullname}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct">
                    <span>พนักงานที่ทำรายการ</span>
                    <input
                      style={{ backgroundColor: " rgba(240, 248, 255, 0.814)" }}
                      class="form-control"
                      name="sales_fullname"
                      type="text"
                      value={values.sales_fullname}
                    />
                  </div>
                </Col>
              </Row>

              <div className="spanProduct">
                <span>ที่อยู่</span>
                <textarea
                  style={{
                    backgroundColor: " rgba(240, 248, 255, 0.814)",
                    height: "160px",
                  }}
                  class="form-control"
                  name=""
                  type="text"
                  value={`จังหวัด: ${values.province} 
อำเภอ: ${values.districts} 
ตำบล: ${values.subdistricts} 
รหัสไปรษณีย์: ${values.zip_code}
เบอร์โทร: ${values.Tel} 
ที่อยู่เพิ่มเติม: ${values.Address} `}
                />
              </div>
            </Col>
            <Col md={8}>
              <div className="table-containerLOT" style={{ height: "350px" }}>
                <Row>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4>รายการบิล</h4>
                  </div>
                </Row>
                <table className=" table table-striped table-dark ">
                  <thead className="table-secondary">
                    <tr>
                      <th>รหัสล็อต</th>
                      <th>ชื่อสินค้า</th>
                      <th>จำนวน(ชิ้น)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((records, index) => {
                      return (
                        <tr key={index}>
                          <td scope="row">{`${formatDateY(
                            records.date_import
                          )}-${records.Lot_ID}`}</td>
                          <td>{records.Name_product}</td>
                          <td>{records.Amount_products}</td>
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
                <Link
                  to="/MenutabReport"
                  className="backProduct btn btn-danger"
                >
                  {" "}
                  กลับ{" "}
                </Link>
              </Col>

              <Col style={{ display: "flex", justifyContent: "end" }}>
                {/* <button
                  style={{ backgroundColor: "white", marginBottom: "10px" }}
                  className="addProduct"
                  type="button" // Add this line
                  onClick={generatePDF}
                >
                  <BsPrinterFill />
                </button> */}
                <PDFDownloadLink
                  className="PDFbill btn"
                  fileName="BillProductFood4skin.pdf" // กำหนดชื่อไฟล์ PDF
                  style={{
                    backgroundColor: "white",
                    marginBottom: "10px",
                    marginRight: "3%",
                  }}
                  type="button"
                  document={<ExportPDF values={values} records={records} />} // ส่งข้อมูลที่ต้องการแสดงใน PDF
                >
                  <BsPrinterFill />
                </PDFDownloadLink>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReadExport;
