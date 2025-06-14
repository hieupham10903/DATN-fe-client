"use client";

import {
  BankOutlined,
  CopyOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import PaymentHook from "./index.ts";

const { Title, Text } = Typography;
const { Option } = Select;

const VnpayPaymentPage = () => {
  const {
    CreatePayment,
    updateSuccess,
    urlVnPay,
    userInfo,
    GetDetailOrder,
    order,
  } = PaymentHook();
  const [loading, setLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    note: "",
  });
  const [form] = Form.useForm();
  const [paymentInfo, setPaymentInfo] = useState({
    orderId: userInfo?.orderId,
    amount: order?.totalAmount,
    description: `Thanh toán đơn hàng #${userInfo?.orderId}`,
    customerName: userInfo?.name,
  });

  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Xử lý tạo thanh toán
  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      await CreatePayment({
        orderId: userInfo.orderId,
        address: form.getFieldValue("address"),
      });
      setPaymentInitiated(true);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý mở URL VNPay
  const handleOpenVnPayUrl = () => {
    if (urlVnPay) {
      // Mở URL trong tab mới
      window.open(urlVnPay, "_blank", "noopener,noreferrer");
    } else {
      alert("Chưa có URL thanh toán!");
    }
  };

  // Theo dõi khi có urlVnPay
  useEffect(() => {
    console.log("urlVnPay", urlVnPay);
    if (urlVnPay && paymentInitiated) {
      // Tự động mở URL sau khi tạo thành công
      handleOpenVnPayUrl();
    }
  }, [urlVnPay, paymentInitiated]);

  useEffect(() => {
    form.setFieldValue("name", userInfo.name);
    GetDetailOrder(userInfo.orderId);
    setPaymentInfo({
      orderId: userInfo?.orderId,
      amount: order?.totalAmount,
      description: `Thanh toán đơn hàng #${userInfo?.orderId}`,
      customerName: userInfo?.name,
    });
  }, [userInfo]);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <Card style={{ marginBottom: "24px", textAlign: "center" }}>
          <Space direction="vertical" size="small">
            <BankOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
            <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
              Thanh toán VNPay
            </Title>
            <Text type="secondary">
              Tạo liên kết thanh toán an toàn và nhanh chóng
            </Text>
          </Space>
        </Card>

        {/* Payment Info */}
        <Card title="Thông tin đơn hàng" style={{ marginBottom: "24px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Mã đơn hàng:</Text>
                <br />
                <Text style={{ fontSize: "16px", color: "#1890ff" }}>
                  {paymentInfo.orderId}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Khách hàng:</Text>
                <br />
                <Text style={{ fontSize: "16px" }}>
                  {paymentInfo.customerName}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Số tiền:</Text>
                <br />
                <Text
                  style={{
                    fontSize: "20px",
                    color: "#52c41a",
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(paymentInfo.amount)}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong>Mô tả:</Text>
                <br />
                <Text>{paymentInfo.description}</Text>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Shipping Address */}
        <Card
          title={
            <Space>
              <EnvironmentOutlined />
              Địa chỉ nhận hàng
            </Space>
          }
          style={{ marginBottom: "24px" }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên người nhận"
                  name={"name"}
                  required
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input
                    placeholder="Nhập họ và tên"
                    value={shippingAddress.name}
                    onChange={(e) =>
                      handleAddressChange("name", e.target.value)
                    }
                    size="large"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Địa chỉ cụ thể"
                  required
                  name={"address"}
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input
                    placeholder="Số nhà, tên đường..."
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleAddressChange("address", e.target.value)
                    }
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Ghi chú (không bắt buộc)" name={"note"}>
                  <Input.TextArea
                    placeholder="Ghi chú thêm cho đơn hàng..."
                    value={shippingAddress.note}
                    onChange={(e) =>
                      handleAddressChange("note", e.target.value)
                    }
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Payment Actions */}
        <Card title="Tạo liên kết thanh toán" style={{ marginBottom: "24px" }}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {!paymentInitiated ? (
              <div style={{ textAlign: "center" }}>
                <CreditCardOutlined
                  style={{
                    fontSize: "48px",
                    color: "#1890ff",
                    marginBottom: "16px",
                  }}
                />
                <br />
                <Text
                  style={{
                    fontSize: "16px",
                    marginBottom: "24px",
                    display: "block",
                  }}
                >
                  Nhấn nút bên dưới để tạo liên kết thanh toán VNPay
                </Text>
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  onClick={handleCreatePayment}
                  icon={<BankOutlined />}
                  style={{ minWidth: "200px" }}
                >
                  {loading ? "Đang tạo..." : "Tạo thanh toán VNPay"}
                </Button>
              </div>
            ) : (
              <div>
                <Alert
                  message="Liên kết thanh toán đã được tạo thành công!"
                  description="Bạn có thể mở liên kết thanh toán hoặc chia sẻ cho khách hàng."
                  type="success"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />

                <div style={{ marginBottom: "16px" }}>
                  <Text strong>URL thanh toán:</Text>
                  <br />
                  <Input
                    value={urlVnPay || "Đang tạo..."}
                    readOnly
                    style={{ marginTop: "8px" }}
                    suffix={
                      urlVnPay && (
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          onClick={() =>
                            navigator.clipboard.writeText(urlVnPay)
                          }
                        >
                          Copy
                        </Button>
                      )
                    }
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Space size="large">
                    <Button
                      size="large"
                      onClick={() => setPaymentInitiated(false)}
                    >
                      Tạo lại
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleOpenVnPayUrl}
                      disabled={!urlVnPay}
                      icon={<BankOutlined />}
                    >
                      Mở trang thanh toán
                    </Button>
                  </Space>
                </div>
              </div>
            )}
          </Space>
        </Card>

        {/* Instructions */}
        <Card title="Hướng dẫn thanh toán">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>Bước 1:</Text> Nhấn "Tạo thanh toán VNPay" để tạo
              liên kết thanh toán
            </div>
            <div>
              <Text strong>Bước 2:</Text> Nhấn "Mở trang thanh toán" để chuyển
              đến VNPay
            </div>
            <div>
              <Text strong>Bước 3:</Text> Thực hiện thanh toán theo hướng dẫn
              trên trang VNPay
            </div>
            <div>
              <Text strong>Bước 4:</Text> Hệ thống sẽ tự động cập nhật trạng
              thái thanh toán
            </div>
          </Space>
        </Card>

        {/* Support Info */}
        <Card style={{ marginTop: "24px" }}>
          <Title level={5}>Cần hỗ trợ?</Title>
          <Text>
            Nếu bạn gặp khó khăn trong quá trình thanh toán, vui lòng liên hệ:
          </Text>
          <br />
          <Text strong>Hotline: 1900 1234</Text>
          <br />
          <Text strong>Email: support@vnpay.vn</Text>
        </Card>
      </div>
    </div>
  );
};

export default VnpayPaymentPage;
