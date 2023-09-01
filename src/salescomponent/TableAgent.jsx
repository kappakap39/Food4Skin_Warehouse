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
    import MenuNavSales from "./MenuNavSales";

function TableAgent() {

    const navigate = useNavigate();

  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  //แสดงข้อมูลทั้งหมด
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/showTableagent")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //!ค้นหา
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2001/showTableagent");
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
        (agent) =>
          (agent.fullname &&
            agent.fullname.toLowerCase().includes(searchTerm)) ||
          (agent.level && agent.level.toLowerCase().includes(searchTerm)) ||
          (agent.sex && agent.sex.toLowerCase().includes(searchTerm)) ||
          (agent.Card_ID && agent.Card_ID.toLowerCase().includes(searchTerm)) ||
          (agent.province &&
            agent.province.toLowerCase().includes(searchTerm)) ||
          (agent.districts &&
            agent.districts.toLowerCase().includes(searchTerm)) ||
          (agent.subdistricts &&
            agent.subdistricts.toLowerCase().includes(searchTerm)) ||
          (agent.zip_code &&
            agent.zip_code.toLowerCase().includes(searchTerm)) ||
          (agent.Address &&
            agent.Address.toLowerCase().includes(searchTerm)) ||
          (agent.contact && agent.contact.toLowerCase().includes(searchTerm)) ||
          (agent.PhoneNumber &&
            agent.PhoneNumber.toLowerCase().includes(searchTerm))
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

  const [selectedStatus, setSelectedStatus] = useState("ระดับขั้นของตัวแทน");
  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue);

    if (selectedValue === "ระดับขั้นของตัวแทน") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter((agent) =>
      agent.level.toLowerCase().includes(
          selectedValue.toLowerCase()
        )
      );

      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([
          {
            ID_agent: "ไม่พบข้อมูล",
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
        <MenuNavSales />
      </header>
      {/* rounded ขอบมีมุม */}
      <div className="container1 ">
        <h3 className="h3">ตารางแสดงรายชื่อตัวแทนจำหน่าย</h3>
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
              </InputGroup>
            </div>
          </Col>
          <Col md={2}>
            <div className="selectSale">
              <select
                aria-label="Default select example"
                name="status"
                id="status"
                type="text"
                className="form-select mb-4"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">ระดับขั้นของตัวแทน</option>
                <option value="ระดับขั้น 1">ระดับขั้น 1</option>
                <option value="ระดับขั้น 2">ระดับขั้น 2</option>
                <option value="ระดับขั้น 3">ระดับขั้น 3</option>
              </select>
            </div>
          </Col>
          <Col md={5} className="add2 mb-4">
            <button className="add" onClick={() => navigate("AddAgent")}>
              <BiSolidUserPlus /> เพิ่ม
            </button>
          </Col>
        </Row>
        {/* <hr /> */}

        <div className="table-container">
          <table className=" table table-striped table-dark ">
            <thead className="table-secondary">
              <tr>
                <th>รหัสตัวแทน</th>
                <th>ชื่อ-นามสกุล</th>
                <th>อีเมล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>เลขบัตรประชาชน</th>
                <th>ช่องทางการติดต่อ</th>
                <th>ระดับขั้น</th>
                
                <th className="readtext">ข้อมูล/แก้ไข</th>
              </tr>
            </thead>

            <tbody>
              {records.map((records, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{records.ID_agent}</td>
                    <td>{records.fullname}</td>
                    <td>{records.PhoneNumber}</td>
                    <td>{records.email}</td>
                    <td>{records.Card_ID}</td>
                    <td>{records.contact}</td>
                    <td>{records.level}</td>
                    

                    <td
                      className="centericon"
                    >
                      <div
                        className="read2"
                        onClick={() =>
                          navigate(`/ShowAgent/${records.ID_agent}`)
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

export default TableAgent