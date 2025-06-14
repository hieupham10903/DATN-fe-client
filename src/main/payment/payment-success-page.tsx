"use client";

import {
  CheckCircleOutlined,
  DownloadOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import PaymentHook from "./index.ts";

const { Title, Text } = Typography;

interface PaymentSuccessPageProps {
  transactionInfo?: {
    orderId: string;
    amount: number;
    transactionId: string;
    paymentTime: string;
    customerName: string;
    paymentMethod: string;
  };
}

const PaymentSuccessPage = ({ transactionInfo }: PaymentSuccessPageProps) => {
  const { userInfo, GetDetailOrder, order, PaymentSuccess } = PaymentHook();
  const hasCalled = useRef(false);

  const [paymentInfo, setPaymentInfo] = useState({
    orderId: userInfo?.orderId,
    amount: order?.totalAmount,
    transactionId: "VNP20250614123456",
    paymentTime: new Date().toLocaleString("vi-VN"),
    description: `Thanh toán đơn hàng #${userInfo?.orderId}`,
    customerName: userInfo?.name,
    paymentMethod: "VNPay",
  });
  useEffect(() => {
    const handlePaymentAndFetch = async () => {
      try {
        await GetDetailOrder(userInfo.orderId);
        await PaymentSuccess(userInfo.orderId);
      } catch (error) {
        console.error(
          "Lỗi khi xử lý thanh toán hoặc lấy chi tiết đơn hàng:",
          error
        );
      }
    };

    if (userInfo?.orderId && !hasCalled.current) {
      hasCalled.current = true;
      handlePaymentAndFetch();
    }
  }, [userInfo?.orderId]);

  useEffect(() => {
    setPaymentInfo({
      orderId: userInfo?.orderId,
      amount: order?.totalAmount,
      transactionId: order?.paymentId,
      paymentTime: order?.paymentDate,
      description: `Thanh toán đơn hàng #${userInfo?.orderId}`,
      customerName: userInfo?.name,
      paymentMethod: "VNPay",
    });
  }, [userInfo, order]);

  const transaction = transactionInfo || paymentInfo;

  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Xử lý in hóa đơn
  const handlePrint = () => {
    window.print();
  };

  // Xử lý tải xuống
  const handleDownload = () => {
    // Logic tải xuống hóa đơn PDF
    console.log("Downloading receipt...");
  };

  // Xử lý về trang chủ
  const handleGoHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    // Có thể gửi email xác nhận hoặc cập nhật database ở đây
    console.log("Payment completed successfully:", transaction);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Success Header */}
        <Card style={{ marginBottom: "24px", textAlign: "center" }}>
          <Space direction="vertical" size="large">
            <CheckCircleOutlined
              style={{ fontSize: "72px", color: "#52c41a" }}
            />
            <div>
              <Title level={2} style={{ margin: 0, color: "#52c41a" }}>
                Thanh toán thành công!
              </Title>
              <Text style={{ fontSize: "16px", color: "#666" }}>
                Giao dịch của bạn đã được xử lý thành công
              </Text>
            </div>
            <Tag
              color="success"
              style={{ fontSize: "14px", padding: "8px 16px" }}
            >
              Đã thanh toán
            </Tag>
          </Space>
        </Card>

        {/* Transaction Details */}
        <Card title="Chi tiết giao dịch" style={{ marginBottom: "24px" }}>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Mã đơn hàng:
                </Text>
                <br />
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  {transaction.orderId}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Mã giao dịch:
                </Text>
                <br />
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  {transaction.transactionId}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Số tiền:
                </Text>
                <br />
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#52c41a",
                  }}
                >
                  {formatCurrency(transaction.amount)}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Thời gian thanh toán:
                </Text>
                <br />
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  {transaction.paymentTime}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Khách hàng:
                </Text>
                <br />
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  {transaction.customerName}
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ color: "#666" }}>
                  Phương thức thanh toán:
                </Text>
                <br />
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  {transaction.paymentMethod}
                </Text>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Card style={{ marginBottom: "24px" }}>
          <div style={{ textAlign: "center" }}>
            <Space size="large" wrap>
              <Button
                size="large"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
              >
                Về trang chủ
              </Button>
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
                Tải xuống
              </Button>
            </Space>
          </div>
        </Card>

        {/* Additional Info */}
        <Card>
          <Title level={5} style={{ color: "#52c41a" }}>
            Thông tin quan trọng
          </Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text>✓ Giao dịch đã được xử lý thành công và an toàn</Text>
            <Text>✓ Hóa đơn điện tử đã được gửi về email của bạn</Text>
            <Text>✓ Đơn hàng sẽ được xử lý trong vòng 24 giờ</Text>
            <Text>
              ✓ Bạn có thể theo dõi trạng thái đơn hàng trong tài khoản
            </Text>
          </Space>

          <Divider />

          <div>
            <Text strong>Cần hỗ trợ?</Text>
            <br />
            <Text>Hotline: 1900 1234 | Email: support@company.com</Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
