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
import Updatesales from "./salescomponent/Updatesales";
import ProductLOT from "./salescomponent/ProductLOT";
import EditMe from "./admin/EditMe";
import Product from "./salescomponent/Product";
import AddProduct from "./salescomponent/AddProduct";
import UpdateProduct from "./salescomponent/UpdateProduct";
import ReadProduct from "./salescomponent/ReadProduct";

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
            path="/EditAboutSale/:ID_sales"
            element={<EditAboutSale />}
          ></Route>
          <Route path="/Updatesales" element={<Updatesales />}></Route>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>
          <Route path="/ReadProduct/:id" element={<ReadProduct />}></Route>
          <Route path="/ProductLOT" element={<ProductLOT />}></Route>
          <Route path="/EditMe/:id" element={<EditMe />}></Route>
          <Route path="/Product" element={<Product/>}></Route>
          <Route path="/AddProduct" element={<AddProduct/>}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Salesperson /> */}
    </div>
  );
}
export default App;
