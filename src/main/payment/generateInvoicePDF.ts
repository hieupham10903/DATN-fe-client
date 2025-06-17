import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).addVirtualFileSystem(pdfFonts);

export function generateInvoicePDF(
  orderItems: {
    productName: string;
    quantity: number;
    price: number;
  }[],
  info: {
    userName: string;
    paymentDate: Date;
    orderId: string;
    paymentId: string;
    paymentMethod: string;
  },
  isPrint: boolean = false
) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) return;

  const { userName, paymentDate, orderId, paymentId, paymentMethod } = info;

  const body = [
    [
      { text: "Tên sản phẩm", bold: true },
      { text: "Số lượng", bold: true, alignment: "center" },
      { text: "Đơn giá", bold: true, alignment: "right" },
      { text: "Thành tiền", bold: true, alignment: "right" },
    ],
    ...orderItems.map((item) => [
      item.productName,
      { text: item.quantity.toString(), alignment: "center" },
      { text: formatCurrency(item.price), alignment: "right" },
      { text: formatCurrency(item.price * item.quantity), alignment: "right" },
    ]),
  ];

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const docDefinition = {
    content: [
      {
        text: "HOÁ ĐƠN THANH TOÁN",
        style: "header",
        alignment: "center",
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              { text: "Hóa đơn cho", style: "label" },
              { text: `• Người mua: ${userName}`, style: "info" },
              { text: `• Mã đơn hàng: ${orderId}`, style: "info" },
              { text: `• Mã giao dịch: ${paymentId}`, style: "info" },
              { text: `• Phương thức: ${paymentMethod}`, style: "info" },
            ],
          },
          {
            width: "50%",
            stack: [
              { text: "Thanh toán cho", style: "label" },
              { text: "• Công Ty TNHH General AK", style: "info" },
              { text: "• Email: akhandmade.info@gmail.com", style: "info" },
              { text: "• Website: handmadeak.com", style: "info" },
              { text: `• Ngày lập: ${formatDate(paymentDate)}`, style: "info" },
            ],
          },
        ],
        columnGap: 30,
        margin: [0, 0, 0, 20],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          body: body,
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },
      {
        text: `Tổng cộng: ${formatCurrency(total)}`,
        style: "totalText",
        alignment: "right",
        margin: [0, 10, 0, 30],
      },
      {
        text: "Cảm ơn bạn đã mua hàng tại General AK!",
        alignment: "center",
        style: "footer",
      },
    ],
    styles: {
      header: { fontSize: 22, bold: true, color: "#006666" },
      label: { fontSize: 12, bold: true, margin: [0, 0, 0, 6], color: "#333" },
      info: { fontSize: 11, margin: [0, 0, 0, 2], color: "#444" },
      totalText: { fontSize: 14, bold: true, color: "#006666" },
      footer: { fontSize: 10, italics: true, color: "#666666" },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  if (isPrint) {
    pdfMake.createPdf(docDefinition).print();
  } else {
    pdfMake.createPdf(docDefinition).download("hoa_don.pdf");
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("vi-VN");
}
