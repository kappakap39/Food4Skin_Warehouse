import React, { useContext, createContext } from 'react';

// สร้าง context
const UserContext = createContext();

// สร้าง context provider
export function UserProvider({ children }) {
  // ใส่โค้ดที่กำหนดค่า context ตรงนี้
  // เช่น const user = { email: 'example@example.com' };
  const user = {
    email: 'example@example.com', // ตัวอย่างเท่านั้น คุณควรแทนที่ด้วยข้อมูลของผู้ใช้จริง
    // สามารถเพิ่มข้อมูลอื่น ๆ ที่เกี่ยวข้องกับผู้ใช้ได้ตามความต้องการ
  }; // ต้องเติมโค้ดที่กำหนดค่า user ที่คุณใช้
  
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

// สร้าง custom hook เพื่อเรียกใช้ค่า context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

