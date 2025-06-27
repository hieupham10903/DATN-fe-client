"use client";

import {
  CheckCircleOutlined,
  CreditCardOutlined,
  PictureOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  TruckOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  InputNumber,
  Row,
  Skeleton,
  Space,
  Tabs,
  Tag,
  Typography,
} from "antd";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductHook from "./index.ts";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ProductDetailProps {
  handleCloseModal?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ handleCloseModal }) => {
  const {
    GetMainImage,
    GetDetailImages,
    mainImage,
    detailImages,
    DetailProduct,
    product,
    OrderProduct,
    updateSuccess,
    userInfo,
  } = ProductHook();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      DetailProduct(id).finally(() => setLoading(false));
    }
  }, [id]);

  const imageDetails: string[] = product?.imageDetail
    ? product?.imageDetail.split(",")
    : [];

  const allImages: any[] = [mainImage, ...detailImages].filter(Boolean);

  useEffect(() => {
    if (product?.imageUrl && !mainImage) {
      GetMainImage(product?.imageUrl);
    }
  }, [product?.imageUrl]);

  useEffect(() => {
    if (imageDetails.length > 0 && detailImages.length === 0) {
      GetDetailImages(imageDetails);
    }
  }, [imageDetails]);

  const originalPrice: number = product?.price
    ? Number.parseInt(product?.price) + 500000
    : 970000;

  const discountPrice: number = product?.price || 111111;
  const discountPercent: number = Math.round(
    ((originalPrice - discountPrice) / originalPrice) * 100
  );

  const handleQuantityChange = (value: number | null): void => {
    setQuantity(value || 1);
  };

  const handleOrder = (): void => {
    OrderProduct({
      productId: product.id,
      orderId: userInfo.orderId,
      quantity: quantity,
    });
  };

  useEffect(() => {
    updateSuccess && navigate("/order-list");
  }, [updateSuccess]);

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Skeleton.Image style={{ width: "100%", height: 500 }} />
          </Col>
          <Col span={12}>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Row gutter={[32, 32]} style={{ minHeight: "600px" }}>
        {/* Left Column - Images */}
        <Col xs={24} lg={12} style={{ display: "flex" }}>
          <Card
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "none",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            bodyStyle={{
              padding: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Main Image */}
            <div
              style={{ position: "relative", backgroundColor: "#fff", flex: 1 }}
            >
              {discountPercent > 0 && (
                <Badge.Ribbon
                  text={`-${discountPercent}%`}
                  color="red"
                  style={{ fontSize: 14, fontWeight: "bold" }}
                />
              )}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  minHeight: "400px",
                }}
              >
                {allImages.length > 0 ? (
                  <Image
                    src={
                      allImages[selectedImageIndex] ||
                      "/placeholder.svg?height=500&width=500" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt="Ảnh sản phẩm"
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#fafafa",
                      minHeight: "400px",
                    }}
                    preview={{
                      mask: (
                        <div
                          style={{
                            background: "rgba(0,0,0,0.5)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: 6,
                            fontSize: 14,
                          }}
                        >
                          <ZoomInOutlined /> Xem chi tiết
                        </div>
                      ),
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      minHeight: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <PictureOutlined style={{ fontSize: 48, color: "#ccc" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div style={{ padding: "16px", flexShrink: 0 }}>
                <Row gutter={[8, 8]}>
                  {allImages.map((image: string, idx: number) => (
                    <Col span={6} key={idx}>
                      <div
                        onClick={() => setSelectedImageIndex(idx)}
                        style={{
                          cursor: "pointer",
                          border:
                            selectedImageIndex === idx
                              ? "2px solid #1890ff"
                              : "1px solid #eee",
                          borderRadius: 8,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg?height=80&width=80"}
                          alt={`Ảnh ${idx + 1}`}
                          width="100%"
                          height={80}
                          style={{ objectFit: "cover" }}
                          preview={false}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Card>
        </Col>

        {/* Right Column - Product Info */}
        <Col xs={24} lg={12} style={{ display: "flex" }}>
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "none",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            bodyStyle={{
              padding: "24px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Product Title */}
                <Title
                  level={1}
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  {product?.name || "Tên sản phẩm"}
                </Title>

                {/* Price */}
                <div
                  style={{
                    marginBottom: 24,
                    padding: "16px 20px",
                    backgroundColor: "#fff2f0",
                    borderRadius: 12,
                    border: "1px solid #ffccc7",
                  }}
                >
                  <Space align="baseline" size={12}>
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#ff4d4f",
                      }}
                    >
                      {discountPrice.toLocaleString()}₫
                    </Text>
                    {discountPercent > 0 && (
                      <Text
                        delete
                        style={{
                          fontSize: 18,
                          color: "#999",
                        }}
                      >
                        {originalPrice.toLocaleString()}₫
                      </Text>
                    )}
                  </Space>
                </div>

                {/* Product Tags */}
                <div style={{ marginBottom: 20 }}>
                  <Space wrap>
                    <Tag color="green">Miễn phí vận chuyển</Tag>
                    <Tag color="blue">Chính hãng 100%</Tag>
                    <Tag color="orange">Bảo hành 12 tháng</Tag>
                  </Space>
                </div>

                {/* Quick Info */}
                <div
                  style={{
                    marginBottom: 24,
                    padding: "16px",
                    backgroundColor: "#f6ffed",
                    borderRadius: 8,
                    border: "1px solid #b7eb8f",
                  }}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={12}>
                      <Space>
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                        <Text style={{ fontSize: 14 }}>
                          Còn lại: {product?.stockQuantity || 11}
                        </Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <TruckOutlined style={{ color: "#1890ff" }} />
                        <Text style={{ fontSize: 14 }}>
                          Giao trong 2-3 ngày
                        </Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <SyncOutlined style={{ color: "#722ed1" }} />
                        <Text style={{ fontSize: 14 }}>Đổi trả 7 ngày</Text>
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space>
                        <CreditCardOutlined style={{ color: "#fa8c16" }} />
                        <Text style={{ fontSize: 14 }}>Thanh toán COD</Text>
                      </Space>
                    </Col>
                  </Row>
                </div>

                {/* Quantity Selector */}
                <div style={{ marginBottom: 24 }}>
                  <Text
                    strong
                    style={{ fontSize: 16, marginBottom: 12, display: "block" }}
                  >
                    Số lượng
                  </Text>
                  <Space>
                    <InputNumber
                      min={1}
                      max={product?.stockQuantity || 999}
                      value={quantity}
                      onChange={handleQuantityChange}
                      size="large"
                      style={{ width: 120 }}
                    />
                    <Text type="secondary">
                      {product?.stockQuantity || 11} sản phẩm có sẵn
                    </Text>
                  </Space>
                </div>
              </div>

              {/* Action Button - Always at bottom */}
              <Button
                type="primary"
                size="large"
                block
                icon={<ShoppingCartOutlined />}
                onClick={handleOrder}
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(238, 90, 36, 0.4)",
                  marginTop: "auto",
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Product Details Tabs */}
      <Card
        style={{
          marginTop: 32,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "none",
        }}
      >
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Mô tả sản phẩm" key="1">
            <div style={{ padding: "20px 0" }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Mô tả chi tiết
              </Title>
              <Paragraph
                style={{ fontSize: 16, lineHeight: 1.8, color: "#555" }}
              >
                {product?.description ||
                  "Sản phẩm handmade cao cấp được chế tác tỉ mỉ từ những nghệ nhân lành nghề. Với thiết kế độc đáo và chất liệu bền đẹp, sản phẩm không chỉ mang tính thẩm mỹ cao mà còn có giá trị sử dụng lâu dài."}
              </Paragraph>

              <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                Thông số kỹ thuật
              </Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div
                    style={{
                      padding: 16,
                      backgroundColor: "#fafafa",
                      borderRadius: 8,
                    }}
                  >
                    <Text strong>Chất liệu:</Text>
                    <br />
                    <Text>Gốm sứ cao cấp</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      padding: 16,
                      backgroundColor: "#fafafa",
                      borderRadius: 8,
                    }}
                  >
                    <Text strong>Kích thước:</Text>
                    <br />
                    <Text>25cm x 18cm x 12cm</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      padding: 16,
                      backgroundColor: "#fafafa",
                      borderRadius: 8,
                    }}
                  >
                    <Text strong>Xuất xứ:</Text>
                    <br />
                    <Text>Việt Nam</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      padding: 16,
                      backgroundColor: "#fafafa",
                      borderRadius: 8,
                    }}
                  >
                    <Text strong>Bảo hành:</Text>
                    <br />
                    <Text>12 tháng</Text>
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tab="Chính sách" key="2">
            <div style={{ padding: "20px 0" }}>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Card size="small" style={{ height: "100%" }}>
                    <Title level={5}>
                      <TruckOutlined
                        style={{ color: "#1890ff", marginRight: 8 }}
                      />
                      Chính sách vận chuyển
                    </Title>
                    <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                      <li>Miễn phí vận chuyển toàn quốc</li>
                      <li>Giao hàng trong 2-3 ngày làm việc</li>
                      <li>Đóng gói cẩn thận, chống va đập</li>
                    </ul>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" style={{ height: "100%" }}>
                    <Title level={5}>
                      <SyncOutlined
                        style={{ color: "#52c41a", marginRight: 8 }}
                      />
                      Chính sách đổi trả
                    </Title>
                    <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                      <li>Đổi trả miễn phí trong 7 ngày</li>
                      <li>Sản phẩm còn nguyên tem, nhãn</li>
                      <li>Hoàn tiền 100% nếu lỗi từ nhà sản xuất</li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductDetail;
