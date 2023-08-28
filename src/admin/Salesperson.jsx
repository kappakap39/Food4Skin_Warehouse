// import React from "react";
import "../css/Salesperson.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BiSearchAlt } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import MenuNav from "./MenuNav"; // Make sure the path is correct

function Salesperson() {
  const navigate = useNavigate();

  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  //แสดงข้อมูลทั้งหมด
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/showall")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //ค้นหา
  // const [filterVal, setfilterVal] = useState("");
  // const [searchData, setSearchData] = useState([]);
  // const [selectedStatus, setSelectedStatus] = useState("สถานะการทำงาน");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2001/showall");
        setData(response.data);
        setSearchData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [filterVal, setFilterVal] = useState(""); // เปลี่ยนตัวแปรเป็น setFilterVal แทน
  const [searchData, setSearchData] = useState([]);
  // ...

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterVal(searchTerm);

    if (searchTerm === "") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter(
        (sales) =>
          (sales.fullname &&
            sales.fullname.toLowerCase().includes(searchTerm)) ||
          (sales.email && sales.email.toLowerCase().includes(searchTerm)) ||
          (sales.sex && sales.sex.toLowerCase().includes(searchTerm)) ||
          (sales.Card_ID && sales.Card_ID.toLowerCase().includes(searchTerm)) ||
          (sales.province &&
            sales.province.toLowerCase().includes(searchTerm)) ||
          (sales.districts &&
            sales.districts.toLowerCase().includes(searchTerm)) ||
          (sales.subdistricts &&
            sales.subdistricts.toLowerCase().includes(searchTerm)) ||
          (sales.zip_code &&
            sales.zip_code.toLowerCase().includes(searchTerm)) ||
          (sales.Persistent_status &&
            sales.Persistent_status.toLowerCase().includes(searchTerm)) ||
          (sales.contact && sales.contact.toLowerCase().includes(searchTerm)) ||
          (sales.PhoneNumber &&
            sales.PhoneNumber.toLowerCase().includes(searchTerm))
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            ID_sales: "ไม่พบข้อมูล",
            fullname: "ไม่พบข้อมูล",
            PhoneNumber: "ไม่พบข้อมูล",
            contact: "ไม่พบข้อมูล",
            email: "ไม่พบข้อมูล",
            Card_ID: "ไม่พบข้อมูล",
          },
        ]);
      }
    }
  };

  const [selectedStatus, setSelectedStatus] = useState("สถานะการทำงาน");
  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue);

    if (selectedValue === "สถานะการทำงาน") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter((sales) =>
        sales.Persistent_status.toLowerCase().includes(
          selectedValue.toLowerCase()
        )
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            ID_sales: "ไม่พบข้อมูล",
            fullname: "ไม่พบข้อมูล",
            PhoneNumber: "ไม่พบข้อมูล",
            contact: "ไม่พบข้อมูล",
            email: "ไม่พบข้อมูล",
            Card_ID: "ไม่พบข้อมูล",
          },
        ]);
      }
    }
  };

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios
  //       .get("http://localhost:2001/showall")
  //       .then((res) => {
  //         setData(res.data);
  //         setSearchData(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   fetchData();
  // }, []);
  // const handleFilter = (e) => {
  //   if (e.target.value == "") {
  //     setData(searchData);
  //   } else {
  //     const filterResult = searchData.filter(
  //       (sales) =>
  //         // sales.ID_sales.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.fullname.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.sex.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.IDcard.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.province.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.districts
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase()) ||
  //         sales.subdistricts
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase()) ||
  //         sales.zip_code.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.Persistent_status.toLowerCase().includes(
  //           e.target.value.toLowerCase()
  //         ) ||
  //         sales.contact.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         sales.Tel.toLowerCase().includes(e.target.value.toLowerCase())
  //     );

  //     if (filterResult.length > 0) {
  //       setData(filterResult);
  //     } else {
  //       setData([
  //         {
  //           ID_sales: "ไม่พบข้อมูล",
  //           fullname: "ไม่พบข้อมูล",
  //           Tel: "ไม่พบข้อมูล",
  //           contact: "ไม่พบข้อมูล",
  //           email: "ไม่พบข้อมูล",
  //           IDcard: "ไม่พบข้อมูล",
  //         },
  //       ]);
  //     }
  //   }
  //   setfilterVal(e.target.value);
  // };

  //!Delete
  const handleDelete = (ID_sales) => {
    axios
      .delete("http://localhost:2001/deleteSales/" + ID_sales)
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

  return (
    <div>
      <header className="headernav ">
        <MenuNav />
      </header>
      {/* rounded ขอบมีมุม */}
      <div className="container1 ">
        <h3 className="h3">ตารางแสดงรายชื่อพนักงานฝ่ายขาย</h3>
        {/* <hr /> */}
        <Row>
          <Col md={3}>
            <div className="search">
              <InputGroup className="mb-4">
                <Form.Control
                  className="inputsearch"
                  type="text"
                  placeholder="ค้นหาโดย..."
                  aria-describedby="basic-addon2"
                  value={filterVal}
                  onInput={handleFilter}
                />
                {/* <Button
                  className="seart"
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  สถานะการทำงาน
                  
                </Button> */}
              </InputGroup>
            </div>
          </Col>
          <Col md={2}>
            <div className="selectSale">
              {/* <select
                aria-label="Default select example"
                name="status"
                id="status"
                type="text"
                className="form-select mb-4"
                defaultValue="สถานะการทำงาน"
              >
                <option value="สถานะการทำงาน">สถานะการทำงาน</option>
                <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
              </select> */}
              <select
                aria-label="Default select example"
                name="status"
                id="status"
                type="text"
                className="form-select mb-4"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="สถานะการทำงาน">สถานะการทำงาน</option>
                <option value="กำลังดำเนินงานอยู่">กำลังดำเนินงานอยู่</option>
                <option value="พ้นสภาพการทำงาน">พ้นสภาพการทำงาน</option>
              </select>
            </div>
          </Col>
          <Col md={5} className="add2 mb-4">
            <button className="add" onClick={() => navigate("AddSales")}>
              <BiSolidUserPlus /> เพิ่ม
            </button>
          </Col>
        </Row>
        {/* <hr /> */}

        <div className="table-container">
          <table className=" table table-striped table-dark ">
            <thead className="table-secondary">
              <tr>
                <th>รหัสพนักงาน</th>
                <th>ชื่อ-นามสกุล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>ช่องทางการติดต่อ</th>
                <th>อีเมล</th>
                <th>เลขบัตรประชาชน</th>
                <th className="readtext">ข้อมูล/แก้ไข</th>
              </tr>
            </thead>

            <tbody>
              {records.map((records, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{records.ID_sales}</td>
                    <td>{records.fullname}</td>
                    <td>{records.PhoneNumber}</td>
                    <td>{records.contact}</td>
                    <td>{records.email}</td>
                    <td>{records.Card_ID}</td>

                    <td
                      className="centericon"
                      // onClick={() => navigate(`/Salesperson/ReadSales`)}
                    >
                      {/* <Link to={`/Salesperson/ReadSales/${sales.ID_sales}`}>
                        <BiSearchAlt />
                      </Link> */}

                      {/* <button className="read"  onClick={() => navigate(`/Salesperson/ReadSales/${sales.ID_sales}`)}>
                        <BiSearchAlt />
                      </button> */}

                      {/* <div className="read2"  onClick={() => navigate(`/Salesperson/ReadSales/${sales.ID_sales}`)}>
                      <BiSearchAlt />
                      </div> */}
                      <div
                        className="read2"
                        onClick={() =>
                          navigate(`/EditSales/${records.ID_sales}`)
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

export default Salesperson;
