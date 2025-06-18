"use client";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Row, Space, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductHook from "../product/index.ts";

const { Title, Paragraph, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const [mainImageList, setMainImageList] = useState({});

  const {
    GetDataSearch,
    listProduct,
    totalProduct,
    updateSuccess,
    ResetProductState,
    GetMainImage,
    mainImage,
  } = ProductHook();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    sort: "",
    dataSearch: {},
  });

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    listProduct.forEach((product: any) => {
      if (product.imageUrl && !mainImageList[product.id]) {
        GetMainImage(product.imageUrl).then((imageUrl) => {
          setMainImageList((prev) => ({ ...prev, [product.id]: imageUrl }));
        });
      }
    });
  }, [listProduct, mainImageList]);

  const formatPrice = (price: number) => {
    return price?.toLocaleString() || "0";
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          background:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <Title
            level={1}
            style={{
              color: "white",
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            Tinh hoa nghề thủ công Việt Nam
          </Title>
          <Paragraph
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.2rem",
              marginBottom: "32px",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Khám phá bộ sưu tập đồ thủ công mỹ nghệ độc đáo, được chế tác thủ
            công bởi những nghệ nhân tài hoa
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#d4a574",
                borderColor: "#d4a574",
                height: "50px",
                fontSize: "16px",
                fontWeight: "600",
                padding: "0 32px",
              }}
            >
              Khám phá bộ sưu tập
            </Button>
            <Button
              size="large"
              ghost
              style={{
                height: "50px",
                fontSize: "16px",
                fontWeight: "600",
                padding: "0 32px",
                borderColor: "white",
                color: "white",
              }}
              onClick={() => navigate("/about")}
            >
              Câu chuyện của chúng tôi
            </Button>
          </Space>
        </div>
      </section>

      {/* Featured Categories */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fef7e6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Danh mục nổi bật
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Khám phá các bộ sưu tập đồ thủ công mỹ nghệ đa dạng, từ gốm sứ
              truyền thống đến các sản phẩm trang trí hiện đại
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {categories.map((category, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: "300px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        alt={category.name}
                        src={category.image || "/placeholder.svg"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          padding: "40px 20px 20px",
                          color: "white",
                        }}
                      >
                        <Title
                          level={4}
                          style={{ color: "white", marginBottom: "8px" }}
                        >
                          {category.name}
                        </Title>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#d4a574",
                          }}
                        >
                          <Text style={{ color: "#d4a574" }}>Khám phá</Text>
                          <RightOutlined
                            style={{ marginLeft: "8px", color: "#d4a574" }}
                          />
                        </div>
                      </div>
                    </div>
                  }
                  bodyStyle={{ display: "none" }}
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                  onClick={() => navigate("/product-list")}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Title level={2} style={{ marginBottom: "16px" }}>
                Một số sản phẩm
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  color: "#666",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Những sản phẩm thủ công của cửa hàng
              </Paragraph>
            </div>
            <Button
              type="link"
              style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => navigate("/product-list")}
            >
              Xem tất cả
            </Button>
          </div>

          <div className="product-grid">
            {listProduct.slice(0, 4).map((item: any) => (
              <div key={item.id} className="product-card-wrapper">
                <Card
                  hoverable
                  className="modern-product-card"
                  cover={
                    <div className="product-image-container">
                      <img
                        alt={item.name}
                        src={
                          mainImageList[item.id]?.payload ||
                          "https://via.placeholder.com/300x300?text=No+Image" ||
                          "/placeholder.svg"
                        }
                        className="product-image"
                      />
                      {item.stockQuantity <= 5 && (
                        <Badge.Ribbon text="Sắp hết hàng" color="red" />
                      )}
                      {item.stockQuantity > 50 && (
                        <Badge.Ribbon text="Bán chạy" color="green" />
                      )}
                    </div>
                  }
                >
                  <div className="product-content">
                    <Meta
                      title={<div className="product-name">{item.name}</div>}
                      description={
                        <div className="product-price">
                          <span className="price-value">
                            {formatPrice(item.price)}₫
                          </span>
                        </div>
                      }
                    />

                    <div className="product-details">
                      <div className="product-info-row">
                        <span className="info-label">Mã sản phẩm:</span>
                        <span className="info-value">{item.code}</span>
                      </div>
                      <div className="product-info-row">
                        <span className="info-label">Tồn kho:</span>
                        <span
                          className={`stock-value ${
                            item.stockQuantity <= 5
                              ? "low-stock"
                              : item.stockQuantity > 50
                              ? "high-stock"
                              : "normal-stock"
                          }`}
                        >
                          {item.stockQuantity} sản phẩm
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#8b4513",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div
                style={{
                  height: "500px",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/12/2/769747/1.JPG"
                  alt="Nghệ nhân làng nghề"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Badge
                count="Câu chuyện của chúng tôi"
                style={{
                  backgroundColor: "#d4a574",
                  marginBottom: "24px",
                }}
              />
              <Title
                level={2}
                style={{
                  color: "white",
                  marginBottom: "24px",
                  fontSize: "2.5rem",
                }}
              >
                Gìn giữ và phát triển nghề thủ công truyền thống
              </Title>
              <Paragraph
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "16px",
                  marginBottom: "24px",
                }}
              >
                Chúng tôi là cầu nối giữa những nghệ nhân tài hoa và những người
                yêu thích đồ thủ công mỹ nghệ. Mỗi sản phẩm đều mang trong mình
                câu chuyện và tâm huyết của người nghệ nhân, được tạo ra từ đôi
                bàn tay khéo léo và trái tim đầy đam mê.
              </Paragraph>
              <Paragraph
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "16px",
                  marginBottom: "32px",
                }}
              >
                Với hơn 10 năm hoạt động, chúng tôi đã hợp tác với hơn 200 nghệ
                nhân từ khắp các làng nghề truyền thống trên cả nước, mang đến
                cho khách hàng những sản phẩm chất lượng cao, độc đáo và giàu
                giá trị văn hóa.
              </Paragraph>
              <Button
                size="large"
                ghost
                style={{
                  height: "50px",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "0 32px",
                }}
                onClick={() => navigate("/about")}
              >
                Tìm hiểu thêm
              </Button>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

// Sample data với hình ảnh thật từ internet
const categories = [
  {
    name: "Gốm sứ",
    slug: "gom-su",
    image:
      "https://gomsubattrang.vn/uploads/data/20/imgproducts/202008202261_88355.jpg",
  },
  {
    name: "Đồ gỗ mỹ nghệ",
    slug: "do-go-my-nghe",
    image:
      "https://dogogialinh.com/wp-content/uploads/2023/06/2A8DEDE0-AF3A-4340-B123-2ED563612E75-scaled.jpeg",
  },
  {
    name: "Tranh thêu",
    slug: "tranh-theu",
    image:
      "https://tanmydesign.com/uploaded/san-pham/Tranh%20th%C3%AAu/TMDA50327-1.jpg",
  },
  {
    name: "Mây tre đan",
    slug: "may-tre-dan",
    image:
      "https://maytretrungphuong.com/wp-content/uploads/2021/09/Khay-duoc-ket-hop-tu-hoa-tiet-mat-cao-va-hoa-tiet-ziczac-la-mat.png",
  },
];

// Sản phẩm thật từ giỏ hàng trước đó
const products = [
  {
    id: "prod12345678",
    name: "Áo Thun Cotton Premium",
    artisan: "Thương hiệu Việt Nam",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    reviews: 24,
  },
  {
    id: "prod23456789",
    name: "Quần Jeans Slim Fit",
    artisan: "Thời trang cao cấp",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isNew: false,
    reviews: 18,
  },
  {
    id: "prod34567890",
    name: "Giày Sneaker Thể Thao",
    artisan: "Thương hiệu quốc tế",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    reviews: 32,
  },
  {
    id: "prod45678901",
    name: "Túi Xách Da Thật",
    artisan: "Thủ công Việt Nam",
    price: 890000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isNew: false,
    reviews: 15,
  },
];

export default HomePage;
