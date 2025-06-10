import {
  DollarOutlined,
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Badge, Pagination, Tooltip } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  } = ProductHook();

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    sort: "code,asc",
    dataSearch: {},
  });

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [isReset, setReset] = useState(false);
  const [record, setRecord] = useState(undefined);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [mainImageList, setMainImageList] = useState({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const onChangePagination = (current, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
  };

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    updateSuccess && GetDataSearch(pagination);
  }, [updateSuccess]);

  const handleOpenDetail = (item) => {
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
  }, [listProduct, mainImageList]);

  const formatPrice = (price: number) => {
    return price?.toLocaleString() || "0";
  };

  return (
    <div className="product-list-container">
      {/* Header Section */}
      <div className="product-header">
        <h1 className="product-title">Danh sách sản phẩm</h1>
        <p className="product-subtitle">
          Khám phá những sản phẩm chất lượng cao
        </p>
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
                <Tooltip title="Thêm vào giỏ" key="cart">
                  <div
                    className="action-button cart-btn"
                    onClick={() => console.log("Thêm vào giỏ:", item)}
                  >
                    <ShoppingCartOutlined />
                    <span>Giỏ hàng</span>
                  </div>
                </Tooltip>,
                <Tooltip title="Mua ngay" key="buy">
                  <div
                    className="action-button buy-btn"
                    onClick={() => console.log("Mua ngay:", item)}
                  >
                    <DollarOutlined />
                    <span>Mua ngay</span>
                  </div>
                </Tooltip>,
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

                {/* Rating placeholder */}
                <div className="product-rating">
                  <StarFilled className="star-icon" />
                  <StarFilled className="star-icon" />
                  <StarFilled className="star-icon" />
                  <StarFilled className="star-icon" />
                  <StarFilled className="star-icon inactive" />
                  <span className="rating-text">(4.0)</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
