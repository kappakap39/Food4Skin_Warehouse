import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import fonts from "./font/THSarabun.ttf";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

// Register font
Font.register({
  family: "fontTH",
  src: fonts,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "fontTH",
    height: "100%",
    width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
  },
  HBill: {
    marginTop: "30px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    marginBottom: "20px",
    backgroundColor: "#86d04d",
  },
  DateN: {
    position: "absolute",
    left: "77%",
    top: "98%",
    fontSize: "14px",
  },
  marginT: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#78e296",
  },
  sumtotal: {
    position: "relative",
    width: "185.65px",
    left: "66.55%",
    fontSize: "16px",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#000",
    padding: 10,
  },
});

function formatDateY(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const yearBC = date.getFullYear();

  return yearBC.toString();
}

function formatDateToThai(dateString) {
  if (!dateString) {
    return "";
  }

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const date = new Date(dateString);

  const day = date.getDate() + 1;
  const month = date.getMonth();
  const year = date.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.
  const thaiDate = `${day} ${months[month]} ${year}`;

  //   const thaiDate = date.toLocaleDateString("th-TH", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });

  return thaiDate;
}
const ExportPDF = ({ values, records }) => {
  console.log("records", records);

  const totalAmount = records.reduce(
    (total, record) => total + record.Amount_products,
    0
  );
  const currentDate = new Date().toISOString().split("T")[0];
  const thaiCurrentDate = formatDateToThai(currentDate);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              marginTop: "15px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <Text>ฟู้ดฟอร์สกิน ไทยแลนด์</Text>
          </View>
          <Text
            style={{
              fontSize: "16px",
            }}
          >
            {`รหัสบิล : ${formatDateY(values.Dete_requisition)}-${values.Bill}`}
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
          >{`จังหวัด: ${values.province}
              อำเภอ : ${values.districts}
              ตำบล : ${values.subdistricts}
              รหัสไปรษณีย์ : ${values.zip_code}
              เบอร์โทร : ${values.Tel}
              ที่อยู่เพิ่มเติม : ${values.Address}`}</Text>

          <Text style={styles.HBill}>รายการบิล</Text>

          <Table>
            <TableHeader>
              <TableCell style={styles.marginT}>รหัสล็อต</TableCell>
              <TableCell style={styles.marginT}>ชื่อสินค้า</TableCell>
              <TableCell style={styles.marginT}>จำนวน (ชิ้น)</TableCell>
            </TableHeader>
            <TableBody data={records}>
              <DataTableCell
                style={{
                  padding: "10px",
                  fontSize: "16px",
                }}
                getContent={(record) =>
                  `${formatDateY(record.date_import)}-${record.Lot_ID}`
                }
              />
              <DataTableCell
                style={{
                  borderColor: "#000",
                  padding: "10px",
                  fontSize: "16px",
                }}
                getContent={(record) => record.Name_product}
              />
              <DataTableCell
                style={{
                  padding: "10px",
                  fontSize: "16px",
                }}
                getContent={(record) => record.Amount_products}
              />
            </TableBody>
          </Table>
          <Text style={styles.sumtotal}>ยอดรวมสุทธิ : {totalAmount} ชิ้น</Text>

          <Text style={styles.DateN}>วันที่ดาวน์โหลด : {thaiCurrentDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ExportPDF;
