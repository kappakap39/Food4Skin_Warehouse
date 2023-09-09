import "../../css/Salesperson.css";
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
import { BsPrinterFill } from "react-icons/bs";
import { FcSynchronize } from "react-icons/fc";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function Expire() {
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

  //! ค้นหา
  // http://localhost:2001/NameProduct
  const [nameproduct, setNameproduct] = useState([]);
  const [saveoption, setSaveoption] = useState(""); // กำหนดค่าเริ่มต้นเป็นสตริงว่าง
  const [showtable, setShowtable] = useState([]);

  const [initialData, setInitialData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:2001/selectlot")
  //     .then((res) => setInitialData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (saveoption === "") {
      setShowtable(initialData); // แสดงข้อมูลเริ่มต้นเมื่อยังไม่ได้เลือกสินค้า
    } else {
      axios
        .get("http://localhost:2001/ShowProductTAB/" + saveoption)
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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:2001/selectlot")
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const [startDate, setStartDate] = useState(""); // เก็บวันเริ่มต้น
  const [endDate, setEndDate] = useState(""); // เก็บวันสิ้นสุด

  useEffect(() => {
    let apiUrl = "http://localhost:2001/selectlotExpire";

    if (startDate && endDate) {
      apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }

    axios
      .get(apiUrl)
      .then((res) => setInitialData(res.data))
      .catch((err) => console.log(err));
  }, [startDate, endDate]);

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

  console.log("start-endDate", startDate, endDate);

  // นับผลรวมของคอลัมน์ Inventories_lot
  const totalInventories = showtable.reduce((total, item) => {
    return total + item.Inventories_lot;
  }, 0);

  console.log("totalInventories", totalInventories);
  console.log("Inventories_lot", data.Inventories_lot);

  //!PDF
  // function generatePDF() {
  //   const pdf = new jsPDF("l", "mm", "a4"); // สร้างอ็อบเจ็กต์ PDF แนวนอน (landscape)
  //   const pdfWidth = pdf.internal.pageSize.width;
  //   const pdfHeight = pdf.internal.pageSize.height;
  //   const margin = 10; // ขอบ 10 พิกเซล

  //   const table = document.querySelector(".table"); // เลือกตาราง HTML

  //   // กำหนดสีขอบและสีพื้นหลังเป็นโปร่งใส (transparent)
  //   pdf.setDrawColor(255, 255, 255, 0); // สีขอบ (RGB) + ความโปร่งใส
  //   pdf.setFillColor(255, 255, 255, 0); // สีพื้นหลัง (RGB) + ความโปร่งใส

  //   html2canvas(table).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png"); // แปลง HTML เป็นรูปภาพ

  //     const imgWidth = pdfWidth - 2 * margin; // ขนาดกว้างของรูปภาพเท่ากับความกว้างของเอกสารลบขอบมารอบ
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     // ลบสีขอบออก
  //     pdf.rect(margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin, "S"); // วาดกล่องขอบรอบรอบรูปภาพโดยไม่มีสีขอบ

  //     // เริ่มเพิ่มเนื้อหาใน PDF
  //     pdf.setFontSize(16); // กำหนดขนาดฟอนต์สำหรับหัวข้อ
  //     const textWidth = pdf.getStringUnitWidth("LOT Food4Skin") * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  //     const textX = (pdfWidth - textWidth) / 2; // คำนวณตำแหน่ง X สำหรับหัวข้อ
  //     pdf.text("LOT Food4Skin", textX, margin + 20); // เพิ่มหัวข้อ "LOT Food4Skin" ที่ตำแหน่งตรงกลางและห่างจากตาราง 20 พิกเซล

  //     pdf.addImage(imgData, "PNG", margin, margin + 2 * margin + 20, imgWidth, imgHeight); // เพิ่มรูปภาพลงใน PDF แบบเต็มหน้ากระดาษ

  //     // เพิ่มข้อความ "วันที่ดาวน์โหลด"
  //     const downloadDate = "Download date : " + new Date().toLocaleDateString();
  //     pdf.setFontSize(10); // กำหนดขนาดฟอนต์สำหรับข้อความ
  //     const downloadDateWidth = pdf.getStringUnitWidth(downloadDate) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  //     const downloadDateX = pdfWidth - margin - downloadDateWidth;
  //     pdf.text(downloadDate, downloadDateX, pdfHeight - margin - 5); // เพิ่มข้อความ "วันที่ดาวน์โหลด"

  //     pdf.save("Food4Skin.pdf"); // ดาวน์โหลด PDF ด้วยชื่อ "Food4Skin.pdf"
  //   }); // เพิ่มวงเล็บปิดนี้
  // }

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
        (pdf.getStringUnitWidth("Expire Food4Skin") *
          pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textX = (pdfWidth - textWidth) / 2; // คำนวณตำแหน่ง X สำหรับหัวข้อ
      pdf.text("Expire Food4Skin", textX, margin + 10); // เพิ่มหัวข้อ "Expire Food4Skin" ที่ตำแหน่งตรงกลางและห่างจากตาราง 20 พิกเซล

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight); // เพิ่มรูปภาพลงใน PDF

      // เพิ่มข้อความ "วันที่ดาวน์โหลด" ชิดขวา
      const downloadDate = "Download date : " + new Date().toLocaleDateString();
      pdf.setFontSize(10); // กำหนดขนาดฟอนต์สำหรับข้อความ
      pdf.text(downloadDate, downloadDateX, pdfHeight - margin - 5); // เพิ่มข้อความ "วันที่ดาวน์โหลด"

      pdf.save("ExpireFood4Skin.pdf"); // ดาวน์โหลด PDF ด้วยชื่อ "Food4Skin.pdf"
    }); // เพิ่มวงเล็บปิดนี้
  }

  return (
    <div>
      <div className="containerTAB ">
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
          <Col md={4}>
            <div className="selectSale">
              <Row>
                {/* <Col style={{ paddingTop: " 5px", color: "white" }}>
                  <div className="text-end">
                    <span>
                      ช่วงวันที่หมดอายุ{" "}
                      <FcSynchronize
                        className="FcSynchronize"
                        onClick={() => {
                          setStartDate(""); // เคลียร์ค่า startDate เมื่อคลิกปุ่มรีเฟรช
                          setEndDate(""); // เคลียร์ค่า endDate เมื่อคลิกปุ่มรีเฟรช
                        }}
                      />
                    </span>
                  </div>
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </Col> */}
                <input
                  style={{
                    width: "155px",
                    backgroundColor: "rgb(211, 211, 211)",
                    color: "black",
                  }}
                  className="form-control"
                  type="text"
                  value={`หมดอายุ : ${totalInventories} ชิ้น`} // แสดงผลรวมแบบแสดงค่าจริง
                  disabled
                />
              </Row>
            </div>
          </Col>
          <Col>
            {/* <div className="selectSale">
              <input
                style={{
                  width: "155px",
                  backgroundColor: "rgb(211, 211, 211)",
                  color: "black",
                }}
                className="form-control"
                type="text"
                value={`หมดอายุ : ${totalInventories} ชิ้น`} // แสดงผลรวมแบบแสดงค่าจริง
                disabled
              />
            </div> */}
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
              <button
                style={{
                  backgroundColor: "white",
                  borderRadius:
                    "10%" /* กำหนดให้มีรูปร่างวงกลมโดยใช้ border-radius */,
                  width: "80px" /* กำหนดความกว้างของปุ่ม */,
                  height: "40px" /* กำหนดความสูงของปุ่ม */,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  //   border: "1px solid #ccc" /* เพิ่มเส้นขอบหน้าปุ่ม */,
                }}
                onClick={generatePDF}
              >
                <BsPrinterFill />
              </button>
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
                {/* <th>จุดต่ำกว่าจุดสั่งผลิต (ชิ้น)</th> */}
                <th>สินค้าทั้งหมด (ชิ้น)</th>
                <th>สินค้าคงเหลือ (ชิ้น)</th>
                {/* <th>วันที่ผลิต</th> */}
                <th>วันที่หมดอายุ</th>
                {/* <th>พนักงานที่เพิ่มสินค้า</th> */}
                <th>หมายเหตุ</th>

                {/* <th className="readtext">ข้อมูล</th> */}
              </tr>
            </thead>

            <tbody>
              {saveoption === ""
                ? records
                    .filter((data) => {
                      const expDate = new Date(data.date_list_EXP);
                      return (
                        (!startDate || expDate >= new Date(startDate)) &&
                        (!endDate || expDate <= new Date(endDate))
                      );
                    })
                    .map((data, index) => (
                      <tr key={index}>
                        <td scope="row">{data.ID_lot}</td>
                        <td>{data.Name_product}</td>
                        {/* <td>{data.Production_point}</td> */}
                        <td>{data.Quantity}</td>
                        <td>{data.Inventories_lot}</td>
                        {/* <td>{formatDate(data.date_list)}</td> */}
                        <td>{formatDate(data.date_list_EXP)}</td>
                        {/* <td>{data.fullname}</td> */}
                        <td>{data.remark}</td>
                        {/* <td className="centericon">
                          <div
                            className="read2"
                            onClick={() => navigate(`/ReadLOT/${data.ID_lot}`)}
                          >
                            <BiSearchAlt />
                          </div>
                        </td> */}
                      </tr>
                    ))
                : records
                    .filter((data) => {
                      const expDate = new Date(data.date_list_EXP);
                      return (
                        (!startDate || expDate >= new Date(startDate)) &&
                        (!endDate || expDate <= new Date(endDate))
                      );
                    })
                    .map((data, index) => (
                      <tr key={index}>
                        <td scope="row">{data.ID_lot}</td>
                        <td>{data.Name_product}</td>
                        {/* <td>{data.Production_point}</td> */}
                        <td>{data.Quantity}</td>
                        <td>{data.Inventories_lot}</td>
                        {/* <td>{formatDate(data.date_list)}</td> */}
                        <td>{formatDate(data.date_list_EXP)}</td>
                        {/* <td>{data.fullname}</td> */}
                        <td>{data.remark}</td>
                        {/* <td className="centericon">
                          <div
                            className="read2"
                            onClick={() => navigate(`/ReadLOT/${data.ID_lot}`)}
                          >
                            <BiSearchAlt />
                          </div>
                        </td> */}
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

export default Expire;
