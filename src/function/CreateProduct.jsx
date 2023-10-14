function Validation(values) {
    let errors = {};
  
    if (values.Name_product === "") {
      errors.Name_product = "กรุณาชื่อสินค้า!";
    } else {
      errors.Name_product = "";
    }

    if (values.Production_point === "") {
        errors.Production_point = "กรุณากรอกจุดต่ำกว่าจุดสั่งผลิต!";
      } else if (values.Production_point <= 0) {
        errors.Production_point = "กรุณากรอกมากกว่าหรือเท่ากับ 1!";
      } else {
        errors.Production_point = "";
      }

    if (values.Retail_price === "") {
        errors.Retail_price = "กรุณากรอกราคาปลีก!";
      } else if (values.Retail_price <= 0) {
        errors.Retail_price = "กรุณากรอกมากกว่าหรือเท่ากับ 1!";
      } else {
        errors.Retail_price = "";
      }
    if (values.Level_1_price === "") {
        errors.Level_1_price = "กรุณากรอกราคาขั้น1!";
      } else if (values.Level_1_price <= 0) {
        errors.Level_1_price = "กรุณากรอกมากกว่าหรือเท่ากับ 1!";
      } else {
        errors.Level_1_price = "";
      }
    if (values.Level_2_price === "") {
        errors.Level_2_price = "กรุณากรอกราคาขั้น2!";
      } else if (values.Level_2_price <= 0) {
        errors.Level_2_price = "กรุณากรอกมากกว่าหรือเท่ากับ 1!";
      } else {
        errors.Level_2_price = "";
      }
    if (values.Level_3_price === "") {
        errors.Level_3_price = "กรุณากรอกราคาขั้น3!";
      } else if (values.Level_3_price <= 0) {
        errors.Level_3_price = "กรุณากรอกมากกว่าหรือเท่ากับ 1!";
      } else {
        errors.Level_3_price = "";
      }
      
  
    return errors;
  }
  
  export default Validation;