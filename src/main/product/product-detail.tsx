import { CloseOutlined, PictureOutlined } from "@ant-design/icons";
import {
  Card as AntCard,
  Image as AntImage,
  Button,
  Col,
  Divider,
  InputNumber,
  Row,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductHook from "./index.ts";

const Card: React.FC<any> = AntCard as any;
const Image: React.FC<any> = AntImage as any;

const { Title, Text } = Typography;

function ProductDetail({ handleCloseModal }) {
  const {
    GetMainImage,
    GetDetailImages,
    mainImage,
    detailImages,
    DetailProduct,
    product,
  } = ProductHook();

  const { id } = useParams();

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
    ? parseInt(product?.price) + 500000
    : 970000;
  const discountPrice = product?.price || 111111;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 150px)", // Sử dụng calc để trừ 40px cho padding/header
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Tag
        color="volcano"
        style={{ position: "absolute", top: 24, right: 32, fontSize: 16 }}
      >
        FLASH SALE
      </Tag>

      <Row gutter={[48, 48]} style={{ height: "100%", display: "flex" }}>
        <Col span={12}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              minHeight: "100%", // Đảm bảo Card bên trái bằng chiều cao của Row
              display: "flex",
              flexDirection: "column",
            }}
          >
            {mainImage ? (
              <Image
                src={mainImage}
                alt="Ảnh chính"
                width="100%"
                height={450}
                style={{ objectFit: "cover", borderRadius: 12 }}
                preview
              />
            ) : (
              <Text style={{ padding: 16 }}>Đang tải ảnh chính...</Text>
            )}
            <Divider orientation="left" style={{ margin: "16px 0" }}>
              <PictureOutlined /> Ảnh chi tiết
            </Divider>
            <Row gutter={[16, 16]} style={{ flex: 1 }}>
              {detailImages.length > 0 ? (
                detailImages.map((image, idx) => (
                  <Col span={12} key={idx}>
                    <Image
                      src={image}
                      alt={`Ảnh chi tiết ${idx + 1}`}
                      width="100%"
                      height={120}
                      style={{ objectFit: "cover", borderRadius: 8 }}
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

        <Col span={12}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: 24,
              minHeight: "100%", // Đảm bảo Card bên phải bằng chiều cao của Row
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title level={3} style={{ marginBottom: 16 }}>
              {product?.name || "AAA"}
            </Title>
            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ fontSize: 28, color: "#ff4d4f" }}>
                đ{discountPrice.toLocaleString()} ₫
              </Text>
              <Text
                delete
                style={{ marginLeft: 16, color: "#888", fontSize: 16 }}
              >
                đ{originalPrice.toLocaleString()} ₫
              </Text>
            </div>
            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ marginBottom: 8 }}>
                Số Lượng:
              </Text>
              <div>
                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ width: 140 }}
                />
              </div>
            </div>
            <Row
              gutter={[16, 16]}
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Col flex="1 1 60%">
                <Button
                  type="primary"
                  danger
                  block
                  size="large"
                  style={{ height: 56, fontSize: 16 }}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
              </Col>
              <Col flex="1 1 35%">
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCloseModal}
                  block
                  size="large"
                  style={{ height: 56, fontSize: 16 }}
                >
                  Đóng
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
