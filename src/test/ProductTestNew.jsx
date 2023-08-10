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
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2001/selectlot")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  console.log("data", data);

  //!Delete
  // const handleDelete = (ID_sales) => {
  //   axios
  //     .delete("http://localhost:2001/deleteSales/" + ID_sales)
  //     .then((res) => {
  //       location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleReset = () => {
    loadData();
  };
  const handleSearch = (e) => {
e.preventDefault();
return axios.get(`http://localhost:2001/selectlot?q=${value}`
)
.then((response) => {
  setData(response.data)
  setValue("");
})
.catch((err) => console.log(err));
  };
  console.log(handleSearch)

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
            <form action="" onSubmit={handleSearch}>
              <div className="search">
                <InputGroup className="mb-4">
                  <Form.Control
                    className="inputsearch"
                    type="text"
                    placeholder="ค้นหาโดย..."
                    aria-describedby="basic-addon2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button
                  className="seart"
                  variant="outline-secondary"
                  id="button-addon2"
                  type="submit"
                >
                  ค้นหา
                </Button>
                <Button
                  className="seart"
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => handleReset()}
                >
                  รีเซต
                </Button>
                </InputGroup>
              </div>
            </form>
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
            {data.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={8}>No Data Found</td>
                </tr>
              </tbody>
            ) : (
              data.map((item, index) => (
                <tbody>
                  <tr>
                    {/* <th scope="row">{index}</th> */}
                    <td scope="row">{item.ID_lot}</td>
                    <td>{item.Name_product}</td>
                    <td>{item.Production_point}</td>
                    <td>{item.Inventories_lot}</td>
                    <td>{item.Retail_price}</td>
                    <td>{item.Level_1_price}</td>
                    <td>{item.Level_2_price}</td>
                    <td>{item.Level_3_price}</td>

                    <td className="centericon">
                      <div
                        className="read2"
                        // onClick={() => navigate(`/EditSales/${records.ID_lot}`)}
                      >
                        <BiSearchAlt />
                      </div>

                      {/* <button onClick={() => handleDelete(records.ID_sales)}>
                        Delete
                      </button> */}
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
