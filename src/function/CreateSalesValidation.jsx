function Validation(values) {
  let errors = {};

  if (values.sex === "") {
    errors.sex = "กรุณากรอกเพศ!";
  } else {
    errors.sex = "";
  }
  if (values.fullname === "") {
    errors.fullname = "กรุณากรอกชื่อและนามสกุล!";
  } else {
    errors.fullname = "";
  }

  if (values.email === "") {
    errors.email = "กรุณากรอกอีเมล!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "กรอกอีเมลให้ถูกต้อง!";
  } else {
    errors.email = "";
  }
  

  if (values.password === "") {
    errors.password = "กรุณากรอกรหัสผ่าน!";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(values.password)) {
    errors.password = "กรอกตัวพิมใหญ่และเล็กและตัวเลขอย่างน้อย 8 ตัว";
  } else {
    errors.password = "";
  }
  
  if (values.IDcard === "") {
    errors.IDcard = "กรุณากรอกเลขบัตรประชาชน!";
  } else {
    errors.IDcard = "";
  }
  if (values.AddressSale === "") {
    errors.AddressSale = "กรุณากรอกที่อยู่เพิ่มเติม!";
  } else {
    errors.AddressSale = "";
  }
  if (values.Tel === "") {
    errors.Tel = "กรุณากรอกเบอร์โทรศัพท์!";
  } else {
    errors.Tel = "";
  }
  if (values.Persistent_status === "") {
    errors.Persistent_status = "กรุณากรอกสถานะ!";
  } else {
    errors.Persistent_status = "";
  }
  if (values.picture === "") {
    errors.picture = "กรุณาเลือกที่อยู่ภาพ!";
  } else {
    errors.picture = "";
  }
  if (values.contact === "") {
    errors.contact = "กรุณากรอกช่องทางติดต่อ!";
  } else {
    errors.contact = "";
  }
  if (values.zip_code === "") {
    errors.zip_code = "กรอกจังหวัดอำเภอและตำบล!";
  } else {
    errors.zip_code = "";
  }

  //*
  // if (values.contact === "") {
  //   errors.contact = "กรุณากรอกจังหวัด!";
  // } else {
  //   errors.contact = "";
  // }
  // if (values.contact === "") {
  //   errors.contact = "กรุณากรอกอำเภอ!";
  // } else {
  //   errors.contact = "";
  // }
  // if (values.contact === "") {
  //   errors.contact = "กรุณากรอกตำบล!";
  // } else {
  //   errors.contact = "";
  // }

  return errors;
}

export default Validation;
