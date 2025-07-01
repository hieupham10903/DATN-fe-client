"use client";

import {
  CreditCardOutlined,
  DeleteOutlined,
  DollarOutlined,
  GiftOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Divider,
  InputNumber,
  Radio,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHook from "./index.ts";

const { Title, Text } = Typography;

const OrderList = () => {
  const {
    GetListOrder,
    listOrder,
    GetMainImage,
    mainImage,
    userInfo,
    UpdateQuantity,
    updateSuccess,
    DeleteOrder,
  } = OrderHook();

  const [mainImageList, setMainImageList] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      GetListOrder(userInfo?.id);
    }
  }, [userInfo, updateSuccess]);

  useEffect(() => {
    listOrder.forEach((product: any) => {
      if (product.imageUrl && !mainImageList[product.id]) {
        GetMainImage(product.imageUrl).then((imageUrl) => {
          setMainImageList((prev) => ({ ...prev, [product.id]: imageUrl }));
        });
      }
    });
    const total = listOrder.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [listOrder]);

  const handleQuantityChange = (value: number, record: any) => {
    if (value < 1) return;
    UpdateQuantity({
      id: record.id,
      quantity: value,
    });
  };

  const handleDelete = (record: any) => {
    DeleteOrder(record.id);
  };

  const handlePayment = () => {
    if (paymentMethod === "online") {
      navigate("/payment");
    } else {
      navigate("/payment-offline");
    }
  };

  const columns = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ShoppingCartOutlined style={{ color: "#1890ff", fontSize: 16 }} />
          <Text strong style={{ color: "#1890ff", fontSize: 16 }}>
            Sản phẩm
          </Text>
        </div>
      ),
      dataIndex: "product",
      key: "product",
      width: "45%",
      render: (text: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: "1px solid #f0f0f0",
            }}
          >
            <img
              src={
                mainImageList[record.id]?.payload ||
                "/placeholder.svg?height=80&width=80"
              }
              alt={record.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Title
              level={5}
              style={{ margin: 0, marginBottom: 4, color: "#262626" }}
            >
              {record.name}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Mã SP: #{record.id.toUpperCase()}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <DollarOutlined style={{ color: "#52c41a", fontSize: 16 }} />
          <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
            Đơn giá
          </Text>
        </div>
      ),
      dataIndex: "price",
      key: "price",
      width: "20%",
      align: "center" as const,
      render: (price: number) => (
        <div
          style={{
            background: "linear-gradient(135deg, #f6ffed, #d9f7be)",
            color: "#389e0d",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            border: "1px solid #b7eb8f",
          }}
        >
          {price.toLocaleString("vi-VN")}₫
        </div>
      ),
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <Text strong style={{ color: "#fa8c16", fontSize: 16 }}>
            Số lượng
          </Text>
        </div>
      ),
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      align: "center" as const,
      render: (quantity: number, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Button
            type="text"
            size="small"
            icon={<MinusOutlined />}
            onClick={() => handleQuantityChange(quantity - 1, record)}
            style={{
              background: "#fff2f0",
              color: "#ff4d4f",
              border: "1px solid #ffccc7",
              borderRadius: 6,
              width: 28,
              height: 28,
            }}
            disabled={quantity <= 1}
          />
          <InputNumber
            value={quantity}
            min={1}
            onChange={(value) => handleQuantityChange(value || 1, record)}
            style={{
              width: 60,
              textAlign: "center",
              borderRadius: 6,
            }}
            controls={false}
          />
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => handleQuantityChange(quantity + 1, record)}
            style={{
              background: "#f6ffed",
              color: "#52c41a",
              border: "1px solid #b7eb8f",
              borderRadius: 6,
              width: 28,
              height: 28,
            }}
          />
        </div>
      ),
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <Text strong style={{ color: "#722ed1", fontSize: 16 }}>
            Thành tiền
          </Text>
        </div>
      ),
      dataIndex: "subtotal",
      key: "subtotal",
      width: "20%",
      align: "center" as const,
      render: (text: any, record: any) => (
        <div
          style={{
            background: "linear-gradient(135deg, #f9f0ff, #efdbff)",
            color: "#722ed1",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            textAlign: "center",
            border: "1px solid #d3adf7",
          }}
        >
          {(record.price * record.quantity).toLocaleString("vi-VN")}₫
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Tooltip title="Xóa sản phẩm">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{
              borderRadius: 8,
              width: 36,
              height: 36,
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = listOrder.map((item: any) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px",
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid #f0f0f0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: "#1890ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <ShoppingCartOutlined />
            Giỏ hàng của bạn
            {listOrder.length > 0 && (
              <Badge
                count={listOrder.length}
                style={{ backgroundColor: "#52c41a" }}
              />
            )}
          </Title>
        </div>
      </Card>

      {/* Empty State */}
      {listOrder.length === 0 ? (
        <Card
          style={{
            textAlign: "center",
            padding: "60px 20px",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <ShoppingCartOutlined style={{ fontSize: 80, color: "#d9d9d9" }} />
          </div>
          <Title level={3} style={{ color: "#8c8c8c", marginBottom: 16 }}>
            Giỏ hàng của bạn đang trống
          </Title>
          <Text
            style={{
              color: "#8c8c8c",
              fontSize: 16,
              marginBottom: 32,
              display: "block",
            }}
          >
            Hãy thêm một số sản phẩm vào giỏ hàng để bắt đầu mua sắm!
          </Text>
          <Button
            type="primary"
            size="large"
            style={{ borderRadius: 8, height: 48, paddingInline: 32 }}
            onClick={() => navigate("/product-list")}
          >
            Tiếp tục mua sắm
          </Button>
        </Card>
      ) : (
        <>
          {/* Product Table */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
            }}
          >
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              style={{ backgroundColor: "transparent" }}
              rowClassName={() => "hover:bg-gray-50"}
            />
          </Card>

          {/* Payment Method Selection */}
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CreditCardOutlined style={{ color: "#1890ff" }} />
                <Text strong style={{ fontSize: 16 }}>
                  Phương thức thanh toán
                </Text>
              </div>
            }
            style={{
              marginBottom: 24,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
            }}
          >
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: "100%" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Radio
                  value="online"
                  style={{ fontSize: 16, padding: "12px 0" }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <CreditCardOutlined
                      style={{ fontSize: 20, color: "#1890ff" }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "#262626" }}>
                        Thanh toán online
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Thanh toán qua thẻ tín dụng, ví điện tử, chuyển khoản
                      </Text>
                    </div>
                  </div>
                </Radio>
                <Radio value="cash" style={{ fontSize: 16, padding: "12px 0" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <DollarOutlined
                      style={{ fontSize: 20, color: "#52c41a" }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "#262626" }}>
                        Thanh toán trực tiếp
                      </div>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Thanh toán bằng tiền mặt khi nhận hàng (COD)
                      </Text>
                    </div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Card>

          {/* Order Summary */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              background: "linear-gradient(135deg, #fff7e6, #fff2e8)",
              border: "1px solid #ffd591",
              boxShadow: "0 2px 8px rgba(255, 213, 145, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <GiftOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
                <Text
                  style={{ fontSize: 18, fontWeight: 600, color: "#262626" }}
                >
                  Tổng cộng:
                </Text>
              </div>
              <Title level={3} style={{ margin: 0, color: "#fa8c16" }}>
                {totalPrice.toLocaleString("vi-VN")}₫
              </Title>
            </div>
            <Divider style={{ margin: "16px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text type="secondary">
                Phương thức:{" "}
                {paymentMethod === "online"
                  ? "Thanh toán online"
                  : "Thanh toán trực tiếp (COD)"}
              </Text>
              <Text type="secondary">{listOrder.length} sản phẩm</Text>
            </div>
          </Card>

          {/* Payment Button */}
          <Card
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #f6ffed, #f0f9ff)",
              border: "1px solid #91d5ff",
              boxShadow: "0 2px 8px rgba(145, 213, 255, 0.3)",
            }}
          >
            <Button
              type="primary"
              size="large"
              block
              style={{
                height: 56,
                fontSize: 18,
                fontWeight: 600,
                borderRadius: 8,
                background:
                  paymentMethod === "online"
                    ? "linear-gradient(135deg, #40a9ff, #1890ff)"
                    : "linear-gradient(135deg, #73d13d, #52c41a)",
                border: "none",
                boxShadow:
                  paymentMethod === "online"
                    ? "0 4px 16px rgba(24, 144, 255, 0.3)"
                    : "0 4px 16px rgba(82, 196, 26, 0.3)",
              }}
              onClick={handlePayment}
            >
              {paymentMethod === "online" ? (
                <>
                  <CreditCardOutlined style={{ marginRight: 8 }} />
                  THANH TOÁN ONLINE
                </>
              ) : (
                <>
                  <DollarOutlined style={{ marginRight: 8 }} />
                  XÁC NHẬN ĐẶT HÀNG (COD)
                </>
              )}
            </Button>
          </Card>
        </>
      )}
    </div>
  );
};

export default OrderList;
