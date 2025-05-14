import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Pagination, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { gender, role } from "../common/constant.ts";
import { ObjectTypeEmployee } from "../common/data-search.ts";
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

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sort: "code,asc",
    dataSearch: {},
  });

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [isReset, setReset] = useState(false);
  const [record, setRecord] = useState(undefined);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [mainImageList, setMainImageList] = useState<any>({});

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

  useEffect(() => {
    if (ObjectTypeEmployee[searchField] === "select") {
      if (searchField === "gender") {
        setOptions(
          Object.keys(gender).map((key) => ({
            value: key,
            label: gender[key],
          }))
        );
      } else if (searchField === "role") {
        setOptions(
          Object.keys(role).map((key) => ({
            value: key,
            label: role[key],
          }))
        );
      }
    } else {
      setOptions([]);
    }
  }, [searchField]);

  const handleChangeSearch = (value) => {
    setSearchField(value);
    setSearchText("");
  };

  const handleSearch = () => {
    const searchCriteria = {
      [searchField]: {
        [ObjectTypeEmployee[searchField] === "text" ? "contains" : "equals"]:
          searchText,
      },
    };

    setPagination((prev) => ({
      ...prev,
      current: 1,
      dataSearch: searchCriteria,
    }));
  };

  const handleOpenCreate = () => {
    setVisibleCreate(true);
    setReset(!isReset);
  };

  const handleCloseCreate = () => {
    setVisibleCreate(false);
    setReset(!isReset);
  };

  const handleOpenDetail = (record) => {
    setVisibleDetail(true);
    setReset(!isReset);
    setRecord(record);
  };

  const handleCloseDetail = () => {
    setVisibleDetail(false);
    setReset(!isReset);
    ResetProductState();
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

  console.log("mainImageList", mainImageList);

  return (
    <>
      <Row gutter={[16, 16]}>
        {listProduct.map((item: any) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.name}
                  src={mainImageList[item.id]?.payload}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                <EyeOutlined
                  key="detail"
                  onClick={() => handleOpenDetail(item)}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => console.log("Chỉnh sửa:", item)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => console.log("Xóa:", item)}
                />,
              ]}
            >
              <Meta
                title={item.name}
                description={`Giá: ${item.price.toLocaleString()}₫`}
              />
              <div style={{ marginTop: 8 }}>
                <div>
                  <strong>Mã:</strong> {item.code}
                </div>
                <div>
                  <strong>Tồn kho:</strong> {item.stockQuantity}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

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
