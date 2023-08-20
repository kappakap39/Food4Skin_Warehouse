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
import Modal from "../admin/Modal";


function Updatesales() {

    //ค้นหา
    const [filterVal, setfilterVal] = useState("");
    const [searchData, setSearchData] = useState([]);
  
    const [selectedStatus, setSelectedStatus] = useState("สถานะการทำงาน");
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios
        .get("http://localhost:2001/showall")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    // ในฟังก์ชัน handleFilter
    const handleFilter = (e) => {
      const searchTerm = e.target.value.toLowerCase();
    
      if (searchTerm === "" && selectedStatus === "สถานะการทำงาน") {
        fetchData();
        return;
      }
    
      const filterResult = data.filter((sales) => {
        const statusMatch =
          selectedStatus === "สถานะการทำงาน" ||
          sales.Persistent_status.toLowerCase().includes(
            selectedStatus.toLowerCase()
          );
    
        const searchTextMatch =
          (sales.ID_sales &&
            typeof sales.ID_sales === 'string' &&
            sales.ID_sales.toLowerCase().includes(searchTerm)) ||
          sales.fullname.toLowerCase().includes(searchTerm) ||
          sales.email.toLowerCase().includes(searchTerm) ||
          sales.sex.toLowerCase().includes(searchTerm) ||
          sales.IDcard.toLowerCase().includes(searchTerm) ||
          sales.province.toLowerCase().includes(searchTerm) ||
          sales.districts.toLowerCase().includes(searchTerm) ||
          sales.subdistricts.toLowerCase().includes(searchTerm) ||
          sales.zip_code.toLowerCase().includes(searchTerm) ||
          sales.contact.toLowerCase().includes(searchTerm) ||
          sales.Tel.toLowerCase().includes(searchTerm);
    
        return statusMatch && searchTextMatch;
      });
    
      setData(filterResult);
      setfilterVal(searchTerm);  // <-- ใช้ setfilterVal แทนที่ setFilterVal
    };
    
  
    const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
    };

    
  return (
    <div>
        
    </div>
  )
}

export default Updatesales