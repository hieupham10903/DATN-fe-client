import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const VnpayPaymentPage = () => {
  const [form] = Form.useForm();
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (values) => {
    const { amount } = values;

    if (!amount || amount <= 0) {
      message.warning("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8888/api/payment/create-vnpay-url?amount=${amount}`
      );
      setQrUrl(response.data);
      message.success("Tạo liên kết thanh toán thành công!");
    } catch (error) {
      message.error("Không thể tạo liên kết thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={<Title level={4}>Thanh toán giả lập qua VNPAY</Title>}
      style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}
    >
      <Form form={form} layout="vertical" onFinish={handlePayment}>
        <Form.Item
          label="Số tiền (VNĐ)"
          name="amount"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1000}
            step={1000}
            placeholder="Ví dụ: 100000"
          />
        </Form.Item>

        <Form.Item label="Ngân hàng" name="bank" initialValue="NCB">
          <Select>
            <Option value="NCB">NCB</Option>
            <Option value="Vietcombank">Vietcombank (demo)</Option>
            <Option value="BIDV">BIDV (demo)</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Số thẻ"
          name="cardNumber"
          initialValue="9704198526191432198"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên chủ thẻ"
          name="cardName"
          initialValue="NGUYEN VAN A"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày phát hành (MM/YY)"
          name="cardDate"
          initialValue="07/15"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mã OTP" name="otp" initialValue="123456">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Tạo mã thanh toán
          </Button>
        </Form.Item>
      </Form>

      {qrUrl && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Title level={5}>Quét mã QR bằng App ngân hàng (sandbox)</Title>
          <QRCodeCanvas value={qrUrl} size={200} />
          <div style={{ marginTop: 20 }}>
            <Button
              type="link"
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hoặc bấm vào đây để thanh toán
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VnpayPaymentPage;
