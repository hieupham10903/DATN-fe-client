"use client";

import {
  CheckCircleOutlined,
  DollarOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Steps,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateInvoicePDF } from "./generateInvoicePDF.ts";
import PaymentHook from "./index.ts";

const { Title, Text } = Typography;
const { Step } = Steps;

const CodPaymentPage = () => {
  const {
    CreatePaymentOffine,
    userInfo,
    GetDetailOrder,
    order,
    PaymentSuccess,
    GetListOrderItemsLastest,
  } = PaymentHook();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
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

  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      await CreatePaymentOffine({
        orderId: userInfo.orderId,
        address: form.getFieldValue("address"),
      });
      await PaymentSuccess(userInfo.orderId);
      setOrderConfirmed(true);
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: userInfo.name,
    });
    GetDetailOrder(userInfo.orderId);
  }, [userInfo]);

  const steps = [
    {
      title: "Nhập thông tin",
      description: "Điền địa chỉ giao hàng",
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Hoàn tất",
      description: "Đơn hàng đã được xác nhận",
      icon: <CheckCircleOutlined />,
    },
  ];

  const handlePrint = () => {
    GetListOrderItemsLastest(userInfo.orderId).then((value) => {
      const payload = value.payload as any;
      const orderItems = payload.data;

      const info = {
        userName: userInfo?.name,
        paymentDate: order?.paymentDate,
        orderId: userInfo?.orderId,
        paymentId: order?.paymentId,
        paymentMethod: "Trực tuyến",
      };

      generateInvoicePDF(orderItems, info, true);
    });
  };

  const handleDownload = () => {
    GetListOrderItemsLastest(userInfo.orderId).then((value) => {
      const payload = value.payload as any;
      const orderItems = payload.data;

      const info = {
        userName: userInfo?.name,
        paymentDate: order?.paymentDate,
        orderId: userInfo?.orderId,
        paymentId: order?.paymentId,
        paymentMethod: "Trực tuyến",
      };

      generateInvoicePDF(orderItems, info, false);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <Card style={{ marginBottom: "24px", textAlign: "center" }}>
          <Space direction="vertical" size="small">
            <DollarOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
            <Title level={2} style={{ margin: 0, color: "#52c41a" }}>
              Thanh toán khi nhận hàng (COD)
            </Title>
            <Text type="secondary">
              Thanh toán bằng tiền mặt khi shipper giao hàng tận nơi
            </Text>
          </Space>
        </Card>

        {/* Progress Steps */}
        <Card style={{ marginBottom: "24px" }}>
          <Steps current={currentStep} items={steps} />
        </Card>

        {!orderConfirmed ? (
          <>
            {/* Order Info */}
            <Card title="Thông tin đơn hàng" style={{ marginBottom: "24px" }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: "16px" }}>
                    <Text strong>Mã đơn hàng:</Text>
                    <br />
                    <Text style={{ fontSize: "16px", color: "#1890ff" }}>
                      {userInfo.orderId}
                    </Text>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ marginBottom: "16px" }}>
                    <Text strong>Khách hàng:</Text>
                    <br />
                    <Text style={{ fontSize: "16px" }}>{userInfo.name}</Text>
                  </div>
                </Col>
                <Col xs={24}>
                  <div style={{ marginBottom: "16px" }}>
                    <Text strong>Tổng tiền cần thanh toán:</Text>
                    <br />
                    <Text
                      style={{
                        fontSize: "24px",
                        color: "#52c41a",
                        fontWeight: "bold",
                      }}
                    >
                      {formatCurrency(order?.totalAmount)}
                    </Text>
                    <Tag color="orange" style={{ marginLeft: "12px" }}>
                      Thanh toán khi nhận hàng
                    </Tag>
                  </div>
                </Col>
              </Row>

              <Divider />

              {/* Order Items */}
              <div>
                <Text
                  strong
                  style={{
                    fontSize: "16px",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  Chi tiết sản phẩm:
                </Text>
                {order?.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom:
                        index < order.items.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <div>
                      <Text>{item.name}</Text>
                      <Text type="secondary" style={{ marginLeft: "8px" }}>
                        x{item.quantity}
                      </Text>
                    </div>
                    <Text strong>
                      {formatCurrency(item.price * item.quantity)}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card
              title={
                <Space>
                  <EnvironmentOutlined />
                  Thông tin giao hàng
                </Space>
              }
              style={{ marginBottom: "24px" }}
            >
              <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Họ và tên người nhận"
                      name="name"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                      ]}
                    >
                      <Input
                        placeholder="Nhập họ và tên"
                        size="large"
                        disabled
                        value={userInfo.name}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: /^[0-9]{10,11}$/,
                          message: "Số điện thoại không hợp lệ!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Nhập số điện thoại"
                        prefix={<PhoneOutlined />}
                        size="large"
                        onChange={(e) =>
                          handleAddressChange("phone", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label="Địa chỉ giao hàng"
                      name="address"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ!" },
                      ]}
                    >
                      <Input
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        size="large"
                        onChange={(e) =>
                          handleAddressChange("address", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label="Ghi chú cho shipper (không bắt buộc)"
                      name="note"
                    >
                      <Input.TextArea
                        placeholder="Ví dụ: Gọi trước khi giao, giao vào giờ hành chính..."
                        rows={3}
                        onChange={(e) =>
                          handleAddressChange("note", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* COD Information */}
            <Card
              title={
                <Space>
                  <DollarOutlined />
                  Thông tin thanh toán COD
                </Space>
              }
              style={{ marginBottom: "24px" }}
            >
              <Alert
                message="Lưu ý quan trọng về thanh toán COD"
                description={
                  <div>
                    <p>• Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng</p>
                    <p>
                      • Vui lòng chuẩn bị đủ tiền mặt:{" "}
                      <strong>{formatCurrency(order?.totalAmount)}</strong>
                    </p>
                    <p>• Shipper sẽ liên hệ trước khi giao hàng</p>
                    <p>• Thời gian giao hàng: 1-3 ngày làm việc</p>
                    <p>• Bạn có thể kiểm tra hàng trước khi thanh toán</p>
                  </div>
                }
                type="info"
                showIcon
              />
            </Card>

            {/* Confirm Button */}
            <Card>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  onClick={handleCreatePayment}
                  icon={<CheckCircleOutlined />}
                  style={{
                    minWidth: "200px",
                    height: "50px",
                    fontSize: "16px",
                    background: "linear-gradient(135deg, #73d13d, #52c41a)",
                    border: "none",
                  }}
                >
                  {loading ? "Đang xác nhận..." : "Xác nhận đặt hàng COD"}
                </Button>
              </div>
            </Card>
          </>
        ) : (
          /* Order Confirmed */
          <Card style={{ textAlign: "center", padding: "40px 20px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <CheckCircleOutlined
                style={{ fontSize: "80px", color: "#52c41a" }}
              />

              <div>
                <Title level={2} style={{ color: "#52c41a", margin: 0 }}>
                  Đặt hàng thành công!
                </Title>
                <Text style={{ fontSize: "16px", color: "#666" }}>
                  Đơn hàng COD của bạn đã được xác nhận
                </Text>
              </div>

              <Card
                style={{
                  background: "#f6ffed",
                  border: "1px solid #b7eb8f",
                  textAlign: "left",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text strong>Mã đơn hàng:</Text>
                    <Text>{userInfo.orderId}</Text>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text strong>Tổng tiền:</Text>
                    <Text style={{ color: "#52c41a", fontWeight: "bold" }}>
                      {formatCurrency(order?.totalAmount)}
                    </Text>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text strong>Phương thức:</Text>
                    <Tag color="orange">Thanh toán khi nhận hàng</Tag>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text strong>Trạng thái:</Text>
                    <Tag color="green">Đã xác nhận</Tag>
                  </div>
                </Space>
              </Card>

              <Space size="large">
                <Button
                  size="large"
                  icon={<PrinterOutlined />}
                  onClick={handlePrint}
                >
                  In hóa đơn
                </Button>
                <Button
                  size="large"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                >
                  Tải xuống hóa đơn
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/product-list")}
                >
                  Tiếp tục mua sắm
                </Button>
              </Space>
            </Space>
          </Card>
        )}

        {/* Support Info */}
        <Card style={{ marginTop: "24px" }}>
          <Title level={5}>Cần hỗ trợ?</Title>
          <Text>Nếu bạn có thắc mắc về đơn hàng COD, vui lòng liên hệ:</Text>
          <br />
          <Text strong>Hotline: 1900 1234</Text>
          <br />
          <Text strong>Email: support@company.com</Text>
        </Card>
      </div>
    </div>
  );
};

export default CodPaymentPage;
