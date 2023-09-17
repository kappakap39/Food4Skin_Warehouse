import React, { useEffect } from "react";
import "../../css/Addsales.css";

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
import MenuNavSales from "../MenuNavSales";
import { useParams } from "react-router-dom";

function WithdrawList() {
    const { id } = useParams();
  const navigate = useNavigate();

  console.log("ID_Product", id);
  return (
    <div>WithdrawList</div>
  )
}

export default WithdrawList