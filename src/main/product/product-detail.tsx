"use client";

import { PictureOutlined } from "@ant-design/icons";
import {
  Card as AntCard,
  Image as AntImage,
  Button,
  Col,
  Divider,
  InputNumber,
  Row,
  Typography,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductHook from "./index.ts";

const Card: React.FC<any> = AntCard as any;
const Image: React.FC<any> = AntImage as any;
const { Title, Text, Paragraph } = Typography;

function ProductDetail({ handleCloseModal }) {
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id && DetailProduct(id);
  }, [id]);

  const imageDetails = product?.imageDetail
    ? product?.imageDetail.split(",")
    : [];

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

  const originalPrice = product?.price
    ? Number.parseInt(product?.price) + 500000
    : 970000;
  const discountPrice = product?.price || 111111;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number | null) => {
    setQuantity(value || 1);
  };

  const handleOrder = () => {
    OrderProduct({
      productId: product.id,
      orderId: userInfo.orderId,
      quantity: quantity,
    });
  };

  useEffect(() => {
    updateSuccess && navigate("/order-list");
  }, [updateSuccess]);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[24, 24]} style={{ minHeight: "700px" }}>
        {/* Cột trái - ảnh */}
        <Col span={10} style={{ display: "flex" }}>
          <Card
            style={{
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {mainImage ? (
              <Image
                src={mainImage || "/placeholder.svg"}
                alt="Ảnh sản phẩm"
                width="100%"
                height={450}
                style={{
                  objectFit: "contain",
                  backgroundColor: "#fafafa",
                }}
                preview
              />
            ) : (
              <div
                style={{
                  height: 350,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Đang tải ảnh...</Text>
              </div>
            )}

            <Divider orientation="left" style={{ margin: "16px 0" }}>
              <PictureOutlined /> Ảnh chi tiết
            </Divider>

            <Row gutter={[8, 8]} style={{ flex: 1, padding: "0 16px 16px" }}>
              {detailImages.length > 0 ? (
                detailImages.map((image, idx) => (
                  <Col span={6} key={idx}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Ảnh chi tiết ${idx + 1}`}
                      width="100%"
                      height={80}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #eee",
                      }}
                      preview
                    />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Text style={{ padding: 8 }}>Không có ảnh chi tiết</Text>
                </Col>
              )}
            </Row>
          </Card>
        </Col>

        {/* Cột phải - thông tin sản phẩm */}
        <Col span={14} style={{ display: "flex" }}>
          <Card
            style={{
              borderRadius: 8,
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "32px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Title
                  level={2}
                  style={{
                    fontSize: 32,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: "#333",
                  }}
                >
                  {product?.name || "AAAA"}
                </Title>

                <div style={{ marginBottom: 20 }}>
                  <Text
                    strong
                    style={{
                      fontSize: 36,
                      color: "#ff4d4f",
                      marginRight: 16,
                    }}
                  >
                    đ{discountPrice.toLocaleString()} ₫
                  </Text>
                  <Text
                    delete
                    style={{
                      color: "#ccc",
                      fontSize: 16,
                    }}
                  >
                    đ{originalPrice.toLocaleString()} ₫
                  </Text>
                </div>

                <div style={{ marginBottom: 12, fontSize: 16 }}>
                  <Text type="secondary">Loại sản phẩm: </Text>
                  <Text>
                    {product?.categoryId ||
                      "af87cfee-3841-4238-9bfa-bd4d97e7f457"}
                  </Text>
                </div>

                <div style={{ marginBottom: 12, fontSize: 16 }}>
                  <Text type="secondary">Số lượng còn lại: </Text>
                  <Text>{product?.stockQuantity ?? 11}</Text>
                </div>

                <div style={{ marginBottom: 12, fontSize: 16 }}>
                  <Text type="secondary">Mô tả:</Text>
                </div>
                <div style={{ marginBottom: 20, fontSize: 16 }}>
                  <Text>{product?.description || "AAAA"}</Text>
                </div>

                {/* Thêm phần đánh giá */}
                <div style={{ marginBottom: 16, fontSize: 16 }}>
                  <Text type="secondary">Đánh giá: </Text>
                  <span style={{ color: "#faad14" }}>★★★★☆</span>
                  <Text style={{ marginLeft: 8, color: "#666" }}>(4/5)</Text>
                </div>

                {/* Thêm thông tin chi tiết sản phẩm */}
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <Text
                    strong
                    style={{ fontSize: 16, display: "block", marginBottom: 12 }}
                  >
                    Thông tin chi tiết:
                  </Text>
                  <div style={{ fontSize: 14, lineHeight: "1.6" }}>
                    <div style={{ marginBottom: 8 }}>
                      <Text type="secondary">Chất liệu: </Text>
                      <Text>Gốm sứ cao cấp</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Text type="secondary">Kích thước: </Text>
                      <Text>Cao 25cm x Rộng 18cm</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Text type="secondary">Xuất xứ: </Text>
                      <Text>Việt Nam</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Text type="secondary">Bảo hành: </Text>
                      <Text>12 tháng</Text>
                    </div>
                  </div>
                </div>

                {/* Thêm các đặc điểm nổi bật */}
                <div style={{ marginBottom: 20 }}>
                  <Text
                    strong
                    style={{ fontSize: 16, display: "block", marginBottom: 12 }}
                  >
                    Đặc điểm nổi bật:
                  </Text>
                  <div style={{ fontSize: 14 }}>
                    <div
                      style={{
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#52c41a", marginRight: 8 }}>
                        ✓
                      </span>
                      <Text>Thiết kế tinh xảo, độc đáo</Text>
                    </div>
                    <div
                      style={{
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#52c41a", marginRight: 8 }}>
                        ✓
                      </span>
                      <Text>Chất liệu bền đẹp, không phai màu</Text>
                    </div>
                    <div
                      style={{
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#52c41a", marginRight: 8 }}>
                        ✓
                      </span>
                      <Text>Phù hợp làm quà tặng hoặc trang trí</Text>
                    </div>
                    <div
                      style={{
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#52c41a", marginRight: 8 }}>
                        ✓
                      </span>
                      <Text>Miễn phí vận chuyển toàn quốc</Text>
                    </div>
                  </div>
                </div>

                {/* Thêm thông tin vận chuyển */}
                <div
                  style={{
                    border: "1px solid #e8e8e8",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <div style={{ fontSize: 14, marginBottom: 8 }}>
                    <Text type="secondary">🚚 Vận chuyển: </Text>
                    <Text>Giao hàng trong 2-3 ngày</Text>
                  </div>
                  <div style={{ fontSize: 14, marginBottom: 8 }}>
                    <Text type="secondary">🔄 Đổi trả: </Text>
                    <Text>Miễn phí đổi trả trong 7 ngày</Text>
                  </div>
                  <div style={{ fontSize: 14 }}>
                    <Text type="secondary">💳 Thanh toán: </Text>
                    <Text>COD, Chuyển khoản</Text>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <Text
                    strong
                    style={{ fontSize: 14, marginBottom: 8, display: "block" }}
                  >
                    Số lượng
                  </Text>
                  <InputNumber
                    min={1}
                    max={product?.stockQuantity || 999}
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{
                      width: 120,
                      height: 40,
                    }}
                  />
                </div>
              </div>

              <Button
                type="primary"
                danger
                block
                size="large"
                style={{
                  height: 56,
                  fontSize: 18,
                  borderRadius: 6,
                  backgroundColor: "#ff4757",
                  border: "none",
                  marginTop: 20,
                }}
                onClick={() => {
                  handleOrder();
                }}
              >
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
