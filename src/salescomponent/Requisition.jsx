import React, { useEffect } from "react";
import "../css/product.css";

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
import MenuNavSales from "./MenuNavSales";

function Requisition() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();

  const [ID_lot, setInventories_lot] = useState("");

  //!เพิ่มลงตาราง
  const [importedProducts, setImportedProducts] = useState([]); // เก็บข้อมูลสินค้าที่เพิ่มแต่ละชุด
  const [allImportedProducts, setAllImportedProducts] = useState([]); // เก็บข้อมูลทั้งหมดที่คุณต้องการบันทึกลงในฐานข้อมูล
  const handleAddProduct = () => {
    // ตรวจสอบว่าข้อมูลสินค้าถูกกรอกครบหรือไม่
    if (
      values.Dete_requisition &&
      values.Amount_products &&
      values.ID_lot &&
      values.remark &&
      values.ID_sales &&
      values.Nameproduct &&
      values.ID_agent &&
      values.Inventories_lot
    ) {
      // สร้างอ็อบเจ็กต์ใหม่เพื่อเก็บข้อมูลสินค้าที่เพิ่ม
      const newProduct = {
        ID_sales: values.ID_sales,
        Nameproduct: values.Nameproduct,
        Amount_products: values.Amount_products,
        ID_lot: values.ID_lot,
        remark: values.remark,
        ID_agent: values.ID_agent,
        Dete_requisition: values.Dete_requisition,
        Inventories_lot: values.Inventories_lot,
      };

      // เพิ่มข้อมูลสินค้าใหม่ลงใน State importedProducts
      setImportedProducts([...importedProducts, newProduct]);
      setAllImportedProducts([...allImportedProducts, newProduct]);

      // ล้างค่าใน State ที่ใช้ในการกรอกข้อมูล
      setValues((prevValues) => ({
        ...prevValues,
        // ID_product: "",
        // date_import: "",
        // date_list: "",
        // date_list_EXP: "",
        // Amount_products: "",
        // ID_lot: "",
        // remark: "",
        // ID_agent: "",
        // Inventories_lot: "",
      }));
    } else {
      // แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  //!add
  const [values, setValues] = useState({
    // ID_requisition: "",
    Dete_requisition: "",
    Amount_products: "",
    remark: "",
    ID_agent: "",
    ID_lot: "",
    // ID_product: "",
    Nameproduct: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
    Inventories_lot: "",
  });
  console.log("ข้อมูลที่กรอก", values);

  //! select agent
  const [nameagent, setNameagent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/NameAgent")
      .then((res) => setNameagent(res.data))
      .catch((err) => console.log(err));
  }, []);

  //! LOT
  //! select product
  const [nameproduct, setNameproduct] = useState([]);
  const [nameLot, setNameLot] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2001/NameProduct")
      .then((res) => setNameproduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onChangeProduct = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setValues({ ...values, [e.target.name]: label });

    const id = e.target.value;
    axios
      .get(`http://localhost:2001/Lotforproduct/${id}`)
      .then((res) => {
        setNameLot(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeInventories_lot = (e) => {
    const filterDistrict = nameLot.filter((item) => {
      return e.target.value == item.ID_lot;
    });
    console.log("ID_lot", filterDistrict[0].ID_lot);
    console.log("Inventories_lot", filterDistrict[0].Inventories_lot);

    setValues({
      ...values,
      [e.target.name]: filterDistrict[0].ID_lot,
      Inventories_lot: filterDistrict[0].Inventories_lot,
    });
    console.log(e.target.value);
  };

  //!date
  useEffect(() => {
    // สร้างวันที่ปัจจุบันในรูปแบบ ISO (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];

    // กำหนดค่าเริ่มต้นให้กับ date_import เป็นวันที่ปัจจุบัน
    setValues((prev) => ({ ...prev, Dete_requisition: currentDate }));
  }, []);

  //! save
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (allImportedProducts.length === 0) {
      alert("ยังไม่มีข้อมูลสินค้าที่เพิ่ม");
      return;
    }

    // const calculateUpdatedInventoriesLot = (ID_lot) => {
    //   const matchingProducts = allImportedProducts.filter(
    //     (product) => product.ID_lot === ID_lot
    //   );
    //   const totalAmount = matchingProducts.reduce(
    //     (total, product) => total + Number(product.Amount_products),
    //     0
    //   );
    //   const currentInventoriesLot = Number(values.Inventories_lot);
    //   const updatedInventoriesLot = currentInventoriesLot - totalAmount;

    //   return updatedInventoriesLot;
    // };
    // const updatedInventoriesLot = calculateUpdatedInventoriesLot(values.ID_lot);

    try {
      // Create an array to store promises for updating Inventories_lot
      const updatePromises = [];

      // Create a map to store the calculated updated Inventories_lot values for each ID_lot
      const updatedInventoriesLotMap = new Map();

      // Iterate through allImportedProducts to calculate updated Inventories_lot
      for (const product of allImportedProducts) {
        const ID_lot = product.ID_lot;
        const Amount_products = Number(product.Amount_products);

        // If the ID_lot is not in the map, initialize it with 0
        if (!updatedInventoriesLotMap.has(ID_lot)) {
          updatedInventoriesLotMap.set(ID_lot, 0);
        }

        // Add Amount_products to the corresponding ID_lot in the map
        updatedInventoriesLotMap.set(
          ID_lot,
          updatedInventoriesLotMap.get(ID_lot) + Amount_products
        );
      }

      // Now, we have the total Amount_products for each ID_lot in updatedInventoriesLotMap
      // Iterate through the map and update Inventories_lot for each ID_lot
      for (const [ID_lot, totalAmount] of updatedInventoriesLotMap) {
        // Find the current Inventories_lot value for the matching ID_lot
        const currentInventoriesLot = Number(
          allImportedProducts.find((product) => product.ID_lot === ID_lot)
            .Inventories_lot
        );

        // Calculate the updated Inventories_lot
        const updatedInventoriesLot = currentInventoriesLot - totalAmount;

        // Update the Inventories_lot of the current product
        allImportedProducts.find(
          (product) => product.ID_lot === ID_lot
        ).Inventories_lot = updatedInventoriesLot;

        // Create a PUT request promise and add it to the updatePromises array
        const updatePromise = axios.put(
          `http://localhost:2001/lotUpdate/${ID_lot}`,
          {
            Inventories_lot: updatedInventoriesLot,
          }
        );
        updatePromises.push(updatePromise);
      }

      // Wait for all update promises to complete
      await Promise.all(updatePromises);

      console.log("อัปเดตข้อมูลเรียบร้อย");

      // Create an array to store promises for adding products
      const addProductPromises = allImportedProducts.map((product) => {
        // Extract the product data from the object and send it to the server
        const productData = {
          ID_sales: product.ID_sales,
          Nameproduct: product.Nameproduct,
          Amount_products: product.Amount_products,
          ID_lot: product.ID_lot,
          remark: product.remark,
          ID_agent: product.ID_agent,
          Dete_requisition: product.Dete_requisition,
        };

        return axios.post("http://localhost:2001/addRequisition", productData);
      });

      // Use Promise.allSettled to wait for all promises to complete
      const responses = await Promise.allSettled(addProductPromises);

      // Check for any failed promises
      const failedResponses = responses.filter(
        (response) => response.status === "rejected"
      );

      if (failedResponses.length === 0) {
        console.log("เพิ่มสินค้าเรียบร้อย");
        navigate("/ProductLOT");
      } else {
        // Handle the case where some promises failed
        console.log("มีข้อผิดพลาดในการเพิ่มสินค้า:");
        failedResponses.forEach((response) => {
          console.error(response.reason);
        });
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูลสินค้า");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดำเนินการ:", error);
      alert("เกิดข้อผิดพลาดในการดำเนินการ");
    }
  };

  console.log("allImportedProducts", allImportedProducts);

  //!ตรวจสอบค้าที่กรอก
  const handleInput = (event) => {
    const { name, value } = event.target;

    // ตรวจสอบว่าค่าที่ป้อนเป็นติดลบหรือไม่
    if (name === "Amount_products") {
      // ถ้าเป็นค่าติดลบให้กำหนดค่าให้เป็น 1
      const Amount_productsValue = Number(value);
      if (Amount_productsValue < 1) {
        setValues((prev) => ({
          ...prev,
          [name]: "1",
        }));
        alert("กรุณากรอกสินค้าที่มากกว่า 1 ชิ้น");
        return; // ไม่อัปเดตค่าใน state
      }
    }

    // ตรวจสอบว่าค่าที่ป้อนไม่เกินคงเหลือของล็อตสินค้า
    if (name === "Amount_products" && values.Inventories_lot) {
      const amountValue = Number(value);
      const remainingInventory = Number(values.Inventories_lot);

      if (amountValue > remainingInventory) {
        setValues((prev) => ({
          ...prev,
          [name]: remainingInventory.toString(),
        }));
        alert("จำนวนสินค้าไม่สามารถเกินคงเหลือของล็อตสินค้าได้");
        return; // ไม่อัปเดตค่าใน state
      }
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Values", values);

  // Function to delete a product by index
  const handleDeleteProduct = (index) => {
    const updatedImportedProducts = allImportedProducts.filter(
      (_, i) => i !== index
    );
    setAllImportedProducts(updatedImportedProducts);
  };

  //!fullname table
  const [agentFullnameMap, setAgentFullnameMap] = useState({}); // สร้าง state สำหรับเก็บ fullname ของตัวแทนจำหน่าย
  useEffect(() => {
    // ดึงข้อมูล fullname ของตัวแทนจำหน่าย
    axios
      .get("http://localhost:2001/NameAgent")
      .then((res) => {
        // สร้าง Map ที่เก็บ fullname ตาม ID_agent
        const fullnameMap = {};
        res.data.forEach((agent) => {
          fullnameMap[agent.ID_agent] = agent.fullname;
        });
        // อัปเดต state ด้วยข้อมูล fullname
        setAgentFullnameMap(fullnameMap);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form className="containerPRODUCT" action="" onSubmit={handleSubmit}>
        <h3 className="h3">เบิกสินค้าในคลัง</h3>
        <div className="bodyImportLOT">
          <Row>
            <Col md={4}>
              {/* <input name="Name_product" type="text" className="" onChange={handleInput}/> */}
              <div className="spanProduct">
                <Row>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>ชื่อสินค้า
                    </span>
                    <select
                      name="Nameproduct"
                      id="Nameproduct"
                      type="text"
                      className="form-select"
                      onChange={(e) => onChangeProduct(e)}
                      // style={{ marginLeft: "15px" }}
                    >
                      <option value="">เลือกสินค้า</option>
                      {nameproduct.map((item, index) => (
                        <option key={index} value={item.ID_product}>
                          {item.Name_product}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </div>
              <div className="spanProduct">
                <Row>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>ล็อตสินค้า
                    </span>
                    <select
                      name="ID_lot"
                      id="ID_lot"
                      type="text"
                      className="form-select"
                      onChange={(e) => {
                        setInventories_lot(e.target.value); // เมื่อมีการเลือกล็อตใหม่ กำหนดค่าให้กับ state ID_lot
                        onChangeInventories_lot(e);
                      }}
                    >
                      <option value="">เลือกล็อต</option>
                      {nameLot.map((item, index) => (
                        <option key={index} value={item.ID_lot}>
                          {item.ID_lot}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>คงเหลือ
                    </span>
                    <input
                      style={{ backgroundColor: "rgba(240, 248, 255, 0.814)" }}
                      className="form-control"
                      name="Inventories_lot"
                      id="Inventories_lot"
                      type="text"
                      value={values.Inventories_lot}
                      disabled
                      onChange={handleInput}
                    />
                  </Col>
                  <Col>
                    <span className="txt">
                      <h6>*</h6>จำนวนสินค้า
                    </span>
                    <input
                      class="form-control"
                      name="Amount_products"
                      type="number"
                      onChange={handleInput}
                    />
                  </Col>
                </Row>
              </div>

              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>ตัวแทนจำหน่าย
                </span>
                <select
                  name="ID_agent"
                  id="ID_agent"
                  type="text"
                  className="form-select"
                  onChange={handleInput}
                  // style={{ marginLeft: "15px" }}
                >
                  <option value="">ลูกค้า</option>
                  {nameagent.map((item, index) => (
                    <option key={index} value={item.ID_agent}>
                      {item.fullname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="spanProduct">
                <span className="txt">
                  <h6>*</h6>หมายเหตุ
                </span>
                <textarea
                  class="form-control"
                  name="remark"
                  type="text"
                  placeholder="หมายเหตุ"
                  onChange={handleInput}
                />
              </div>
              <div className="spanProduct">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddProduct}
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </Col>
            <Col md={8}>
              <div className="table-containerLOT">
                <table className=" table table-striped table-dark ">
                  <thead className="table-secondary">
                    <tr>
                      <th>ชื่อสินค้า</th>
                      <th>รหัสล็อต</th>
                      <th>จำนวน(ชิ้น)</th>
                      <th>ผู้รับ</th>
                      <th>หมายเหตุ</th>
                      <th>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allImportedProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.Nameproduct}</td>
                        <td>{product.ID_lot}</td>
                        <td>{product.Amount_products}</td>
                        {/* <td>{product.ID_agent}</td> */}
                        <td>{agentFullnameMap[product.ID_agent]}</td> {/* แสดง fullname แทน ID_agent */}
                        <td>{product.remark}</td>
                        <td>
                          <h3
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(index)}
                          >
                            ลบ
                          </h3>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* <tbody>
                    {records.map((records, index) => {
                      return (
                        <tr key={index}>
                          <td scope="row">{records.ID_requisition}</td>
                          <td>{records.Amount_products}</td>
                          <td>{records.agent_fullname}</td>
                          <td>{formatDate(records.Dete_requisition)}</td>
                          <td>{records.sales_fullname}</td>
                          <td>{records.remark}</td>
                        </tr>
                      );
                    })}
                  </tbody> */}
                </table>
              </div>
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

              <Col>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    className="save btn btn-success"
                    onClick={handleSubmit}
                  >
                    บันทึก
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Requisition;
