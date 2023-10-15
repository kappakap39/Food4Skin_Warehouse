import { useState } from "react";
import "./App.css";

import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import Container from "react-bootstrap/Container";
import { Nav, Table } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import MenuNav from "./admin/MenuNav";
import Salesperson from "./admin/Salesperson";
import AddSales from "./admin/AddSales";
import AboutMe from "./admin/AboutMe";
import Login from "./Login";
import EditSales from "./admin/EditSales";
import EditAboutSale from "./salescomponent/EditAboutSale";
import ProductLOT from "./salescomponent/ProductLOT";
import EditMe from "./admin/EditMe";
import Product from "./salescomponent/Product";
import AddProduct from "./salescomponent/AddProduct";
import UpdateProduct from "./salescomponent/UpdateProduct";
import ReadProduct from "./salescomponent/ReadProduct";
import TableAgent from "./salescomponent/TableAgent";
import AboutSale from "./salescomponent/AboutSale";
import AddAgent from "./salescomponent/AddAgent";
import ShowAgent from "./salescomponent/ShowAgent";
import EditAgent from "./salescomponent/EditAgent";
import ImportProduct from "./salescomponent/ImportProduct";
import ReadLOT from "./salescomponent/ReadLOT";
import Expire from "./salescomponent/Report/Expire";
import LotImport from "./salescomponent/Report/LotImport";
import Exportproduct from "./salescomponent/Report/Exportproduct";
import Menutab from "./salescomponent/Report/Menutab";
import Requisition from "./salescomponent/Requisition";
import ReadExport from "./salescomponent/Report/ReadExport";
import TestRe from "./salescomponent/Subport/TestRe";


function App() {
  return (
    <div>
      {/* เป็นเส้นทางติดต่อไปยัง Component อื่นๆ */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/MenuNavbar" element={<MenuNav />}></Route> */}
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Salesperson" element={<Salesperson />}></Route>
          <Route path="/Salesperson/AddSales" element={<AddSales />}></Route>
          <Route path="/AboutMe" element={<AboutMe />}></Route>
          <Route path="/EditSales/:id" element={<EditSales />}></Route>
          <Route
            path="/EditAboutSale/:id"
            element={<EditAboutSale />}
          ></Route>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>
          <Route path="/ReadProduct/:id" element={<ReadProduct />}></Route>
          <Route path="/ReadLOT/:id" element={<ReadLOT />}></Route>
          <Route path="/ReadExport/:id" element={<ReadExport />}></Route>
          <Route path="/ProductLOT" element={<ProductLOT />}></Route>
          <Route path="/EditMe/:id" element={<EditMe />}></Route>
          <Route path="/Product" element={<Product/>}></Route>
          <Route path="/AddProduct" element={<AddProduct/>}></Route>
          <Route path="/TableAgent" element={<TableAgent/>} ></Route>
          <Route path="/AboutSale" element={<AboutSale/>} ></Route>
          <Route path="/TableAgent/AddAgent" element={<AddAgent/>} ></Route>
          <Route path="/ShowAgent/:id" element={<ShowAgent/>} ></Route>
          <Route path="/EditAgent/:id" element={<EditAgent/>} ></Route>
          <Route path="/ImportProduct" element={<ImportProduct/>} ></Route>
          <Route path="/Expire" element={<Expire/>}></Route>
          <Route path="/LotImport" element={<LotImport/>}></Route>
          <Route path="/Exportproduct" element={<Exportproduct/>} ></Route>
          <Route path="/MenutabReport" element={<Menutab/>} ></Route>
          <Route path="/Requisition" element={<Requisition/>} ></Route>
          <Route path="/TestRe" element={<TestRe/>}></Route>

        </Routes>
      </BrowserRouter>

      {/* <Salesperson /> */}
    </div>
  );
}
export default App;
