import { CloseOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Tag } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductHook from "./index.ts";

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

  // Dữ liệu mẫu để demo (thay bằng dữ liệu thực tế nếu có)
  const originalPrice = product?.price
    ? parseInt(product?.price) + 500000
    : 970000;
  const discountPrice = product?.price || 111111; // Điều chỉnh giá theo hình ảnh mới
  const colors = ["TRẮNG", "HỒNG", "ĐỎ", "NÂU", "ĐEN"];
  const sizes = ["M", "L", "XL"];

  return (
    <>
      <div
        style={{
          position: "relative",
          padding: 16,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {/* Banner Flash Sale */}
        <Tag color="orange" style={{ position: "absolute", top: 8, right: 8 }}>
          FLASH SALE
        </Tag>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ color: "#ff5500", fontWeight: "bold" }}>
            ⏳ KẾT THÚC TRONG 00:11:00
          </span>
        </div>

        {/* Tiêu đề và Đánh giá sản phẩm */}
        <h2 style={{ textAlign: "center", marginBottom: 8 }}>
          {product?.name || "AAA"}
        </h2>
        <div style={{ textAlign: "center", color: "#888", marginBottom: 16 }}>
          <span>4.9 ★★★★★</span> | <span>2.5k Đánh Giá</span>
        </div>

        {/* Phần Giá */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span
            style={{ color: "#ff5500", fontSize: "24px", fontWeight: "bold" }}
          >
            đ{discountPrice.toLocaleString()} ₫
          </span>
          <span
            style={{
              textDecoration: "line-through",
              color: "#888",
              marginLeft: 8,
            }}
          >
            đ{originalPrice.toLocaleString()} ₫
          </span>
        </div>

        {/* Phần Voucher */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Tag color="green">Voucher Cửa Shop</Tag>
          <Tag color="blue">Giảm 25%</Tag>
          <Tag color="purple">Giảm 15%</Tag>
        </div>

        {/* Ảnh chính */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          {mainImage ? (
            <img
              src={mainImage}
              alt="Ảnh chính"
              style={{ width: 300, height: 300, objectFit: "cover" }}
            />
          ) : (
            <span>Đang tải ảnh chính...</span>
          )}
        </div>

        {/* Lựa chọn Màu sắc và Size */}
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 16 }}>
          <Col>
            <strong>Màu Sắc:</strong>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              {colors.map((color) => (
                <Button
                  key={color}
                  style={{
                    backgroundColor:
                      color === "TRẮNG"
                        ? "#fff"
                        : color === "HỒNG"
                        ? "#ff69b4"
                        : color === "ĐỎ"
                        ? "#ff0000"
                        : color === "NÂU"
                        ? "#8B4513"
                        : "#000",
                    color: color === "TRẮNG" ? "#000" : "#fff",
                    border: "1px solid #d9d9d9",
                    padding: "0 12px",
                    height: 40,
                  }}
                >
                  F537 {color}
                </Button>
              ))}
            </div>
          </Col>
          <Col>
            <strong>Size:</strong>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  style={{
                    border: "1px solid #d9d9d9",
                    padding: "0 12px",
                    height: 40,
                  }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Số lượng */}
        <Row justify="center" style={{ marginBottom: 16 }}>
          <Col>
            <strong>Số Lượng:</strong>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Button>-</Button>
              <span style={{ margin: "0 8px" }}>1</span>
              <Button>+</Button>
            </div>
          </Col>
        </Row>

        {/* Nút Thêm vào Giỏ hàng */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Button
            type="primary"
            danger
            style={{ width: 200, height: 40, fontSize: "16px" }}
          >
            Thêm Vào Giỏ Hàng
          </Button>
          <div style={{ color: "#ff5500", marginTop: 8 }}>
            Mua Voucher: đ235.000
          </div>
        </div>

        {/* Ảnh chi tiết */}
        <Divider orientation="left">
          <PictureOutlined /> Ảnh chi tiết
        </Divider>
        <Row gutter={[16, 16]}>
          {detailImages.length > 0 ? (
            detailImages.map((image, idx) => (
              <Col span={6} key={idx}>
                <img
                  src={image}
                  alt={`Ảnh chi tiết ${idx + 1}`}
                  style={{ width: "100%", height: 100, objectFit: "cover" }}
                />
              </Col>
            ))
          ) : (
            <Col span={6}>
              <span>Không có ảnh chi tiết</span>
            </Col>
          )}
        </Row>

        {/* Nút Đóng */}
        <Row justify="end" style={{ marginTop: 24 }}>
          <Space>
            <Button
              className="ant-btn delete"
              icon={<CloseOutlined />}
              onClick={handleCloseModal}
            >
              Đóng
            </Button>
          </Space>
        </Row>
      </div>
    </>
  );
}

export default ProductDetail;
