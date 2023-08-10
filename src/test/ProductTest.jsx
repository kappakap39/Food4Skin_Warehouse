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

function Product() {
  const navigate = useNavigate();

  //แสดงข้อมูลทั้งหมด
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/selectlot")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //ค้นหา
  const [filterVal, setfilterVal] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:2001/selectlot")
        .then((res) => {
          setData(res.data);
          setSearchData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter(
        (product) =>
          product.ID_lot.toLowerCase().includes(searchValue) ||
          product.Inventories_lot.toLowerCase().includes(searchValue) ||
          product.ID_product.toLowerCase().includes(searchValue) ||
          product.Name_product.toLowerCase().includes(searchValue) ||
          product.Production_point.toLowerCase().includes(searchValue) ||
          product.Retail_price.toLowerCase().includes(searchValue) ||
          product.Level_1_price.toLowerCase().includes(searchValue) ||
          product.Level_2_price.toLowerCase().includes(searchValue) ||
          product.Level_3_price.toLowerCase().includes(searchValue)
      );
  
      if (filterResult.length > 0) {
        setData(filterResult); // อัปเดตค่า data ด้วยผลลัพธ์ที่กรอง
      } else {
        setData([
          {
            ID_lot: "ไม่พบข้อมูล",
            Name_product: "ไม่พบข้อมูล",
            Production_point: "ไม่พบข้อมูล",
            Inventories_lot: "ไม่พบข้อมูล",
            Retail_price: "ไม่พบข้อมูล",
            Level_1_price: "ไม่พบข้อมูล",
            Level_2_price: "ไม่พบข้อมูล",
            Level_3_price: "ไม่พบข้อมูล",
          },
        ]);
      }
    }
    setfilterVal(searchValue);
  };

  //!Delete
  // const handleDelete = (ID_sales) => {
  //   axios
  //     .delete("http://localhost:2001/deleteSales/" + ID_sales)
  //     .then((res) => {
  //       location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  //!next page
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1) {
      changeCPage(1);
    }
  }
  

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
      handleFilter({ target: { value: filterVal } });
    }
  }

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      {/* rounded ขอบมีมุม */}
      <div className="container1 ">
        <h3 className="h3">ตารางแสดงข้อมูลรายการสินค้า</h3>
        {/* <hr /> */}
        <Row>
          <Col md={4}>
            <div className="search">
              <InputGroup className="mb-4">
                <Form.Control
                  className="inputsearch"
                  type="text"
                  placeholder="ค้นหาโดย..."
                  aria-describedby="basic-addon2"
                  value={filterVal}
                  onChange={(e) => setValue(e.target.value)}
                  // onInput={(e) => handleFilter(e)}
                />
              </InputGroup>
            </div>
          </Col>

          <Col className="add2">
            <Col className="col2">
              <button className="addProduct" onClick={() => navigate("")}>
                เบิกสินค้า
              </button>
              <button className="addProduct" onClick={() => navigate("")}>
                รับเข้าสินค้า
              </button>
              <button className="add" onClick={() => navigate("")}>
                <BiSolidUserPlus /> เพิ่ม
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
                <th>จุดต่ำกว่าจุดสั่งผลิต (ชิ้น)</th>
                <th>จำนวนสินค้า (ชิ้น)</th>
                <th>ราคาปลีก</th>
                <th>ราคาส่ง ระดับ1</th>
                <th>ราคาส่ง ระดับ2</th>
                <th>ราคาส่ง ระดับ3</th>

                <th className="readtext">ข้อมูล/แก้ไข</th>
              </tr>
            </thead>

            <tbody>
              {records.map((records, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{records.ID_lot}</td>
                    <td>{records.Name_product}</td>
                    <td>{records.Production_point}</td>
                    <td>{records.Inventories_lot}</td>
                    <td>{records.Retail_price}</td>
                    <td>{records.Level_1_price}</td>
                    <td>{records.Level_2_price}</td>
                    <td>{records.Level_3_price}</td>

                    <td className="centericon">
                      <div
                        className="read2"
                        // onClick={() =>
                        //   navigate(`/EditSales/${records.ID_lot}`)
                        // }
                      >
                        <BiSearchAlt />
                      </div>

                      {/* <button onClick={() => handleDelete(records.ID_sales) }>Delete</button> */}
                    </td>
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
                Prev
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
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Product;
