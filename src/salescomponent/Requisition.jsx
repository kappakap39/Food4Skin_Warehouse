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
  const [errors, setErrors] = useState({});

  const handleAddProduct = () => {
    // ตรวจสอบว่าข้อมูลสินค้าถูกกรอกครบหรือไม่ และไม่มี errors
    if (
      values.Dete_requisition &&
      values.ID_sales &&
      values.Nameproduct &&
      values.Bill &&
      values.ID_product &&
      Number(values.Amount) <= Number(values.TotalInventories) &&
      Number(0) < Number(values.Amount) &&
      values.ID_agent
    ) {
      // เพิ่มสินค้าเมื่อไม่มี errors
      const newProduct = {
        ID_sales: values.ID_sales,
        Amount: values.Amount,
        Bill: values.Bill,
        Nameproduct: values.Nameproduct,
        Amount_products: values.Amount_products,
        ID_lot: values.ID_lot,
        remark: values.remark,
        TotalInventories: values.TotalInventories,
        Dete_requisition: values.Dete_requisition,
        ID_product: values.ID_product,
      };
      setImportedProducts([...importedProducts, newProduct]);
      setAllImportedProducts([...allImportedProducts, newProduct]);
      setValues({ ...values, Amount: "" });
      document.querySelector('input[name="Amount"]').value = "";
    } else {
      // แสดงข้อผิดพลาดหรือแจ้งเตือนอื่น ๆ
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
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
    TotalInventories: "",
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
      .get("http://localhost:2001/ShowtableproductReport")
      .then((res) => setNameproduct(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("nameproduct", nameproduct);
  console.log("nameLot", nameLot);

  //! แสดงคงเหลือตาม Id
  const [lotBalances, setLotBalances] = useState({});
  const onChangeProduct = (e) => {
    const selectedValue = e.target.value; // The combined string, e.g., "John Doe:123"
    const [selectedProduct, selectedIDProduct, TotalInventoriesSUM] =
      selectedValue.split(":"); // Split the string into fullname and ID_agent

    setValues((prevValues) => ({
      ...prevValues,
      Nameproduct: selectedProduct,
      ID_product: selectedIDProduct,
      TotalInventories: TotalInventoriesSUM,
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
          // Dete_requisition: product.Dete_requisition,
          Dete_requisition: values.Dete_requisition,
          Amount_products: product.Amount_products,
          remark: product.remark,
          ID_sales: values.ID_sales,
          ID_agent: values.ID_agent,
          ID_lot: product.ID_lot,
          Bill: latestBill,
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
      // if (Amount_productsValue < 1) {
      //   setValues((prev) => ({
      //     ...prev,
      //     [name]: "1",
      //   }));
      //   alert("กรุณากรอกสินค้าที่มากกว่า 1 ชิ้น");
      //   return; // ไม่อัปเดตค่าใน state
      // }
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

  const handleDeleteProduct = (index) => {
    // // ก่อนอื่นคัดลอกข้อมูล allImportedProducts ไปยังอาเรย์ใหม่
    // const updatedAllImportedProducts = [...allImportedProducts];
    // // ลบรายการที่เลือกออกจากอาเรย์ใหม่ตามดัชนี
    // updatedAllImportedProducts.splice(index, 1);
    // // อัปเดต state ด้วยอาเรย์ใหม่ที่ไม่รวมรายการที่ถูกลบ
    // setAllImportedProducts(updatedAllImportedProducts);

    setAllExport((prevAll) => {
      prevAll.filter((product) => {
        product.ID_product !== index;
      });
    });
    setAllImportedProducts((prevAll) => {
      prevAll.filter((product) => {
        product.ID_product !== index;
      });
    });
  };

  const handleDeleteProductLot = (index) => {
    console.log("handleDeleteProductLot", index);

    // // ก่อนอื่นคัดลอกข้อมูล AllExport ไปยังอาเรย์ใหม่
    // const updatedAllExport = [...AllExport];
    // // ลบรายการที่เลือกออกจากอาเรย์ใหม่ตามดัชนี
    // updatedAllExport.splice(index, 1);
    // // อัปเดต state ด้วยอาเรย์ใหม่ที่ไม่รวมรายการที่ถูกลบ
    // setAllExport(updatedAllExport);
    setAllExport((prevAll) => {
      return prevAll.filter((product) => {
        return product.ID_lot !== index;
      });
    });
  };

  // ฟังก์ชันสำหรับลบทั้งหมดใน AllExport
  const handleDeleteProductLotALL = () => {
    setAllExport([]);
    setAllImportedProducts([]);
  };

  //! ฟังก์ชันสำหรับการลบรายการที่เลือก
  const handleDeleteItem = (indexToDelete) => {
    console.log("handleDeleteItem", indexToDelete);

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
    console.log("handleDeleteItemPR", indexToDelete);

    // ดึงข้อมูลรายการที่เลือกที่จะลบ
    const itemToDelete = AllExport[indexToDelete];
    // หาค่า ID_lot ของรายการที่จะลบ
    const IDPRToDelete = itemToDelete.ID_product;

    // ลบรายการที่เลือกออกจาก AllExport
    setAllExport((prev) =>
      prev.filter((item) => item.ID_product !== IDPRToDelete)
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
  const calculateTotalAmountSUMONE = () => {
    let total = 0;

    for (const product of filteredExport) {
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
  const calculateTotalPriceONE = () => {
    let totalPR = 0;

    for (const product of filteredExport) {
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
    if (
      Number(values.Amount_products) >= 1 &&
      // Number(values.Amount_products) >= Number(Amount) &&
      values.remark
    ) {
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
      // เคลียร์ค่า Amount ใน values โดยเซ็ตเป็นค่าว่าง
      setValues({ ...values, Amount_products: "", remark: "" });
      // เคลียร์ค่าใน input ที่มี name เป็น "Amount"
      document.querySelector('input[name="Amount_products"]').value = "";
      document.querySelector('input[name="remark"]').value = "";
    } else {
      // แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }
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

  //!next page
  // กำหนด state และฟังก์ชันสำหรับเปลี่ยนหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const recordsPerPage = 4;
  const recordsPerPage2 = 5;
  const recordsPerPage3 = 5;
  // คำนวณดัชนีแรกและดัชนีสุดท้ายของรายการที่ต้องแสดง
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const lastIndex2 = currentPage2 * recordsPerPage2;
  const firstIndex2 = lastIndex2 - recordsPerPage2;
  const lastIndex3 = currentPage3 * recordsPerPage3;
  const firstIndex3 = lastIndex3 - recordsPerPage3;
  // คัดลอกรายการที่ต้องแสดงสำหรับหน้าปัจจุบัน
  const records = allImportedProducts.slice(firstIndex, lastIndex);
  const records2 = nameLot.slice(firstIndex2, lastIndex2);
  const records3 = filteredExport.slice(firstIndex3, lastIndex3);
  // คำนวณจำนวนหน้าทั้งหมด
  const npage = Math.ceil(allImportedProducts.length / recordsPerPage);
  const npage2 = Math.ceil(nameLot.length / recordsPerPage2);
  const npage3 = Math.ceil(filteredExport.length / recordsPerPage3);
  // สร้างรายการของหมายเลขหน้า
  const number = [...Array(npage + 1).keys()].slice(1);
  const number2 = [...Array(npage2 + 1).keys()].slice(1);
  const number3 = [...Array(npage3 + 1).keys()].slice(1);

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

  function prePage2() {
    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  function changeCPage2(id) {
    setCurrentPage2(id);
  }

  function nextPage2() {
    if (currentPage2 < npage2) {
      setCurrentPage2(currentPage2 + 1);
    }
  }
  function prePage3() {
    if (currentPage3 > 1) {
      setCurrentPage3(currentPage3 - 1);
    }
  }

  function changeCPage3(id) {
    setCurrentPage3(id);
  }

  function nextPage3() {
    if (currentPage3 < npage3) {
      setCurrentPage3(currentPage3 + 1);
    }
  }

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
                      name=""
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
                <Col md={4}>
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
                    >
                      <option style={{ fontSize: "14pxs" }} value="">
                        เลือกสินค้า
                      </option>
                      {nameproduct.map((item, index) => (
                        <option
                          style={{ fontSize: "14px" }}
                          key={index}
                          value={`${item.Name_product}:${item.ID_product}:${item.TotalInventories}`} // Combine both values as a string
                        >
                          {item.Name_product}
                          {/* : {item.TotalInventories} */}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">คงเหลือ</span>
                    <input
                      class="form-control"
                      id="TotalInventories"
                      name="TotalInventories"
                      type="number"
                      onChange={handleInput}
                      value={values.TotalInventories}
                      disabled
                      style={{ backgroundColor: "rgba(240, 248, 255, 0.814)" }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="spanProduct">
                    <span className="txt">
                      <h6>*</h6>จำนวนเบิก
                    </span>
                    <input
                      class="form-control"
                      id="Amount"
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
                <Col md={6}></Col>
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
                <Col md={2} className="d-flex align-self-end">
                  <h3
                    style={{ marginBottom: "0px", marginLeft: "40px" }}
                    className="btn btn-danger"
                    onClick={handleDeleteProductLotALL}
                  >
                    ลบทั้งหมด
                  </h3>
                </Col>
              </Row>
              <div
                className="table-containerLOTpr"
                style={{ marginTop: "10px" }}
              >
                <table className=" table table-striped table-dark ">
                  <thead className="table-secondary">
                    <tr>
                      <th>ชื่อสินค้า</th>
                      <th>คงเหลือ</th>
                      <th>จำนวนเบิก</th>
                      <th>จำนวนทั้งหมด (ชิ้น)</th>
                      <th>ราคารวม</th>
                      <th>ล็อต</th>
                      {/* <th>ลบ</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((product, index) => {
                      // ค้นหาผลรวม Amount_products สำหรับสินค้านี้
                      const totalAmount =
                        totalAmountByProduct[product.ID_product] || 0;
                      const totalPrice =
                        totalPriceByProduct[product.ID_product] || 0;

                      return (
                        <tr key={index}>
                          <td>{product.Nameproduct}</td>
                          <td>
                            {Number(product.TotalInventories - totalAmount) <=
                            -1 ? (
                              <span className="red-text">
                                {product.TotalInventories - totalAmount}
                              </span>
                            ) : Number(
                                product.TotalInventories - totalAmount
                              ) <= 0 ? (
                              <span style={{ color: "#dfc500" }}>
                                {product.TotalInventories - totalAmount}
                              </span>
                            ) : (
                              `${product.TotalInventories - totalAmount}`
                            )}
                            {/* {product.TotalInventories - totalAmount} */}
                          </td>

                          {/* <td>{product.TotalInventories - totalAmount}</td> */}
                          {/* <td>{product.TotalInventories}</td> */}
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
                          {/* <td>
                            <h3
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteProduct(product.ID_product); // เรียกใช้ handleDeleteProduct
                                handleDeleteItemPR(product.ID_product); // เรียกใช้ handleDeleteItem
                              }}
                            >
                              ลบ
                            </h3>
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
                          value={calculateTotalAmountSUMONE()} // ใช้ค่าที่ถูกคำนวณจาก calculateTotalAmount
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
                          value={calculateTotalPriceONE()}
                          disabled
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col>
                      <div className="lot-table ">
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
                            {records2.map((item, index) => {
                              const matchingFilteredExport =
                                filteredExport.find(
                                  (product) => product.ID_lot === item.ID_lot
                                );

                              const remainingInventory = matchingFilteredExport
                                ? item.Inventories_lot -
                                  matchingFilteredExport.Amount_products
                                : item.Inventories_lot;

                              return (
                                <tr key={index}>
                                  <td>{`${formatDateY(item.date_import)}-${
                                    item.Lot_ID
                                  }`}</td>
                                  <td>{remainingInventory}</td>
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
                                        onClick={() => handleAddItem(index)}
                                      >
                                        เบิก
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <nav
                        style={{ marginBottom: "10px" }}
                        className="Nextpage"
                      >
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={prePage2}
                            >
                              หน้าก่อน
                            </a>
                          </li>
                          {number2.map((n, i) => (
                            <li
                              className={`page-item ${
                                currentPage2 === n ? "active" : ""
                              }`}
                              key={i}
                            >
                              <a
                                href="#"
                                className="page-link"
                                onClick={() => changeCPage2(n)}
                              >
                                {n}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={nextPage2}
                            >
                              หน้าถัดไป
                            </a>
                          </li>
                        </ul>
                      </nav>
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
                              {/* <th>ลบ</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {records3.map((product, index) => (
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
                                {/* <td>
                                  <h3
                                    className="btn btn-danger"
                                    onClick={() => {
                                      handleDeleteProductLot(product.ID_lot); // เรียกใช้ handleDeleteProductLot
                                      handleDeleteItem(product.ID_lot); // เรียกใช้ handleDeleteItem
                                    }}
                                    style={{ margin: "0px" }}
                                  >
                                    ลบ
                                  </h3>
                                </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <nav
                        style={{ marginBottom: "10px" }}
                        className="Nextpage"
                      >
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={prePage3}
                            >
                              หน้าก่อน
                            </a>
                          </li>
                          {number3.map((n, i) => (
                            <li
                              className={`page-item ${
                                currentPage3 === n ? "active" : ""
                              }`}
                              key={i}
                            >
                              <a
                                href="#"
                                className="page-link"
                                onClick={() => changeCPage3(n)}
                              >
                                {n}
                              </a>
                            </li>
                          ))}
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={nextPage3}
                            >
                              หน้าถัดไป
                            </a>
                          </li>
                        </ul>
                      </nav>
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
                    <button
                      className="btn btn-secondary right-button"
                      onClick={() => {
                        handleCloseModal();
                        // handleDeleteProductLotALL();
                      }}
                    >
                      กลับ
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
