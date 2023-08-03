import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../css/EditSales.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Figure from "react-bootstrap/Figure";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";

import { useParams } from "react-router-dom";
import Modal from "./Modal";

  //!update
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2001/getupdateSale/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          Persistent_status: res.data[0].Persistent_status,
          fullname: res.data[0].fullname,
          districts: res.data[0].districts,
          mail: res.data[0].mail,
          password: res.data[0].password,
          sex: res.data[0].sex,
          IDcard: res.data[0].IDcard,
          province: res.data[0].province,
          amphures: res.data[0].amphures,
          Address: res.data[0].Address,
          Tel: res.data[0].Tel,
          contact: res.data[0].contact,
          picture: res.data[0].picture,
          zipcode: res.data[0].zipcode,
          ID_sales: res.data[0].ID_sales,

        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    Persistent_status: "",
    fullname: "",
    districts: "",
    mail: "",
    password: "",
    sex: "",
    IDcard: "",
    province: "",
    amphures: "",
    Address: "",
    Tel: "",
    contact: "",
    picture: "",
    zipcode: "",
    ID_sales: ""
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:2001/saleUpdate/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/Salesperson");
      })
      .catch((err) => console.log(err));
  };

function Updatesales() {
  return (
    <div>
        <form action="" onSubmit={handleUpdate}>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={values.fullname}
          onChange={(e) => setValues({ ...values, fullname: e.target.value })}
        />
        <input
          type="text"
          aria-label="เพศ"
          name="sex"
          id="sex"
          value={values.sex}
          onChange={(e) => setValues({ ...values, sex: e.target.value })}
        />
        <input
          type="text"
          aria-label="Persistent_status"
          name="Persistent_status"
          id="Persistent_status"
          value={values.Persistent_status}
          onChange={(e) =>
            setValues({ ...values, Persistent_status: e.target.value })
          }
        />
        <input
          type="text"
          aria-label="districts"
          name="districts"
          id="districts"
          value={values.districts}
          onChange={(e) => setValues({ ...values, districts: e.target.value })}
        />
        <input
          type="text"
          aria-label="mail"
          name="mail"
          id="mail"
          value={values.mail}
          onChange={(e) => setValues({ ...values, mail: e.target.value })}
        />
        <input
          type="text"
          aria-label="password"
          name="password"
          id="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <input
          type="text"
          aria-label="IDcard"
          name="IDcard"
          id="IDcard"
          value={values.IDcard}
          onChange={(e) => setValues({ ...values, IDcard: e.target.value })}
        />
        <input
          type="text"
          aria-label="province"
          name="province"
          id="province"
          value={values.province}
          onChange={(e) => setValues({ ...values, province: e.target.value })}
        />
        <input
          type="text"
          aria-label="amphures"
          name="amphures"
          id="amphures"
          value={values.amphures}
          onChange={(e) => setValues({ ...values, amphures: e.target.value })}
        />
        <input
          type="text"
          aria-label="Address"
          name="Address"
          id="Address"
          value={values.Address}
          onChange={(e) => setValues({ ...values, Address: e.target.value })}
        />
        <input
          type="text"
          aria-label="Tel"
          name="Tel"
          id="Tel"
          value={values.Tel}
          onChange={(e) => setValues({ ...values, Tel: e.target.value })}
        />
        <input
          type="text"
          aria-label="contact"
          name="contact"
          id="contact"
          value={values.contact}
          onChange={(e) => setValues({ ...values, contact: e.target.value })}
        />
        <input
          type="text"
          aria-label="picture"
          name="picture"
          id="picture"
          value={values.picture}
          onChange={(e) => setValues({ ...values, picture: e.target.value })}
        />
        <input
          type="text"
          aria-label="zipcode"
          name="zipcode"
          id="zipcode"
          value={values.zipcode}
          onChange={(e) => setValues({ ...values, zipcode: e.target.value })}
        />
        <button>sub</button>
        <Link to="/Salesperson" className="back btn btn-danger">
          {" "}
          กลับ{" "}
        </Link>
        </form>
    </div>
  )
}

export default Updatesales