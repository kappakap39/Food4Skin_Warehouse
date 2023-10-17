import React, { useEffect } from "react";
import "../css/Addsales.css";

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
import Validation from "../function/CreateProduct";
import FormText from "react-bootstrap/esm/FormText";
import MenuNavSales from "./MenuNavSales";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID_Product", id);
  const userLoginData = JSON.parse(sessionStorage.getItem("userlogin"));

  //!update
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/productOneUP/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          ID_product: res.data[0].ID_product,
          Name_product: res.data[0].Name_product,
          Production_point: res.data[0].Production_point,
          Retail_price: res.data[0].Retail_price,
          Level_1_price: res.data[0].Level_1_price,
          Level_2_price: res.data[0].Level_2_price,
          Level_3_price: res.data[0].Level_3_price,
          ID_sales: res.data[0].ID_sales,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  //!
  // const [selectedImage, setSelectedImage] = useState(null);
  // const file = event.target.files[0]; // Get the first selected file
  // setSelectedImage(file);

  const [values, setValues] = useState({
    ID_product: "",
    Name_product: "",
    Production_point: "",
    Retail_price: "",
    Level_1_price: "",
    Level_2_price: "",
    Level_3_price: "",
    ID_sales: "",
    // ID_sales: `${userLoginData[0].ID_sales}`,
  });
  const [errors, setErrors] = useState({});

  const handleUpdate = (event) => {
    event.preventDefault();
    const err = Validation({ ...values });
    setErrors(err);
    if (
      err.Name_product === "" &&
      err.Production_point === "" &&
      err.Retail_price === "" &&
      err.Level_1_price === "" &&
      err.Level_2_price === "" &&
      err.Level_3_price === ""
    ) {
      axios
        .put("http://localhost:2001/productUpdate/" + id, values)
        .then((res) => {
          console.log(res);
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>ทำรายการแก้ไขข้อมูลสินค้าเสร็จสิ้น</strong>,
            // html: <i>คุณเข้าสู่ระบบในตำแหน่งพนักงานฝ่ายขาย</i>,
            icon: "warning",
          });
          navigate("/Product");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <header className="headernav ">
        <MenuNavSales />
      </header>
      <form form className="containerPRODUCT" onSubmit={handleUpdate}>
        <h3 className="h3">แก้ไขข้อมูลสินค้า</h3>
        <div className="bodyImport">
          <Row>
            <Col>
              <span>ชื่อสินค้า</span>
              <input
                class="form-control"
                name="Name_product"
                type="text"
                value={values.Name_product}
                onChange={(e) =>
                  setValues({ ...values, Name_product: e.target.value })
                }
              />
            </Col>
            {errors.Name_product && (
              <div className="erroredit">
                <Col>
                  <span style={{ paddingBottom: "5%" }} className="text-danger">
                    {errors.Name_product}
                  </span>
                </Col>
              </div>
            )}
          </Row>

          <Row>
            <Col>
              <Row>
                <Col>
                  <span>จุดต่ำกว่าจุดสั่งผลิต</span>
                  <input
                    class="form-control"
                    name="Production_point"
                    type="number"
                    value={values.Production_point}
                    onChange={(e) =>
                      setValues({ ...values, Production_point: e.target.value })
                    }
                  />
                </Col>
                {errors.Production_point && (
                  <div className="erroredit">
                    <Col>
                      <span
                        style={{ paddingTop: "10%" }}
                        className="text-danger"
                      >
                        {errors.Production_point}
                      </span>
                    </Col>
                  </div>
                )}
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <span>ราคาปลีก</span>
                  <input
                    class="form-control"
                    name="Retail_price"
                    type="number"
                    value={values.Retail_price}
                    onChange={(e) =>
                      setValues({ ...values, Retail_price: e.target.value })
                    }
                  />
                </Col>
                {errors.Retail_price && (
                  <div className="erroredit">
                    <Col>
                      <span
                        style={{ paddingTop: "10%" }}
                        className="text-danger"
                      >
                        {errors.Retail_price}
                      </span>
                    </Col>
                  </div>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>ราคาระดับขั้น1</span>
              <input
                class="form-control"
                name="Level_1_price"
                type="number"
                value={values.Level_1_price}
                onChange={(e) =>
                  setValues({ ...values, Level_1_price: e.target.value })
                }
              />
              {errors.Level_1_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_1_price}</span>
                  </Col>
                </div>
              )}
            </Col>
            <Col>
              <span>ราคาระดับขั้น2</span>
              <input
                class="form-control"
                name="Level_2_price"
                type="number"
                value={values.Level_2_price}
                onChange={(e) =>
                  setValues({ ...values, Level_2_price: e.target.value })
                }
              />
              {errors.Level_2_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_2_price}</span>
                  </Col>
                </div>
              )}
            </Col>
            <Col>
              <span>ราคาระดับขั้น3</span>
              <input
                class="form-control"
                name="Level_3_price"
                type="number"
                value={values.Level_3_price}
                onChange={(e) =>
                  setValues({ ...values, Level_3_price: e.target.value })
                }
              />
              {errors.Level_3_price && (
                <div className="erroredit">
                  <Col>
                    <span className="text-danger">{errors.Level_3_price}</span>
                  </Col>
                </div>
              )}
            </Col>
          </Row>

          <div style={{ marginTop: "20px" }} className="spanProduct">
            <Row>
              <Col>
                <Link to="/Product" className="backProduct btn btn-danger">
                  {" "}
                  กลับ{" "}
                </Link>
              </Col>

              <Col>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button className="save btn btn-success">บันทึก</button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
