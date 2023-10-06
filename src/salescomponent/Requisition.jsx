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
import Modal from "./LotModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Requisition() {
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  //!เพิ่มลงตาราง
  const [importedProducts, setImportedProducts] = useState([]); // เก็บข้อมูลสินค้าที่เพิ่มแต่ละชุด
  const [allImportedProducts, setAllImportedProducts] = useState([]); // เก็บข้อมูลทั้งหมดที่คุณต้องการบันทึกลงในฐานข้อมูล
  const handleAddProduct = () => {
    // ตรวจสอบว่าข้อมูลสินค้าถูกกรอกครบหรือไม่
    if (
      values.Dete_requisition &&
      values.ID_sales &&
      values.Nameproduct &&
      values.Bill &&
      values.ID_product &&
      values.Amount &&
      values.ID_agent
    ) {
      // สร้างอ็อบเจ็กต์ใหม่เพื่อเก็บข้อมูลสินค้าที่เพิ่ม
      const newProduct = {
        ID_sales: values.ID_sales,
        Amount: values.Amount,
        Bill: values.Bill,
        Nameproduct: values.Nameproduct,
        Amount_products: values.Amount_products,
        ID_lot: values.ID_lot,
        remark: values.remark,
        Dete_requisition: values.Dete_requisition,
        ID_product: values.ID_product, // เพิ่ม ID_product ลงในข้อมูลสินค้า
      };
      setImportedProducts([...importedProducts, newProduct]);
      setAllImportedProducts([...allImportedProducts, newProduct]);
    } else {
      // แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };
  console.log("importedProducts", importedProducts);
  console.log("allImportedProducts", allImportedProducts);

  //!add
  const [values, setValues] = useState({
    Dete_requisition: "",
    ID_agent: "",
    Bill: "",
    ID_sales: `${userLoginData[0].ID_sales}`,
    Nameproduct: "",
    ID_product: "",
    remark: "",
    Amount_products: "",
    ID_lot: "",
    Lot_ID: "",
    Inventories_lot: "",
    price_lot: "",
    Amount: "",
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

  const [adress, setAdress] = useState([]);
  //!ที่อยู่
  const onChangeAgentSelection = (e) => {
    const selectedValue = e.target.value; // The combined string, e.g., "John Doe:123"
    const [selectedFullName, selectedIDAgent] = selectedValue.split(":"); // Split the string into fullname and ID_agent

    setValues((prevValues) => ({
      ...prevValues,
      fullname: selectedFullName,
      ID_agent: selectedIDAgent,
    }));

    // Use selectedIDAgent in your axios GET request
    axios
      .get(`http://localhost:2001/NameAgentAD/${selectedIDAgent}`)
      .then((res) => {
        setAdress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("adress", adress);
  console.log("nameagent", nameagent);

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
  console.log("nameproduct", nameproduct);
  console.log("nameLot", nameLot);

  //! แสดงคงเหลือตาม Id
  const [lotBalances, setLotBalances] = useState({});
  const onChangeProduct = (e) => {
    const selectedValue = e.target.value; // The combined string, e.g., "John Doe:123"
    const [selectedProduct, selectedIDProduct] = selectedValue.split(":"); // Split the string into fullname and ID_agent

    setValues((prevValues) => ({
      ...prevValues,
      Nameproduct: selectedProduct,
      ID_product: selectedIDProduct,
    }));

    axios
      .get(`http://localhost:2001/Lotforproduct/${ID_product}`)
      .then((res) => {
        // สร้างอ็อบเจ็กต์ใหม่ที่จะใช้ในการเก็บข้อมูลคงเหลือของแต่ล็อต
        const balances = {};
        res.data.forEach((lot) => {
          balances[lot.ID_lot] = calculateTotalAmountSUM(lot.ID_lot);
        });
        setLotBalances(balances);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("lotBalances", lotBalances);

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

    if (AllExport.length === 0) {
      alert("ยังไม่มีข้อมูลสินค้าที่เพิ่ม");
      return;
    }

    try {
      // ตามรหัสของคุณที่เปลี่ยนเป็น AllExport
      // Create an array to store promises for updating Inventories_lot
      const updatePromises = [];

      // Create a map to store the calculated updated Inventories_lot values for each ID_lot
      const updatedInventoriesLotMap = new Map();

      // Iterate through AllExport to calculate updated Inventories_lot
      for (const product of AllExport) {
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
          AllExport.find((product) => product.ID_lot === ID_lot).Inventories_lot
        );

        // Calculate the updated Inventories_lot
        const updatedInventoriesLot = currentInventoriesLot - totalAmount;

        // Update the Inventories_lot of the current product
        AllExport.find((product) => product.ID_lot === ID_lot).Inventories_lot =
          updatedInventoriesLot;

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
      const addProductPromises = AllExport.map((product) => {
        // Extract the product data from the object and send it to the server
        const productData = {
          ID_sales: product.ID_sales,
          ID_product: product.ID_product,
          Amount_products: product.Amount_products,
          ID_lot: product.ID_lot,
          remark: product.remark,
          ID_agent: product.ID_agent,
          Dete_requisition: product.Dete_requisition,
          Bill: product.Bill,
          ID_product: product.ID_product,
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
        MySwal.fire({
          title: <strong>ทำรายการเบิกเสร็จสิ้น</strong>,
          // html: <i>คุณเข้าสู่ระบบในตำแหน่งพนักงานฝ่ายขาย</i>,
          icon: "success",
        });
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

  //!ตรวจสอบค้าที่กรอก
  const [totalAmount, setTotalAmount] = useState(0); // Initialize total to 0
  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "Amount_products") {
      const Amount_productsValue = Number(value);
      if (Amount_productsValue < 1) {
        setValues((prev) => ({
          ...prev,
          [name]: "1",
        }));
        alert("กรุณากรอกสินค้าที่มากกว่า 1 ชิ้น");
        return; // ไม่อัปเดตค่าใน state
      }
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // คำนวณผลรวมของ Amount_products ทันทีที่ผู้ใช้กรอกข้อมูล
      const updatedTotal = allImportedProducts.reduce((total, product) => {
        if (product.ID_lot === values.ID_lot) {
          return total + (Number(product.Amount_products) || 0);
        }
        return total;
      }, 0);

      // อัปเดตค่าผลรวมใน state
      setCalculatedAmount((prevCalculatedAmount) => ({
        ...prevCalculatedAmount,
        [values.ID_lot]: updatedTotal,
      }));
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Values", values);

  //! Function to delete a product by index
  const handleDeleteLot = (productIDToDelete) => {
    // กรองรายการที่ต้องการลบออกจาก AllExport
    const updatedAllExport = AllExport.filter(
      (product) => product.ID_product !== productIDToDelete
    );

    // อัพเดทข้อมูลใน state
    setAllExport(updatedAllExport);
  };

  const handleDeleteProduct = (productIDToDelete) => {
    // กรองรายการที่ต้องการลบออกจาก allImportedProducts
    const updatedAllImportedProducts = allImportedProducts.filter(
      (product) => product.ID_product !== productIDToDelete
    );

    // อัพเดทข้อมูลใน state
    setAllImportedProducts(updatedAllImportedProducts);
  };

  // ฟังก์ชันสำหรับลบสินค้าใน AllExport ตามดัชนี
  const handleDeleteProductLot = (index) => {
    const updatedAllExport = [...AllExport];
    updatedAllExport.splice(index, 1);
    setAllExport(updatedAllExport);
  };
  // ฟังก์ชันสำหรับลบทั้งหมดใน AllExport
  const handleDeleteProductLotALL = () => {
    setAllExport([]);
  };

  //! ฟังก์ชันสำหรับการลบรายการที่เลือก
  const handleDeleteItem = (indexToDelete) => {
    // ดึงข้อมูลรายการที่เลือกที่จะลบ
    const itemToDelete = AllExport[indexToDelete];
    // หาค่า ID_lot ของรายการที่จะลบ
    const IDLotToDelete = itemToDelete.ID_lot;

    // ลบรายการที่เลือกออกจาก AllExport
    setAllExport((prev) =>
      prev.filter((item) => item.ID_lot !== IDLotToDelete)
    );

    // หัก price_lot ของรายการที่ลบออกจาก totalPrice
    setTotalPrice((prevTotalPrice) => prevTotalPrice - itemToDelete.price_lot);
  };
  const handleDeleteItemPR = (indexToDelete) => {
    // ดึงข้อมูลรายการที่เลือกที่จะลบ
    const itemToDelete = AllExport[indexToDelete];
    // หาค่า ID_lot ของรายการที่จะลบ
    const IDproductToDelete = itemToDelete.ID_product;

    // ลบรายการที่เลือกออกจาก AllExport
    setAllExport((prev) =>
      prev.filter((item) => item.ID_product !== IDproductToDelete)
    );

    // หัก price_lot ของรายการที่ลบออกจาก totalPrice
    setTotalPrice((prevTotalPrice) => prevTotalPrice - itemToDelete.price_lot);
  };

  //! แสดงคงเหลือล่าสุด
  const [calculatedAmount, setCalculatedAmount] = useState({});
  const calculateTotalAmount = () => {
    const totalAmount = allImportedProducts
      .filter((product) => product.ID_lot === values.ID_lot)
      .reduce((total, product) => total + Number(product.Amount_products), 0);

    // หา Inventories_lot ของ ID_lot ที่เลือก
    const selectedLot = nameLot.find((lot) => lot.ID_lot === values.ID_lot);

    if (selectedLot) {
      // ลบผลรวมของ Amount_products ออกจาก Inventories_lot
      const remainingInventory = selectedLot.Inventories_lot - totalAmount;
      return remainingInventory;
    }

    return 0; // หากไม่พบ Inventories_lot
  };
  // สร้างฟังก์ชัน calculateTotalAmountSUM เพื่อคำนวณผลรวมของ Amount_products
  const calculateTotalAmountSUM = () => {
    let total = 0;

    for (const product of AllExport) {
      total += Number(product.Amount_products);
    }

    return total;
  };
  const calculateTotalPrice = () => {
    let totalPR = 0;

    for (const product of AllExport) {
      totalPR += Number(product.price_lot * product.Amount_products);
    }

    return totalPR;
  };

  //! bill
  const [latestBill, setLatestBill] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2001/BillOd")
      .then((res) => {
        // ดึงข้อมูล Bill จากการตอบกลับและแสดงในคอนโทรลที่คุณต้องการ
        const latestBill =
          res.data.length > 0 ? res.data[res.data.length - 1].Bill + 1 : 1;
        setLatestBill(latestBill);
        setValues((prev) => ({ ...prev, Bill: latestBill }));
      })
      .catch((err) => console.log(err));
  }, []);

  function formatDateY(dateString) {
    if (!dateString) {
      return ""; // ถ้าไม่มีข้อมูลวันที่ให้แสดงเป็นข้อความว่าง
    }

    const date = new Date(dateString);

    // ลบ 543 จากปีพ.ศ. เพื่อแสดงในรูปแบบค.ศ.
    const yearBC = date.getFullYear();

    return yearBC.toString(); // แสดงปีค.ศ. เป็นข้อความ
  }

  //! Modal
  const [selectedIDProduct, setSelectedIDProduct] = useState("");
  const [selectedNProduct, setSelectedNProduct] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState({});
  const handleOpenModal = (selectedIDProduct, selectedAmount) => {
    setSelectedIDProduct(selectedIDProduct);
    setSelectedAmount(selectedAmount);
    setIsModalOpen(true);

    axios
      .get(`http://localhost:2001/Lotforproduct/${selectedIDProduct}`)
      .then((res) => {
        const lotData = res.data; // นำข้อมูลที่ได้จากการ get มาเก็บไว้ในตัวแปร lotData
        // ตรวจสอบค่าของ level
        const level = adress[0].level;
        const name = lotData[0].Name_product;
        setNameLot(lotData);
        setSelectedNProduct(name);

        // ดำเนินการดึงข้อมูลราคาตามระดับของ level
        let priceData = res.data[0].Retail_price;
        if (level === "ระดับขั้น 1") {
          priceData = lotData[0].Level_1_price;
        } else if (level === "ระดับขั้น 2") {
          priceData = lotData[0].Level_2_price;
        } else if (level === "ระดับขั้น 3") {
          priceData = lotData[0].Level_3_price;
        }

        setProductPrice(priceData);

        // ตอนนี้คุณสามารถใช้ lotData และ priceData ในการดำเนินการต่อได้
        console.log("lotData", lotData);
        console.log("priceData", priceData);
        console.log("selectedIDProduct", selectedIDProduct);
        console.log("selectedAmount", selectedAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("selectedIDProduct", selectedIDProduct);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveData = () => {
    // ทำบันทึกข้อมูลที่ต้องการที่นี่
    // เมื่อเสร็จสิ้นการบันทึก ปิด Modal
    // setSelectedRowData([]); // Clear selectedRowData after saving
    handleCloseModal();
  };
  console.log("productPrice", productPrice);

  //! เพิ่มข้อมูลก่อนบันทึก
  // const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [AllExport, setAllExport] = useState([]);
  const handleAddItem = (index) => {
    const selectedItem = nameLot[index];
    const newProductSave = {
      ID_product: selectedItem.ID_product,
      Bill: latestBill,
      Name_product: selectedItem.Name_product,
      Amount_products: values.Amount_products,
      ID_lot: selectedItem.ID_lot,
      Lot_ID: selectedItem.Lot_ID,
      remark: values.remark,
      Inventories_lot: selectedItem.Inventories_lot,
      date_import: selectedItem.date_import,
      price_lot: productPrice,
      ID_sales: values.ID_sales,
      ID_agent: values.ID_agent,
      Dete_requisition: values.Dete_requisition,
    };
    setSelectedRowData([...selectedRowData, newProductSave]);
    // เพิ่มแถวใหม่ลงใน allImportedProducts
    setAllExport((prev) => [...prev, newProductSave]);
    // เพิ่ม price_lot ของสินค้าลงใน totalPrice
    // setTotalPrice(totalPrice + newProductSave.price_lot);
    // คำนวณค่า totalPrice โดยนำ Amount_products มาคูณกับ price_lot
    // const totalPriceForItem =
    //   newProductSave.Amount_products * newProductSave.price_lot;
    // setTotalPrice(totalPrice + totalPriceForItem);
  };

  console.log("ก่อนบันทึก", selectedRowData);
  console.log("ก่อนบันทึกAllExport", AllExport);

  //! ผลรวมสินค้าแต่ละไอดี
  // กำหนดตัวแปรสำหรับเก็บผลรวม Amount_products
  const totalAmountByProduct = {};

  // คำนวณผลรวม Amount_products สำหรับแต่ละ ID_product
  AllExport.forEach((exportedProduct) => {
    const { ID_product, Amount_products } = exportedProduct;
    if (totalAmountByProduct[ID_product]) {
      totalAmountByProduct[ID_product] += Number(Amount_products);
    } else {
      totalAmountByProduct[ID_product] = Number(Amount_products);
    }
  });
  const totalPriceByProduct = {};

  // คำนวณผลรวม Amount_products สำหรับแต่ละ ID_product
  AllExport.forEach((exportedProduct) => {
    const { ID_product, price_lot, Amount_products } = exportedProduct;
    if (totalPriceByProduct[ID_product]) {
      totalPriceByProduct[ID_product] += Number(price_lot * Amount_products);
    } else {
      totalPriceByProduct[ID_product] = Number(price_lot * Amount_products);
    }
  });

  //!จำนวนต้องการเบิก
  const [selectedAmount, setSelectedAmount] = useState(0);
  //แสดงข้อมูลที่เพิ่ม
  const filteredExport = AllExport.filter(
    (product) => product.ID_product === Number(selectedIDProduct)
  );
  console.log("filteredExport", filteredExport);

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
                    <span className="txt">เลขเบิกสินค้า</span>
                    <input
                      style={{ backgroundColor: " #ffffffd7 " }}
                      class="form-control"
                      name="Bill"
                      type="text"
                      // value={latestBill}
                      value={`${formatDateY(
                        values.Dete_requisition
                      )}-${latestBill}`}
                      onChange={handleInput}
                    />
                  </Col>
                  <Col>
                    <span className="txt">ผู้ทำรายการ</span>
                    <input
                      style={{ backgroundColor: "#ffffffd7" }}
                      class="form-control"
                      name=""
                      type="text"
                      value={userLoginData[0].fullname}
                      onChange={handleInput}
                    />
                  </Col>
                </Row>
              </div>

              <div className="spanProduct">
                <Row>
                  <Col>
                    <div className="spanProduct">
                      <span className="txt">
                        <h6>*</h6>ตัวแทนจำหน่าย
                      </span>
                      {/* <select
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
                      </select> */}
                      <select
                        name="agentInfo" // Use a single field to store both fullname and ID_agent
                        id="agentInfo"
                        type="text"
                        className="form-select"
                        onChange={(e) => onChangeAgentSelection(e)}
                        onClick={() => {
                          handleDeleteProductLotALL();
                        }}
                      >
                        <option value="">ลูกค้า</option>
                        {nameagent.map((item, index) => (
                          <option
                            key={index}
                            value={`${item.fullname}:${item.ID_agent}`} // Combine both values as a string
                          >
                            {item.fullname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className="spanProduct">
                      <span className="txt">
                        <h6>*</h6>วันที่เบิก
                      </span>
                      <input
                        class="form-control"
                        name="Dete_requisition"
                        type="date"
                        onChange={handleInput}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="spanProduct">
                <Row>
                  <Col>
                    <span className="txt">ที่อยู่</span>
                    <textarea
                      className="adressAD form-control"
                      name=""
                      type="text"
                      disabled
                      value={`จังหวัด: ${
                        adress.length > 0 ? adress[0].province : ""
                      } 
อำเภอ: ${adress.length > 0 ? adress[0].districts : ""} 
ตำบล: ${adress.length > 0 ? adress[0].subdistricts : ""} 
รหัสไปรษณีย์: ${adress.length > 0 ? adress[0].zip_code : ""}
ที่อยู่: ${adress.length > 0 ? adress[0].Address : ""}
เบอร์โทร: ${adress.length > 0 ? adress[0].Tel : ""} `}
                      onChange={(e) => {
                        // เมื่อมีการเปลี่ยนแปลงใน textarea ให้อัปเดตค่าในตัวแปร adress
                        const updatedAdress = [
                          { ...adress[0], [e.target.name]: e.target.value },
                        ];
                        setAdress(updatedAdress);
                      }}
                    />
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">
                      <h6>*</h6>ชื่อสินค้า
                    </span>
                    <select
                      name="productInfo"
                      id="productInfo"
                      type="text"
                      className="form-select"
                      onChange={(e) => onChangeProduct(e)}
                      // style={{ marginLeft: "15px" }}
                    >
                      <option value="">เลือกสินค้า</option>
                      {nameproduct.map((item, index) => (
                        <option
                          key={index}
                          value={`${item.Name_product}:${item.ID_product}`} // Combine both values as a string
                        >
                          {item.Name_product}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">
                      <h6>*</h6>จำนวนเบิก
                    </span>
                    <input
                      class="form-control"
                      name="Amount"
                      type="number"
                      onChange={handleInput}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct" style={{ marginTop: "38px" }}>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleAddProduct}
                    >
                      เพิ่มสินค้า
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Row style={{ marginBottom: "0px" }}>
                <Col md={8}></Col>
                <Col md={2}>
                  <span className="txt">สินค้ารวมทั้งสิ้น</span>
                  <input
                    style={{
                      backgroundColor: "rgba(240, 248, 255, 0.814)",
                      width: "90%",
                    }}
                    className="form-control"
                    name="Total"
                    id="Total"
                    type="text"
                    value={calculateTotalAmountSUM()}
                    disabled
                    onChange={handleInput}
                  />
                </Col>
                <Col md={2}>
                  <span className="txt">ราคารวมทั้งสิ้น</span>
                  <input
                    style={{
                      backgroundColor: "rgba(240, 248, 255, 0.814)",
                      width: "90%",
                    }}
                    className="form-control"
                    name="TotalPR"
                    id="TotalPR"
                    type="text"
                    value={calculateTotalPrice()}
                    disabled
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <div className="table-containerLOT" style={{ marginTop: "10px" }}>
                <table className=" table table-striped table-dark ">
                  <thead className="table-secondary">
                    <tr>
                      <th>ชื่อสินค้า</th>
                      <th>จำนวนเบิก</th>
                      <th>จำนวนทั้งหมด (ชิ้น)</th>
                      <th>ราคารวม</th>
                      <th>ล็อต</th>
                      <th>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allImportedProducts.map((product, index) => {
                      // ค้นหาผลรวม Amount_products สำหรับสินค้านี้
                      const totalAmount =
                        totalAmountByProduct[product.ID_product] || 0;
                      const totalPrice =
                        totalPriceByProduct[product.ID_product] || 0;

                      return (
                        <tr key={index}>
                          <td>{product.Nameproduct}</td>
                          <td>{product.Amount}</td>
                          <td>{totalAmount}</td>
                          <td>{totalPrice}</td>
                          <td>
                            <h3
                              className="btn btn-warning"
                              onClick={() =>
                                handleOpenModal(
                                  product.ID_product,
                                  product.Amount
                                )
                              }
                            >
                              ล็อต
                            </h3>
                          </td>
                          <td>
                            <h3
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteProduct(product.ID_product);
                                handleDeleteLot(product.ID_product);
                              }}
                            >
                              ลบ
                            </h3>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <h3 className="h3LOT">ข้อมูลล็อตของ {selectedNProduct}</h3>
                  <div style={{ margin: "0% 0% 1% 0%" }}>
                    <Row>
                      <Col md={2}>
                        <th>จำนวน (ชิ้น)</th>
                        <input
                          className="form-control"
                          name="Amount_products"
                          id="Amount_products"
                          type="number"
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={4}>
                        <th>หมายเหตุ</th>
                        <input
                          className="form-control"
                          name="remark"
                          id="remark"
                          type="text"
                          style={{ width: "100%", height: "40px" }}
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={2}>
                        <span className="txt">สินค้ารวมทั้งสิ้น</span>
                        <input
                          style={{
                            backgroundColor: "rgba(240, 248, 255, 0.814)",
                            width: "90%",
                          }}
                          className="form-control"
                          name="Total"
                          id="Total"
                          type="text"
                          value={""} // ใช้ค่าที่ถูกคำนวณจาก calculateTotalAmount
                          disabled
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={2}>
                        <span className="txt">ราคารวมทั้งสิ้น</span>
                        <input
                          style={{
                            backgroundColor: "rgba(240, 248, 255, 0.814)",
                            width: "90%",
                          }}
                          className="form-control"
                          name="TotalPR"
                          id="TotalPR"
                          type="text"
                          value={""} // แสดงผลรวม totalPrice
                          // value={totalPrice} // แสดงผลรวม totalPrice
                          disabled
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={2}>
                        <span className="txt">จำนวนที่ต้องเบิกในล็อตนี้</span>
                        <input
                          style={{
                            backgroundColor: "rgba(240, 248, 255, 0.814)",
                            width: "90%",
                            color: "#ff2a00",
                          }}
                          className="form-control"
                          name="Amount"
                          id="Amount"
                          type="text"
                          value={selectedAmount}
                          disabled
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col>
                      <div className="lot-table">
                        <table className="table table-striped table-dark">
                          <thead className="table-secondary">
                            <tr>
                              <th>รหัสล็อต</th>
                              <th>คงเหลือ (ชิ้น)</th>
                              <th>ราคา</th>
                              <th>เพิ่มรายการ</th> {/* เพิ่มปุ่มนี้ */}
                            </tr>
                          </thead>
                          <tbody>
                            {nameLot.map((item, index) => (
                              <tr key={index}>
                                <td>{`${formatDateY(item.date_import)}-${
                                  item.Lot_ID
                                }`}</td>
                                <td>{item.Inventories_lot}</td>
                                <td>{productPrice ? productPrice : "-"}</td>
                                <td>
                                  <div
                                    style={{
                                      display: "grid",
                                      placeItems: "center",
                                    }}
                                  >
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      onClick={() => handleAddItem(index)} // ส่ง index เข้าไปในฟังก์ชัน
                                    >
                                      เบิก
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                    <Col>
                      <div className="lot-table">
                        <table className="table table-striped table-dark">
                          <thead className="table-secondary">
                            <tr>
                              <th>รหัสล็อต</th>
                              <th>ชื่อสินค้า</th>
                              <th>จำนวน (ชิ้น)</th>
                              <th>หมายเหตุ</th>
                              <th>ลบ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredExport.map((product, index) => (
                              <tr key={index}>
                                <td>{`${formatDateY(product.date_import)}-${
                                  product.Lot_ID
                                }`}</td>
                                <td>{product.Name_product}</td>
                                <td>{product.Amount_products}</td>
                                {/* <td>{product.remark}</td> */}
                                <td style={{ width: "250px" }}>
                                  <textarea
                                    name="remark"
                                    id="remark"
                                    type="text"
                                    style={{
                                      width: "95%",
                                      height: "33px",
                                      backgroundColor: "#00000000",
                                      color: "white",
                                      border: "0px",
                                    }}
                                    value={product.remark}
                                  />
                                </td>
                                <td>
                                  <h3
                                    className="btn btn-danger"
                                    onClick={() => {
                                      handleDeleteProductLot(index); // เรียกใช้ handleDeleteProductLot
                                      handleDeleteItem(index); // เรียกใช้ handleDeleteItem
                                    }}
                                    style={{ margin: "0px" }}
                                  >
                                    ลบ
                                  </h3>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>

                  <div
                    className="modal-buttons"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px",
                    }}
                  >
                    <h3
                      className="btn btn-danger left-button"
                      onClick={handleDeleteProductLotALL}
                    >
                      ลบทั้งหมด
                    </h3>
                    <button
                      className="btn btn-secondary right-button"
                      onClick={() => {
                        handleCloseModal();
                        // handleDeleteProductLotALL();
                      }}
                    >
                      รายการ
                    </button>
                  </div>
                </Modal>
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
