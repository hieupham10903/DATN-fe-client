import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).addVirtualFileSystem(pdfFonts);

export function generateInvoicePDF() {
  const docDefinition = {
    content: [
      { text: "HOÁ ĐƠN", style: "header", alignment: "center" },
      { text: "Ngày lập: 20/07/2030\n\n", style: "subheader" },
      {
        columns: [
          [
            { text: "Hóa đơn cho:", bold: true },
            "Trần Hưng",
            "123 Đường ABC, Thành phố DEF",
          ],
          [
            { text: "Thanh toán cho:", bold: true },
            "An Nam",
            "xinchao@trangwebhay.vn",
            "trangwebhay.vn",
          ],
        ],
      },
      "\n",
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          body: [
            ["Mô tả", "Số lượng", "Đơn giá", "Thành tiền"],
            ...Array(7).fill([
              "Mô tả mục hoặc dịch vụ ở đây",
              "5",
              "2 triệu VNĐ",
              "10 triệu VNĐ",
            ]),
          ],
        },
        layout: "lightHorizontalLines",
      },
      { text: "Tổng cộng: 70 triệu VNĐ", style: "totals", alignment: "right" },
      { text: "\n\nAn Nam – Chữa lành bắt đầu từ đây.", style: "footer" },
    ],
    styles: {
      header: { fontSize: 26, bold: true, color: "#006666" },
      subheader: { fontSize: 12, color: "#000000" },
      totals: { fontSize: 14, bold: true, color: "#006666" },
      footer: { fontSize: 10, color: "#006666" },
    },
    defaultStyle: { font: "Roboto" },
  };

  pdfMake.createPdf(docDefinition).download("hoa_don.pdf");
}
