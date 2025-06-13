"use client";

import { GiftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { Button, Card, InputNumber, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHook from "./index.ts";

const { Title } = Typography;

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
    UpdateQuantity({
      id: record.id,
      quantity: value,
    });
  };

  const handleDelete = (record: any) => {
    DeleteOrder(record.id);
  };

  const columns = [
    {
      title: (
        <span style={{ fontSize: 16, fontWeight: 600, color: "#1890ff" }}>
          🛍️ Sản phẩm
        </span>
      ),
      dataIndex: "product",
      key: "product",
      width: "40%",
      render: (text: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 0",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={
                mainImageList[record.id]?.payload ||
                "/placeholder.svg?height=80&width=80" ||
                "/placeholder.svg"
              }
              alt={record.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#333",
                marginBottom: 4,
              }}
            >
              {record.name}
            </div>
            <div style={{ fontSize: 12, color: "#999" }}>
              Mã SP: #{record.id.slice(0, 8)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span style={{ fontSize: 16, fontWeight: 600, color: "#52c41a" }}>
          💰 Giá
        </span>
      ),
      dataIndex: "price",
      key: "price",
      width: "15%",
      align: "center" as const,
      render: (price: number) => (
        <div
          style={{
            background: "linear-gradient(135deg, #52c41a, #73d13d)",
            color: "white",
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(82, 196, 26, 0.3)",
          }}
        >
          {price.toLocaleString("vi-VN")} ₫
        </div>
      ),
    },
    {
      title: (
        <span style={{ fontSize: 16, fontWeight: 600, color: "#fa8c16" }}>
          📦 Số lượng
        </span>
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
            background: "linear-gradient(135deg, #f0f2f5, #fafafa)",
            padding: "8px",
            borderRadius: 12,
            border: "1px solid #e8e8e8",
          }}
        >
          <Button
            type="text"
            onClick={() => handleQuantityChange(quantity - 1, record)}
            style={{
              background: "linear-gradient(135deg, #ff7875, #ff4d4f)",
              color: "white",
              border: "none",
              width: 32,
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(255, 77, 79, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            −
          </Button>
          <InputNumber
            value={quantity}
            min={1}
            onChange={(value) => handleQuantityChange(value || 1, record)}
            style={{
              width: 60,
              textAlign: "center",
              borderRadius: 8,
              border: "2px solid #1890ff",
              fontSize: 16,
              fontWeight: 600,
            }}
            controls={false}
          />
          <Button
            type="text"
            onClick={() => handleQuantityChange(quantity + 1, record)}
            style={{
              background: "linear-gradient(135deg, #40a9ff, #1890ff)",
              color: "white",
              border: "none",
              width: 32,
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(24, 144, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: (
        <span style={{ fontSize: 16, fontWeight: 600, color: "#722ed1" }}>
          💎 Tạm tính
        </span>
      ),
      dataIndex: "subtotal",
      key: "subtotal",
      width: "15%",
      align: "center" as const,
      render: (text: any, record: any) => (
        <div
          style={{
            background: "linear-gradient(135deg, #b37feb, #722ed1)",
            color: "white",
            padding: "10px 12px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            textAlign: "center",
            boxShadow: "0 3px 10px rgba(114, 46, 209, 0.3)",
          }}
        >
          {(record.price * record.quantity).toLocaleString("vi-VN")} ₫
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
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          style={{
            background: "linear-gradient(135deg, #ff7875, #ff4d4f)",
            color: "white",
            border: "none",
            width: 40,
            height: 40,
            boxShadow: "0 3px 10px rgba(255, 77, 79, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(255, 77, 79, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            e.currentTarget.style.boxShadow =
              "0 3px 10px rgba(255, 77, 79, 0.4)";
          }}
        />
      ),
    },
  ];

  const dataSource = listOrder.slice(0, 10).map((item: any) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "none",
          overflow: "hidden",
        }}
      >
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <Title
            level={2}
            style={{
              background: "linear-gradient(135deg, #1890ff, #722ed1)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <ShoppingCartOutlined style={{ color: "#1890ff" }} />
            Giỏ hàng của bạn
          </Title>
        </div>

        {listOrder.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "linear-gradient(135deg, #fff9e6, #fff1f0)",
              borderRadius: 16,
              margin: "20px 0",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-t1GeVXlHpaHHBSp4yJqgSp4v2hRiUA.png"
              alt="Giỏ hàng trống"
              style={{
                width: 200,
                height: 200,
                marginBottom: 20,
                opacity: 0.8,
              }}
            />
            <Title
              level={3}
              style={{
                color: "#faad14",
                marginBottom: 12,
                fontSize: 24,
              }}
            >
              Giỏ hàng của bạn đang trống
            </Title>
            <p
              style={{
                color: "#666",
                fontSize: 16,
                marginBottom: 30,
              }}
            >
              Hãy thêm một số sản phẩm vào giỏ hàng để bắt đầu mua sắm!
            </p>
            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(135deg, #40a9ff, #1890ff)",
                border: "none",
                borderRadius: 12,
                padding: "0 40px",
                height: 48,
                fontSize: 16,
                fontWeight: 600,
              }}
              onClick={() => navigate("/product-list")}
            >
              🛍️ Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <Table
            bordered={false}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            style={{
              backgroundColor: "transparent",
            }}
          />
        )}
      </Card>

      {listOrder.length > 0 && (
        <>
          <Card
            style={{
              marginTop: 24,
              borderRadius: 16,
              background: "linear-gradient(135deg, #fff1f0, #fff2e8)",
              border: "2px solid #ffadd6",
              boxShadow: "0 8px 32px rgba(255, 173, 214, 0.3)",
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
                <GiftOutlined style={{ fontSize: 24, color: "#eb2f96" }} />
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #eb2f96, #722ed1)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Tổng tiền: {totalPrice.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>
          </Card>

          <Card
            style={{
              marginTop: 16,
              borderRadius: 16,
              background: "linear-gradient(135deg, #f6ffed, #f0f9ff)",
              border: "none",
              boxShadow: "0 8px 32px rgba(24, 144, 255, 0.15)",
            }}
          >
            <Button
              type="primary"
              size="large"
              block
              style={{
                height: 50,
                fontSize: 18,
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, #40a9ff, #1890ff, #722ed1)",
                border: "none",
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(24, 144, 255, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(24, 144, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(24, 144, 255, 0.4)";
              }}
              onClick={() => navigate("/payment")}
            >
              🛒 THANH TOÁN
            </Button>
          </Card>
        </>
      )}
    </div>
  );
};

export default OrderList;
