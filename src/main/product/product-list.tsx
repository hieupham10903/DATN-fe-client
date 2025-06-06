import {
  DollarOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductHook from "./index.ts";

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
    pageSize: 10,
    sort: "code,asc",
    dataSearch: {},
  });

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [isReset, setReset] = useState(false);
  const [record, setRecord] = useState(undefined);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [mainImageList, setMainImageList] = useState({});

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

  useEffect(() => {
    listProduct.forEach((product: any) => {
      if (product.imageUrl && !mainImageList[product.id]) {
        GetMainImage(product.imageUrl).then((imageUrl) => {
          setMainImageList((prev) => ({ ...prev, [product.id]: imageUrl }));
        });
      }
    });
  }, [listProduct, mainImageList]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}
      >
        {listProduct.slice(0, 10).map((item: any) => (
          <div
            key={item.id}
            style={{
              width: "calc(20% - 13px)",
              minWidth: 220,
            }}
          >
            <Card
              hoverable
              cover={
                <img
                  alt={item.name}
                  src={mainImageList[item.id]?.payload}
                  style={{ height: 300, objectFit: "cover" }}
                />
              }
              actions={[
                <EyeOutlined
                  key="detail"
                  onClick={() => handleOpenDetail(item)}
                  style={{ fontSize: 24, padding: 8 }}
                />,
                <ShoppingCartOutlined
                  key="order"
                  onClick={() => console.log("Chỉnh sửa:", item)}
                  style={{ fontSize: 24, padding: 8 }}
                />,
                <DollarOutlined
                  key="buy"
                  onClick={() => console.log("Xóa:", item)}
                  style={{ fontSize: 24, padding: 8 }}
                />,
              ]}
            >
              <Meta
                title={<div style={{ textAlign: "center" }}>{item.name}</div>}
                description={
                  <div style={{ textAlign: "center" }}>
                    Giá: {item.price.toLocaleString()}₫
                  </div>
                }
              />
              <div
                style={{
                  marginTop: 8,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>Mã:</strong> {item.code}
                </div>
                <div>
                  <strong>Tồn kho:</strong> {item.stockQuantity}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalProduct}
          onChange={onChangePagination}
          showSizeChanger
          pageSizeOptions={["5", "10", "15"]}
        />
      </div>
    </>
  );
};

export default ProductList;
