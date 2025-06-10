"use client";
import {
  CheckCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  StarOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Timeline,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          background:
            'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Câu chuyện của AK General
          </Title>
          <Paragraph
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Hành trình 3 năm phát triển sản phẩm thủ công mỹ nghệ xuất khẩu
          </Paragraph>
        </div>
      </section>

      {/* Company Story */}
      <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title
                level={2}
                style={{ marginBottom: "24px", color: "#d4a574" }}
              >
                Khởi nguồn từ đam mê thủ công mỹ nghệ
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                Ngày 14/07/2021, Công Ty TNHH General AK chính thức được thành
                lập với mã số thuế 0316936902 dưới sự dẫn dắt của ông Huỳnh Công
                Khởi. Với trụ sở chính tại TP. Hồ Chí Minh và xưởng sản xuất tại
                tỉnh Bình Định, chúng tôi bắt đầu hành trình chuyên sản xuất các
                sản phẩm thủ công mỹ nghệ từ mây, tre, lục bình, kết hợp với các
                vật liệu khác như gỗ, nhựa, khung sắt, tôn, thiếc, gốm sứ.
              </Paragraph>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                Từ những ngày đầu thành lập, chúng tôi đã định hướng rõ ràng về
                việc phát triển sản phẩm chất lượng cao để xuất khẩu ra thị
                trường quốc tế. Với sự kết hợp giữa kỹ thuật sản xuất hiện đại
                và tay nghề thủ công truyền thống của các nghệ nhân địa phương,
                AK General đã nhanh chóng khẳng định vị thế trên thị trường.
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                Chỉ sau 3 năm hoạt động, chúng tôi đã xuất khẩu thành công sang
                các thị trường khó tính như Mỹ, Nhật Bản, Malaysia với sản lượng
                trung bình mỗi tháng trên 5.000 sản phẩm, đồng thời phục vụ thị
                trường nội địa với khoảng 200 sản phẩm mỗi tháng.
              </Paragraph>
            </Col>
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
                  alt="Nghệ nhân làm việc"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fef7e6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Sứ mệnh & Tầm nhìn
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Chúng tôi tin rằng mỗi sản phẩm thủ công đều mang trong mình một
              câu chuyện và giá trị văn hóa độc đáo
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  border: "2px solid #d4a574",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <HeartOutlined
                  style={{
                    fontSize: "48px",
                    color: "#d4a574",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={3}
                  style={{ color: "#d4a574", marginBottom: "16px" }}
                >
                  Sứ mệnh
                </Title>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                  Chuyên sản xuất và phân phối các sản phẩm thủ công mỹ nghệ
                  chất lượng cao từ nguyên liệu tự nhiên, mang sản phẩm Việt Nam
                  ra thế giới và tạo việc làm bền vững cho cộng đồng nghệ nhân
                  địa phương.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  border: "2px solid #d4a574",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <RocketOutlined
                  style={{
                    fontSize: "48px",
                    color: "#d4a574",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={3}
                  style={{ color: "#d4a574", marginBottom: "16px" }}
                >
                  Tầm nhìn
                </Title>
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                  Trở thành nhà sản xuất và xuất khẩu hàng đầu Việt Nam về sản
                  phẩm thủ công mỹ nghệ từ nguyên liệu tự nhiên, góp phần nâng
                  cao vị thế thương hiệu Việt Nam trên thị trường quốc tế.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Giá trị cốt lõi
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {coreValues.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      color: "#d4a574",
                      marginBottom: "20px",
                    }}
                  >
                    {value.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: "12px" }}>
                    {value.title}
                  </Title>
                  <Paragraph style={{ fontSize: "14px", color: "#666" }}>
                    {value.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fef7e6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Hành trình phát triển
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Những cột mốc quan trọng trong 10 năm phát triển của chúng tôi
            </Paragraph>
          </div>

          <Timeline
            mode="alternate"
            items={timelineData.map((item, index) => ({
              color: "#d4a574",
              children: (
                <Card style={{ borderRadius: "12px", marginBottom: "20px" }}>
                  <Title
                    level={4}
                    style={{ color: "#d4a574", marginBottom: "8px" }}
                  >
                    {item.year}
                  </Title>
                  <Title level={5} style={{ marginBottom: "8px" }}>
                    {item.title}
                  </Title>
                  <Paragraph
                    style={{ fontSize: "14px", color: "#666", marginBottom: 0 }}
                  >
                    {item.description}
                  </Paragraph>
                </Card>
              ),
            }))}
          />
        </div>
      </section>

      {/* Statistics */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#8b4513",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
              Thành tựu của chúng tôi
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Những con số ấn tượng sau 10 năm hoạt động
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {statistics.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "48px",
                      color: "#d4a574",
                      marginBottom: "16px",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <Statistic
                    title={
                      <span
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "16px",
                        }}
                      >
                        {stat.title}
                      </span>
                    }
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{
                      color: "white",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              Đội ngũ của chúng tôi
            </Title>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Những con người đam mê và tận tâm đằng sau thành công của chúng
              tôi
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "250px",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Title level={4} style={{ marginBottom: "8px" }}>
                    {member.name}
                  </Title>
                  <Text strong style={{ color: "#d4a574", fontSize: "16px" }}>
                    {member.position}
                  </Text>
                  <Paragraph
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginTop: "12px",
                    }}
                  >
                    {member.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fef7e6" }}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <Title level={2} style={{ marginBottom: "24px" }}>
            Cùng chúng tôi gìn giữ nghề thủ công truyền thống
          </Title>
          <Paragraph
            style={{ fontSize: "16px", color: "#666", marginBottom: "32px" }}
          >
            Hãy trở thành một phần trong hành trình bảo tồn và phát triển nghề
            thủ công Việt Nam. Mỗi sản phẩm bạn mua không chỉ là một món đồ đẹp,
            mà còn là sự ủng hộ cho nghệ nhân và văn hóa truyền thống.
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
              onClick={() => navigate("/product-list")}
            >
              Khám phá sản phẩm
            </Button>
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
              Liên hệ với chúng tôi
            </Button>
          </Space>
        </div>
        <Paragraph
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Liên hệ với chúng tôi tại website www.handmadeak.com, email
          akhandmade.info@gmail.com hoặc hotline 0935 360 733 để được tư vấn về
          các sản phẩm thủ công mỹ nghệ chất lượng cao.
        </Paragraph>
      </section>
    </div>
  );
};

// Data
const coreValues = [
  {
    icon: <CheckCircleOutlined />,
    title: "Chất lượng",
    description:
      "Cam kết mang đến những sản phẩm chất lượng cao nhất, được tuyển chọn kỹ lưỡng từ các nghệ nhân uy tín.",
  },
  {
    icon: <HeartOutlined />,
    title: "Tình yêu nghề",
    description:
      "Tôn trọng và trân trọng tình yêu, tâm huyết mà các nghệ nhân dành cho nghề thủ công truyền thống.",
  },
  {
    icon: <TeamOutlined />,
    title: "Hợp tác bền vững",
    description:
      "Xây dựng mối quan hệ hợp tác lâu dài, minh bạch và có lợi cho tất cả các bên liên quan.",
  },
  {
    icon: <GlobalOutlined />,
    title: "Đổi mới sáng tạo",
    description:
      "Không ngừng đổi mới trong cách thức kinh doanh để phát triển nghề thủ công trong thời đại mới.",
  },
];

const timelineData = [
  {
    year: "14/07/2021",
    title: "Thành lập công ty",
    description:
      "Công Ty TNHH General AK chính thức được thành lập với mã số thuế 0316936902, trụ sở chính tại TP. Hồ Chí Minh.",
  },
  {
    year: "2021-2022",
    title: "Xây dựng xưởng sản xuất",
    description:
      "Xây dựng xưởng sản xuất tại xã Cát Minh, huyện Phù Cát, tỉnh Bình Định, tập trung sản xuất sản phẩm từ mây, tre, lục bình.",
  },
  {
    year: "2022-2023",
    title: "Mở rộng xuất khẩu",
    description:
      "Mở rộng thị trường xuất khẩu sang Mỹ, Nhật Bản, Malaysia với sản lượng trung bình mỗi tháng trên 5.000 sản phẩm.",
  },
  {
    year: "2024",
    title: "Đa dạng hóa sản phẩm",
    description:
      "Mở rộng danh mục sản phẩm bao gồm balo cói, giỏ mây tre đan, thảm cói tự nhiên, túi xách lục bình.",
  },
];

const statistics = [
  {
    icon: <GlobalOutlined />,
    title: "Sản phẩm xuất khẩu/tháng",
    value: 5000,
    suffix: "+",
  },
  {
    icon: <EnvironmentOutlined />,
    title: "Thị trường xuất khẩu",
    value: 3,
    suffix: "",
  },
  {
    icon: <StarOutlined />,
    title: "Sản phẩm nội địa/tháng",
    value: 200,
    suffix: "+",
  },
  {
    icon: <TrophyOutlined />,
    title: "Năm hoạt động",
    value: 3,
    suffix: "",
  },
];

const teamMembers = [
  {
    name: "Huỳnh Công Khởi",
    position: "Giám đốc điều hành",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Người đại diện pháp luật và sáng lập viên của AK General, với tầm nhìn phát triển sản phẩm thủ công Việt Nam ra thị trường quốc tế.",
  },
  {
    name: "Trưởng phòng Sản xuất",
    position: "Quản lý sản xuất",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Chuyên gia về quy trình sản xuất thủ công, đảm bảo chất lượng sản phẩm từ nguyên liệu đến thành phẩm.",
  },
  {
    name: "Trưởng phòng Xuất khẩu",
    position: "Quản lý xuất khẩu",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Chuyên gia về thị trường quốc tế, phụ trách phát triển và duy trì mối quan hệ với các đối tác xuất khẩu.",
  },
];

export default AboutUs;
