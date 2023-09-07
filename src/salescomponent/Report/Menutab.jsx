import React, { useState } from "react";
import Expire from "./Expire";
import Exportproduct from "./Exportproduct";
import LotImport from "./LotImport";
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
          </ul>
          <hr className="hrReport" />

          {/* นำคอมโพเนนต์ไปใช้งาน */}
          {activeTab === 1 ? (
            <Expire />
          ) : activeTab === 2 ? (
            <LotImport />
          ) : (
            <Exportproduct />
          )}
        </div>
      </main>
    </div>
  );
}

export default Menutab;
