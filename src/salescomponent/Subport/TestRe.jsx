import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function TestRe() {
    const [imgs,setImgs] = useState()
    // const hanch = (e) => {
    //     const data = new FileReader();
    //     data.addEventListener('load', () => {
    //         // แปลง base64 เป็น UUID
    //         const base64Image = data.result;
    //         const imageUUID = uuidv4();
    
    //         // บันทึกรูปภาพลงในโฟลเดอร์ imgsupload ด้วย UUID
    //         const imgBlob = new Blob([base64Image], { type: 'image/jpeg' });
    //         const imgFile = new File([imgBlob], `${imageUUID}.jpg`, { type: 'image/jpeg' });
    
    //         // ทำสิ่งอื่น ๆ กับข้อมูลรูปภาพหรือ UUID ตามที่คุณต้องการ
    //         console.log('base64Image', base64Image);
    //         console.log('imageUUID', imageUUID);
    
    //         setImgs(data.result);
    
    //         // ส่งรูปภาพไปยังเซิร์ฟเวอร์หรือบันทึกลงในฐานข้อมูล
    //         // คุณสามารถใช้ XMLHttpRequest หรือ fetch สำหรับนิยามนี้
    //         const formData = new FormData();
    //         formData.append('image', imgFile);
            
    //         // ส่ง formData ไปยังเซิร์ฟเวอร์ด้วย XMLHttpRequest หรือ fetch
    //         // ตรวจสอบความสามารถของรูปภาพอย่างครอบคลุม เช่น การตรวจสอบชนิดไฟล์และขนาดไฟล์
    //     });
    //     data.readAsDataURL(e.target.files[0]);
    // }
    // console.log("imgs",imgs)

    const hanch = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
          // แปลง base64 เป็น UUID
          const base64Image = data.result;
          const imageUUID = uuidv4();
          
          // บันทึกรูปภาพลงในโฟลเดอร์ imgsupload ด้วย UUID
          const imgBlob = new Blob([base64Image], { type: 'image/jpeg' });
          const imgFile = new File([imgBlob], `${imageUUID}.jpg`, { type: 'image/jpeg' });
      
          // บันทึกรูปภาพลงในโฟลเดอร์โดยใช้ URL.createObjectURL
          const imageURL = URL.createObjectURL(imgBlob);
          setImgs(base64Image)
      
          // ทำสิ่งอื่น ๆ กับข้อมูลรูปภาพหรือ UUID ตามที่คุณต้องการ
          console.log('base64Image', base64Image);
          console.log('imageUUID', imageUUID);
          
          // imageURL จะเป็น URL ของรูปภาพที่คุณสามารถแสดงใน HTML หรือบันทึกไปยังฐานข้อมูล
          console.log('imageURL', imageURL);
        });
        data.readAsDataURL(e.target.files[0]);
      }
    
  return (
    <div>
        <input type="file" onChange={hanch} />
        <img src={imgs} alt="" />
    </div>
  )
}

export default TestRe


// const dataIm = new FileReader();
//         dataIm.addEventListener("load", () => {
//           // แปลง base64 เป็น UUID
//           const base64Image = data.result;
//           const imageUUID = uuidv4();

//           // ตั้งค่าค่า picture ใน values ให้เท่ากับ base64Image
//           setValues({ ...values, picture: base64Image });

//           // บันทึกรูปภาพลงในโฟลเดอร์ imgsupload ด้วย UUID
//           const imgBlob = new Blob([base64Image], { type: "image/jpeg" });
//           const imgFile = new File([imgBlob], `${imageUUID}.jpg`, {
//             type: "image/jpeg",
//           });

//           // ทำสิ่งอื่น ๆ กับข้อมูลรูปภาพหรือ UUID ตามที่คุณต้องการ
//           console.log("base64Image", base64Image);
//           console.log("imageUUID", imageUUID);

//           setImgs(data.result);

//           // ส่งรูปภาพไปยังเซิร์ฟเวอร์หรือบันทึกลงในฐานข้อมูล
//           // คุณสามารถใช้ XMLHttpRequest หรือ fetch สำหรับนิยามนี้
//           const formData = new FormData();
//           formData.append("image", imgFile);

//           // ส่ง formData ไปยังเซิร์ฟเวอร์ด้วย XMLHttpRequest หรือ fetch
//           // ตรวจสอบความสามารถของรูปภาพอย่างครอบคลุม เช่น การตรวจสอบชนิดไฟล์และขนาดไฟล์
//         });
//         data.readAsDataURL(event.target.files[0]);
