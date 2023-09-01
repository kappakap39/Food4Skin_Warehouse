// function ValidationAddAgent(values) {
//     let errors = {};
  
//     if (values.sex === "") {
//       errors.sex = "กรุณากรอกเพศ!";
//     } else {
//       errors.sex = "";
//     }
//     if (values.fullname === "") {
//       errors.fullname = "กรุณากรอกชื่อและนามสกุล!";
//     } else {
//       errors.fullname = "";
//     }
  
//     if (values.email === "") {
//       errors.email = "กรุณากรอกอีเมล!";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
//       errors.email = "กรอกอีเมลให้ถูกต้อง!";
//     } else {
//       errors.email = "";
//     }
    
  
//     if (values.password === "") {
//       errors.password = "กรุณากรอกรหัสผ่าน!";
//     } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(values.password)) {
//       errors.password = "กรอกตัวพิมใหญ่และเล็กและตัวเลขอย่างน้อย 8 ตัว";
//     } else {
//       errors.password = "";
//     }
    
//     if (values.password2 === "") {
//       errors.password2 = "กรุณากรอกรหัสผ่านยืนยัน!";
//     } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(values.password2)) {
//       errors.password2 = "กรอกตัวพิมใหญ่และเล็กและตัวเลขอย่างน้อย 8 ตัว";
//     } else if (values.password2 !== values.password) {
//       errors.password2 = "รหัสผ่านยืนยันไม่ตรงกับรหัสผ่าน!";
//     } else {
//       errors.password2 = "";
//     }
    
  
    
//     if (values.AddressSale === "") {
//       errors.AddressSale = "กรุณากรอกที่อยู่เพิ่มเติม!";
//     } else {
//       errors.AddressSale = "";
//     }
  
  
      
//     if (values.IDcard === "") {
//       errors.IDcard = "กรุณากรอกเลขบัตรประชาชน!";
//     } else if (values.IDcard.length !== 13) {
//       errors.IDcard = "เลขบัตรประชาชนต้องมีจำนวนตัวอักษร 13 ตัว!";
//     } else {
//       errors.IDcard = "";
//     }
    
  
  
  
//   if (values.Tel === "") {
//     errors.Tel = "กรุณากรอกเบอร์โทรศัพท์!";
//   } else if (!/^\d{9,10}$/.test(values.Tel)) {
//     errors.Tel = "เบอร์โทรศัพท์ต้องมีตัวเลขอย่างน้อย 9 หรือ 10 ตัว!";
//   } else {
//     errors.Tel = "";
//   }
  
  
//   if (values.picture === "") {
//     errors.picture = "กรุณาเลือกที่อยู่ภาพ!";
//   } else if (!/\.(jpg|jpeg|png|gif)$/i.test(values.picture)) {
//     errors.picture = "กรุณาอัปโหลดไฟล์ภาพที่มีนามสกุลเป็น .jpg, .jpeg, .png หรือ .gif เท่านั้น!";
//   } else {
//     errors.picture = "";
//   }
  
  
  
//     if (values.Persistent_status === "") {
//       errors.Persistent_status = "กรุณากรอกสถานะ!";
//     } else {
//       errors.Persistent_status = "";
//     }
//     if (values.contact === "") {
//       errors.contact = "กรุณากรอกช่องทางติดต่อ!";
//     } else {
//       errors.contact = "";
//     }
//     if (values.zip_code === "") {
//       errors.zip_code = "กรอกจังหวัดอำเภอและตำบล!";
//     } else {
//       errors.zip_code = "";
//     }
//     if (values.subdistricts === "") {
//       errors.subdistricts = "กรอกตำบล!";
//     } else {
//       errors.subdistricts = "";
//     }
//     if (values.districts === "") {
//       errors.districts = "กรอกอำเภอ!";
//     } else {
//       errors.districts = "";
//     }
//     if (values.province === "") {
//       errors.province = "กรอกจังหวัด!";
//     } else {
//       errors.province = "";
//     }
  
  
//     return errors;
//   }
  
//   export default ValidationAddAgent;