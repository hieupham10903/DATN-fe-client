"use client";

import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PauseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Empty,
  Image,
  List,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHook from "./index.ts";

const { Title, Text } = Typography;

// Interfaces
interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  orderTime: number;
  productName: string;
  productImageUrl: string;
}

interface Order {
  orderTime: number;
  paymentStatus: string;
  paymentDate: string;
  items: OrderItem[];
}

const OrderHistory: React.FC = () => {
  const {
    userInfo,
    GetOrderHistory,
    listOrderHistory,
    GetMainImage,
    mainImage,
  } = OrderHook();
  const [mainImageList, setMainImageList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.orderId) {
      GetOrderHistory(userInfo.orderId);
    }
  }, [userInfo]);

  useEffect(() => {
    if (listOrderHistory && listOrderHistory.length > 0) {
      listOrderHistory.forEach((order: Order) => {
        order.items.forEach((item: OrderItem) => {
          if (item.productImageUrl && !mainImageList[item.id]) {
            GetMainImage(item.productImageUrl).then((imageUrl) => {
              setMainImageList((prev) => ({ ...prev, [item.id]: imageUrl }));
            });
          }
        });
      });
    }
  }, [listOrderHistory]);

  console.log("listOrderHistory", listOrderHistory);

  // Function to get order status based on payment status
  const getOrderStatus = (paymentStatus: string) => {
    if (paymentStatus == null) {
      return {
        status: "processing",
        text: "Đang xử lý",
        color: "processing",
      };
    } else {
      switch (paymentStatus.toLowerCase()) {
        case "paid":
          return {
            status: "completed",
            text: "Đã thanh toán",
            color: "success",
          };
        case "pending":
          return {
            status: "pending",
            text: "Chờ thanh toán",
            color: "warning",
          };
        case "failed":
          return {
            status: "failed",
            text: "Thanh toán thất bại",
            color: "error",
          };
        case "processing":
          return {
            status: "processing",
            text: "Đang xử lý",
            color: "processing",
          };
        default:
          return {
            status: "unknown",
            text: "Không xác định",
            color: "default",
          };
      }
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to get product image URL
  const getProductImage = (item: OrderItem) => {
    return (
      mainImageList[item.id]?.payload ||
      `/placeholder.svg?height=60&width=60&text=${item.productId.slice(0, 4)}`
    );
  };

  // Loading state
  if (!listOrderHistory) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">Đang tải lịch sử mua hàng...</Text>
        </div>
      </div>
    );
  }

  // Empty state
  if (!listOrderHistory || listOrderHistory.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Chưa có lịch sử mua hàng"
        >
          <Button type="primary" href="/product-list">
            Mua sắm ngay
          </Button>
        </Empty>
      </div>
    );
  }

  const handleBuyAgain = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8, color: "#1a1a1a" }}>
          <ShoppingOutlined style={{ marginRight: 12, color: "#1890ff" }} />
          Lịch sử mua hàng
        </Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Danh sách các lần mua hàng trước đó ({listOrderHistory.length} đơn
          hàng)
        </Text>
      </div>

      {/* Order List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {listOrderHistory.map((order: Order, orderIndex: number) => {
          const orderStatus = getOrderStatus(order.paymentStatus);
          const totalAmount = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const totalItems = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <Card
              key={orderIndex}
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #f0f0f0",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              {/* Order Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <div>
                  <Text strong style={{ fontSize: 18, color: "#1a1a1a" }}>
                    Đơn hàng #{order.orderTime}
                  </Text>
                  <br />
                  <Space size={16} style={{ marginTop: 4 }}>
                    <Text type="secondary">
                      <CalendarOutlined style={{ marginRight: 4 }} />
                      {formatDate(order.paymentDate)}
                    </Text>
                    <Text type="secondary">
                      <strong>{totalItems}</strong> sản phẩm
                    </Text>
                    <Text strong style={{ color: "#ff4d4f" }}>
                      {totalAmount.toLocaleString()}₫
                    </Text>
                  </Space>
                </div>

                <Tag
                  color={
                    orderStatus.color === "success"
                      ? "green"
                      : orderStatus.color === "processing"
                      ? "blue"
                      : orderStatus.color === "warning"
                      ? "orange"
                      : orderStatus.color === "error"
                      ? "red"
                      : "default"
                  }
                  style={{
                    fontSize: 13,
                    padding: "4px 12px",
                    borderRadius: 16,
                  }}
                  icon={
                    orderStatus.status === "completed" ? (
                      <CheckCircleOutlined />
                    ) : orderStatus.status === "processing" ? (
                      <ClockCircleOutlined />
                    ) : orderStatus.status === "pending" ? (
                      <PauseOutlined />
                    ) : orderStatus.status === "failed" ? (
                      <ClockCircleOutlined />
                    ) : (
                      <PauseOutlined />
                    )
                  }
                >
                  {orderStatus.text}
                </Tag>
              </div>

              {/* Product List */}
              <List
                dataSource={order.items}
                renderItem={(item: OrderItem, itemIndex: number) => (
                  <List.Item
                    key={item.id}
                    style={{
                      padding: "12px 0",
                      border: "none",
                      borderBottom:
                        itemIndex < order.items.length - 1
                          ? "1px solid #f5f5f5"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: 16,
                      }}
                    >
                      {/* Product Image */}
                      <Image
                        src={getProductImage(item) || "/placeholder.svg"}
                        alt={item.productName}
                        width={60}
                        height={60}
                        style={{
                          borderRadius: 8,
                          objectFit: "cover",
                          border: "1px solid #f0f0f0",
                        }}
                        preview={false}
                      />

                      {/* Product Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 4 }}>
                          <Text
                            strong
                            style={{ fontSize: 16, color: "#1a1a1a" }}
                          >
                            {item.productName}
                          </Text>
                        </div>
                        <div style={{ marginBottom: 4 }}>
                          <Text
                            strong
                            style={{ color: "#ff4d4f", fontSize: 16 }}
                          >
                            {(item.price * item.quantity).toLocaleString()}₫
                          </Text>
                        </div>
                        <Space split={<Divider type="vertical" />}>
                          <Text type="secondary">
                            Số lượng: {item.quantity}
                          </Text>
                          <Text type="secondary">
                            Đơn giá: {item.price.toLocaleString()}₫
                          </Text>
                        </Space>
                      </div>

                      {/* Buy Again Button */}
                      <div style={{ flexShrink: 0 }}>
                        <Button
                          type="primary"
                          onClick={() => handleBuyAgain(item.productId)}
                          style={{
                            borderRadius: 8,
                            fontSize: 14,
                            height: 36,
                            paddingInline: 24,
                            fontWeight: 600,
                            background: "#1890ff",
                            border: "none",
                            boxShadow: "0 2px 4px rgba(24, 144, 255, 0.2)",
                          }}
                        >
                          Mua lại
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
