"use client";

import {
  EyeOutlined,
  FilterOutlined,
  HeartOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Pagination,
  Row,
  Select,
  Slider,
  Tooltip,
} from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductHook from "./index.ts";
import "./product.css";

const ProductList = () => {
  const {
    GetDataSearch,
    listProduct,
    totalProduct,
    updateSuccess,
    ResetProductState,
    GetMainImage,
    mainImage,
    GetAllCategory,
    listAllCategory,
  } = ProductHook();

  const navigate = useNavigate();

  const location = useLocation();
  const name = location.state?.name || "";

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    sort: "code,asc",
    dataSearch: {},
  });

  useEffect(() => {
    const newDataSearch = name?.trim()
      ? { name: { contains: name.trim() } }
      : {};

    setPagination((prev) => ({
      ...prev,
      dataSearch: newDataSearch,
    }));
  }, [name]);

  const [mainImageList, setMainImageList] = useState({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const onChangePagination = (current, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
  };

  useEffect(() => {
    GetAllCategory();
  }, []);

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    updateSuccess && GetDataSearch(pagination);
  }, [updateSuccess]);

  const handleOpenDetail = (item) => {
    ResetProductState();
    navigate(`/product/${item.id}`);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    listProduct.forEach((product: any) => {
      if (product.imageUrl && !mainImageList[product.id]) {
        GetMainImage(product.imageUrl).then((imageUrl) => {
          setMainImageList((prev) => ({ ...prev, [product.id]: imageUrl }));
        });
      }
    });
  }, [listProduct]);

  const formatPrice = (price: number) => {
    return price?.toLocaleString() || "0";
  };

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
      pageSize: 6,
      dataSearch: {
        ...pagination.dataSearch,
        categoryId: {
          equals: selectedCategory,
        },
        price: {
          greaterThanOrEqual: priceRange?.[0],
          lessThanOrEqual: priceRange?.[1],
        },
      },
    }));
  };

  return (
    <div className="product-list-container">
      {/* Header Section */}
      <div className="product-header">
        {name === "" ? (
          <h1 className="product-title">Danh sách sản phẩm</h1>
        ) : (
          <h1 className="product-title">
            Danh sách sản phẩm có tên là "{name}"
          </h1>
        )}
        <p className="product-subtitle">
          Khám phá những sản phẩm chất lượng cao
        </p>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <div className="filter-item">
              <label className="filter-label">Danh mục sản phẩm</label>
              <Select
                placeholder="Chọn danh mục"
                style={{ width: "100%" }}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                }}
                allowClear
                options={listAllCategory.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              ></Select>
            </div>
          </Col>

          <Col xs={24} sm={12} md={10}>
            <div className="filter-item">
              <label className="filter-label">
                Khoảng giá: {priceRange[0].toLocaleString()}₫ -{" "}
                {priceRange[1].toLocaleString()}₫
              </label>
              <Slider
                range
                min={0}
                max={10000000}
                step={100000}
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value);
                  // TODO: Implement price range filter logic
                }}
                tooltip={{
                  formatter: (value) => `${value?.toLocaleString()}₫`,
                }}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={6}>
            <div className="filter-actions">
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={() => {
                  handleSearch();
                }}
                className="filter-btn"
              >
                Áp dụng
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 10000000]);
                  // TODO: Implement reset filter logic
                }}
                className="reset-btn"
              >
                Đặt lại
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {listProduct.slice(0, 12).map((item: any) => (
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
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <Tooltip title="Thêm vào yêu thích">
                      <HeartOutlined
                        className={`favorite-btn ${
                          favorites.includes(item.id) ? "favorited" : ""
                        }`}
                        onClick={() => toggleFavorite(item.id)}
                      />
                    </Tooltip>
                  </div>
                  {item.stockQuantity <= 5 && (
                    <Badge.Ribbon text="Sắp hết hàng" color="red" />
                  )}
                  {item.stockQuantity > 50 && (
                    <Badge.Ribbon text="Bán chạy" color="green" />
                  )}
                </div>
              }
              actions={[
                <Tooltip title="Xem chi tiết" key="detail">
                  <div
                    className="action-button view-btn"
                    onClick={() => handleOpenDetail(item)}
                  >
                    <EyeOutlined />
                    <span>Xem</span>
                  </div>
                </Tooltip>,
                // <Tooltip title="Thêm vào giỏ" key="cart">
                //   <div
                //     className="action-button cart-btn"
                //     onClick={() => console.log("Thêm vào giỏ:", item)}
                //   >
                //     <ShoppingCartOutlined />
                //     <span>Giỏ hàng</span>
                //   </div>
                // </Tooltip>,
                // <Tooltip title="Mua ngay" key="buy">
                //   <div
                //     className="action-button buy-btn"
                //     onClick={() => console.log("Mua ngay:", item)}
                //   >
                //     <DollarOutlined />
                //     <span>Mua ngay</span>
                //   </div>
                // </Tooltip>,
              ]}
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

      <div className="pagination-container">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalProduct}
          onChange={onChangePagination}
          showSizeChanger
          pageSizeOptions={["6", "12", "18", "24"]}
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} của ${total} sản phẩm`
          }
          className="modern-pagination"
        />
      </div>
    </div>
  );
};

export default ProductList;
