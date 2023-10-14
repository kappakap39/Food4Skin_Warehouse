function Validation(values) {
  let errors = {};

  if (values.Dete_requisition === "") {
    errors.Dete_requisition = "กรุณากรอกวันที่รับเข้า!";
  } else {
    errors.Dete_requisition = "";
  }

  if (values.Nameproduct === "") {
    errors.Nameproduct = "กรุณาเลือกสินค้า!";
  } else {
    errors.Nameproduct = "";
  }
  if (values.ID_product === "") {
    errors.ID_product = "กรุณาเลือกสินค้า!";
  } else {
    errors.ID_product = "";
  }
  if (values.Amount === "") {
    errors.Amount = "กรุณากรอกจำนวนสินค้า!";
  } else {
    errors.Amount = "";
  }
  if (values.ID_agent === "") {
    errors.ID_agent = "กรุณาเลือกตัวแทนนจำหน่าย!";
  } else {
    errors.ID_agent = "";
  }
  if (values.Lot_ID === "") {
    errors.Lot_ID = "กรุณาเลือกล็อต!";
  } else {
    errors.Lot_ID = "";
  }
  if (values.date_import === "") {
    errors.date_import = "กรุณาเลือกวันที่รับเข้า!";
  } else {
    errors.date_import = "";
  }
  if (values.date_list === "") {
    errors.date_list = "กรุณาเลือกวันที่ผลิต!";
  } else {
    errors.date_list = "";
  }
  if (values.date_list_EXP === "") {
    errors.date_list_EXP = "กรุณาเลือกวันที่หมดอายุ!";
  } else {
    errors.date_list_EXP = "";
  }
  if (values.Quantity === "") {
    errors.Quantity = "กรุณากรอกจำนวนสินค้า!";
  } else if (values.Quantity <= 0) {
    errors.Quantity = "กรุณากรอกจำนวนสินค้ามากกว่าหรือเท่ากับ 1!";
  } else {
    errors.Quantity = "";
  }
  if (values.Inventories_lot === "") {
    errors.Inventories_lot = "กรุณากรอกจำนวนสินค้า!";
  } else if (values.Inventories_lot <= 0) {
    errors.Inventories_lot = "กรุณากรอกจำนวนสินค้ามากกว่าหรือเท่ากับ 1!";
  } else {
    errors.Inventories_lot = "";
  }
  

  if (values.remark === "") {
    errors.remark = "กรุณาใส่หมายเหตุถ้าไม่มีให้ใช่สัญลัก - !";
  } else {
    errors.remark = "";
  }

  return errors;
}

export default Validation;
