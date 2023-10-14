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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BsPrinterFill } from "react-icons/bs";

function ProductTotal() {
  const navigate = useNavigate();

  //แสดงข้อมูลทั้งหมด
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:2001/Showproduct")
  //       .then((res) => setData(res.data))
  //       .catch((err) => console.log(err));
  //   }, []);

  console.log(data);
  //ค้นหา
  const [filterVal, setfilterVal] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:2001/ShowtableproductReport")
        .then((res) => {
          setData(res.data);
          setSearchData(res.data);
          setInitialData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  console.log("initialData", initialData);
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter(
        (records) =>
          (typeof records.ID_product === "string" &&
            records.ID_product.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.Name_product === "string" &&
            records.Name_product.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.Retail_price === "string" &&
            records.Retail_price.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.Level_1_price === "string" &&
            records.Level_1_price.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.Level_2_price === "string" &&
            records.Level_2_price.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.Level_3_price === "string" &&
            records.Level_3_price.toLowerCase().includes(
              e.target.value.toLowerCase()
            )) ||
          (typeof records.fullname === "string" &&
            records.fullname
              .toLowerCase()
              .includes(e.target.value.toLowerCase()))
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            // `ID_product`,`Name_product`,`Production_point`,`Retail_price`,`Level_1_price`,`Level_2_price`,`Level_3_price`, sales.fullname
            // ID_product: "ไม่พบข้อมูล",
            // Name_product: "ไม่พบข้อมูล",
            // Production_point: "ไม่พบข้อมูล",
            // Retail_price: "ไม่พบข้อมูล",
            // Level_1_price: "ไม่พบข้อมูล",
            // Level_2_price: "ไม่พบข้อมูล",
            // Level_3_price: "ไม่พบข้อมูล",
            // TotalInventories: "ไม่พบข้อมูล",
          },
        ]);
      }
    }
    setfilterVal(e.target.value);
  };

  //!Delete
  const handleDelete = (ID_product) => {
    // ส่งคำขอ DELETE ไปยังเซิร์ฟเวอร์เพื่อลบข้อมูลสินค้า
    axios
      .delete("http://localhost:2001/deleteproduct/" + ID_product)
      .then((res) => {
        // หลังจากลบสำเร็จ ให้รีโหลดหน้าเพื่อให้แสดงข้อมูลอัปเดต
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //!next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  // function prePage() {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   } else if (currentPage === 1) {
  //     changeCPage(1);
  //   }
  // }

  // function changeCPage(id) {
  //   setCurrentPage(id);
  // }

  // function nextPage() {
  //   if (currentPage < npage) {
  //     setCurrentPage(currentPage + 1);
  //     handleFilter({ target: { value: filterVal } });
  //   }
  // }
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

  console.log(filterVal);

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
        (pdf.getStringUnitWidth("Product Total Food4Skin") *
          pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textX = (pdfWidth - textWidth) / 2; // คำนวณตำแหน่ง X สำหรับหัวข้อ
      pdf.text("Product Total Food4Skin", textX, margin + 10); // เพิ่มหัวข้อ "Expire Food4Skin" ที่ตำแหน่งตรงกลางและห่างจากตาราง 20 พิกเซล

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight); // เพิ่มรูปภาพลงใน PDF

      // เพิ่มข้อความ "วันที่ดาวน์โหลด" ชิดขวา
      const downloadDate = "Download date : " + new Date().toLocaleDateString();
      pdf.setFontSize(10); // กำหนดขนาดฟอนต์สำหรับข้อความ
      pdf.text(downloadDate, downloadDateX, pdfHeight - margin - 5); // เพิ่มข้อความ "วันที่ดาวน์โหลด"

      pdf.save("Product_Total_Food4Skin.pdf"); // ดาวน์โหลด PDF ด้วยชื่อ "Food4Skin.pdf"
    }); // เพิ่มวงเล็บปิดนี้
  }

  // นับผลรวมของคอลัมน์ Inventories_lot
  const totalQuantity = records.reduce((total, item) => {
    return total + item.TotalInventories;
  }, 0);

  console.log("totalQuantity", totalQuantity);
  console.log("TotalInventories", data.TotalInventories);

  //! ค้นหา
  // http://localhost:2001/NameProduct
  const [nameproduct, setNameproduct] = useState([]);
  const [saveoption, setSaveoption] = useState(""); // กำหนดค่าเริ่มต้นเป็นสตริงว่าง
  const [showtable, setShowtable] = useState([]);

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
        .get("http://localhost:2001/productReport/" + saveoption)
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

  return (
    <div>
      <div className="containerTAB ">
        <Row>
          {/* <Col md={3}>
            <div className="search">
              <InputGroup>
                <Form.Control
                  className=""
                  type="text"
                  placeholder="ค้นหาโดย..."
                  aria-describedby="basic-addon2"
                  value={filterVal}
                  onInput={(e) => handleFilter(e)}
                />
              </InputGroup>
            </div>
          </Col> */}
          <Col md={2}>
            <div className="selectSale">
              <Row>
                <Col>
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
                </Col>
                <Col>
                  <input
                    style={{
                      width: "85%",
                      backgroundColor: "rgb(211, 211, 211)",
                      color: "black",
                    }}
                    className="form-control"
                    type="text"
                    value={`คงเหลือรวม : ${totalQuantity} ชิ้น`} // แสดงผลรวมแบบแสดงค่าจริง
                    disabled
                  />
                </Col>
              </Row>
            </div>
          </Col>
          {/* <Col>
            <div className="selectSale">
              <input
                style={{
                  width: "85%",
                  backgroundColor: "rgb(211, 211, 211)",
                  color: "black",
                }}
                className="form-control"
                type="text"
                value={`คงเหลือรวม : ${totalQuantity} ชิ้น`} // แสดงผลรวมแบบแสดงค่าจริง
                disabled
              />
            </div>
          </Col> */}

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

        <div
          className="table-container"
          //   style={{ marginLeft: "10px", marginRight: "10px", height: "420px" }}
        >
          <table className=" table table-striped table-dark ">
            <thead className="table-secondary">
              <tr>
                <th>ชื่อผลิตภัณฑ์</th>
                <th>สินค้าคงเหลือทั้งหมด (ชิ้น)</th>
                <th>จุดสั่งผลิต (ชิ้น)</th>
                <th>ราคาปลีก</th>
                <th>ราคาส่ง ระดับ1</th>
                <th>ราคาส่ง ระดับ2</th>
                <th>ราคาส่ง ระดับ3</th>
              </tr>
            </thead>

            <tbody>
              {saveoption === ""
                ? records.map((record, index) => {
                    return (
                      <tr key={index}>
                        <td>{record.Name_product}</td>
                        <td>{record.TotalInventories}</td>
                        <td>{record.Production_point}</td>
                        <td>{record.Retail_price}</td>
                        <td>{record.Level_1_price}</td>
                        <td>{record.Level_2_price}</td>
                        <td>{record.Level_3_price}</td>
                        {/* <td>
              <Button
                variant="danger"
                onClick={() => handleDelete(record.ID_product)}
              >
                ลบ
              </Button>
            </td> */}
                      </tr>
                    );
                  })
                : showtable.map((record, index) => {
                    return (
                      <tr key={index}>
                        <td>{record.Name_product}</td>
                        <td>{record.TotalInventories}</td>
                        <td>{record.Production_point}</td>
                        <td>{record.Retail_price}</td>
                        <td>{record.Level_1_price}</td>
                        <td>{record.Level_2_price}</td>
                        <td>{record.Level_3_price}</td>
                        {/* <td>
              <Button
                variant="danger"
                onClick={() => handleDelete(record.ID_product)}
              >
                ลบ
              </Button>
            </td> */}
                      </tr>
                    );
                  })}
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

export default ProductTotal;
