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

//   useEffect(() => {
//     axios
//       .get("http://localhost:2001/Showproduct")
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

console.log(data)
  //ค้นหา
  const [filterVal, setfilterVal] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:2001/Showtableproduct")
        .then((res) => {
          setData(res.data);
          setSearchData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

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
            records.fullname.toLowerCase().includes(
              e.target.value.toLowerCase()
            ))
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            // `ID_product`,`Name_product`,`Production_point`,`Retail_price`,`Level_1_price`,`Level_2_price`,`Level_3_price`, sales.fullname
            ID_product: "ไม่พบข้อมูล",
            Name_product: "ไม่พบข้อมูล",
            Production_point: "ไม่พบข้อมูล",
            Retail_price: "ไม่พบข้อมูล",
            Level_1_price: "ไม่พบข้อมูล",
            Level_2_price: "ไม่พบข้อมูล",
            Level_3_price: "ไม่พบข้อมูล",
            fullname: "ไม่พบข้อมูล",
          },
        ]);
      }
    }
    setfilterVal(e.target.value);
  };

  //!Delete
  const handleDelete = (ID_product) => {
    axios
      .delete("http://localhost:2001/deleteproduct/" + ID_product)
      .then((res) => {
        location.reload();
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

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form action="">
        <div className="container1 ">
          <h3 className="h3">ตารางแสดงข้อมูลสินค้า</h3>
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
                  onInput={(e) => handleFilter(e)}
                />
              </InputGroup>
            </div>
            </Col>

            <Col className="add2">
              <Col className="col2">
                {/* <button className="addProduct" onClick={() => navigate("")}>
                เบิกสินค้า
              </button>
              <button className="addProduct" onClick={() => navigate("")}>
                รับเข้าสินค้า
              </button> */}
                <button className="add mb-3" onClick={() => navigate("/AddProduct")}>
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
                  <th>ชื่อผลิตภัณฑ์</th>
                  <th>จุดต่ำกว่าจุดสั่งผลิต (ชิ้น)</th>
                  <th>ราคาปลีก</th>
                  <th>ราคาส่ง ระดับ1</th>
                  <th>ราคาส่ง ระดับ2</th>
                  <th>ราคาส่ง ระดับ3</th>
                  <th>ชื่อพนักงานที่เพิ่ม</th>

                  <th className="readtext">เบิกสินค้า</th>
                  <th className="readtext">ข้อมูล/แก้ไข</th>
                </tr>
              </thead>

              <tbody>
                {records.map((records, index) => {
                  return (
                    <tr key={index}>
                      
                      <td>{records.Name_product}</td>
                      <td>{records.Production_point}</td>
                      <td>{records.Retail_price}</td>
                      <td>{records.Level_1_price}</td>
                      <td>{records.Level_2_price}</td>
                      <td>{records.Level_3_price}</td>
                      <td>{records.fullname}</td>

                      <td className="centericon">
                        <div
                          onClick={() =>
                            navigate(`/WithdrawList/${records.ID_product}`)
                          }
                        >
                          <>เบิกสินค้า</>
                        </div>

                        {/* <button onClick={() => handleDelete(records.ID_sales) }>Delete</button> */}
                      </td>
                      <td className="centericon">
                        <div
                          className="read2"
                          onClick={() =>
                            navigate(`/ReadProduct/${records.ID_product}`)
                          }
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
            {/* <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {number.slice(0, 1).map((n, i) => (
              <li
                className={`page-item ${currentPage === n }`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                >
                  {currentPage}
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
      </form>
    </div>
  );
}

export default Product;
