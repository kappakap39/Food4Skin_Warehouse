import React, { useState } from "react";
import Expire from "./Expire";
import Exportproduct from "./Exportproduct";
import LotImport from "./LotImport";
import LotProduct from "./LotProduct";
import ProductTotal from "./ProductTotal";
import MenuNavSales from "../MenuNavSales";
import "../../css/Report.css";

function Menutab() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="all-page">
      <header className="headernav">
        <MenuNavSales />
      </header>

      <main className="main-stable">
        <div className="tabsgrubs">
          <ul>
            <li>
              <button
                onClick={() => handleTabChange(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                รายงานสินค้าหมดอายุ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                รายงานรายการรับเข้า
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                รายงานรายการเบิก
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(4)}
                className={activeTab === 4 ? "active" : ""}
              >
                รายงานล็อตคงเหลือ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange(5)}
                className={activeTab === 5 ? "active" : ""}
              >
                รายงานสินค้าคงเหลือ
              </button>
            </li>
          </ul>
          <hr className="hrReport" />

          {/* นำคอมโพเนนต์ไปใช้งาน */}
          {activeTab === 1 ? (
            <Expire />
          ) : activeTab === 2 ? (
            <LotImport />
          ) : activeTab === 3 ? (
            <Exportproduct />
          ) : activeTab === 4 ? (
            <LotProduct />
          ) : (
            
            <ProductTotal />
          )}
        </div>
      </main>
    </div>
  );
}

export default Menutab;
