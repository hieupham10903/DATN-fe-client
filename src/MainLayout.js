import {
    MessageOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Col,
    Dropdown,
    FloatButton,
    Input,
    Layout,
    List,
    Menu,
    Modal,
    Row
} from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserHook from "./main/login/index.ts";
import avatar from './picture/avatar.png';
import logo from './picture/logo.png';

const { Header, Content, Sider, Footer } = Layout;

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState("home");
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { Logout, ChatBotReply } = UserHook();

    const handleLogoClick = () => navigate('/');

    const handleLogout = () => Logout();

    const menu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/profile">Sửa thông tin</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const [chatVisible, setChatVisible] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState([{ role: "assistant", content: "Xin chào, bạn cần trợ giúp gì?" }]);

    const toggleChatModal = () => setChatVisible(!chatVisible);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        ChatBotReply({ message: chatInput }).then((data) => {
            const botReply = data.payload.reply;

            const newMessages = [
                ...chatMessages,
                { role: "user", content: chatInput },
                { role: "assistant", content: "Đang xử lý..." },
            ];
            setChatMessages(newMessages);
            setChatInput("");

            setTimeout(() => {
                setChatMessages((prev) => [
                    ...prev.slice(0, -1),
                    { role: "assistant", content: botReply },
                ]);
            }, 800);
        }).catch((error) => console.error("Error:", error));
    };

    const pathNameMap = {
        "about": "Giới thiệu",
        "product-list": "Danh sách sản phẩm",
        "product": "Chi tiết sản phẩm",
        "profile": "Sửa thông tin",
    };

    const generateBreadcrumb = () => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>,
        ];

        if (pathSnippets.length === 2 && pathSnippets[0] === "product") {
            breadcrumbItems.push(
                <Breadcrumb.Item key="product-list">
                    <Link to="/product-list">Danh sách sản phẩm</Link>
                </Breadcrumb.Item>
            );
            breadcrumbItems.push(
                <Breadcrumb.Item key="product-detail">
                    Chi tiết sản phẩm
                </Breadcrumb.Item>
            );
            return breadcrumbItems;
        }

        // Với các trang khác dùng cách cũ
        const pathNameMap = {
            "about": "Giới thiệu",
            "product-list": "Danh sách sản phẩm",
            "profile": "Sửa thông tin",
        };

        pathSnippets.forEach((snippet, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const name = pathNameMap[snippet] || decodeURIComponent(snippet);
            breadcrumbItems.push(
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{name}</Link>
                </Breadcrumb.Item>
            );
        });

        return breadcrumbItems;
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "fixed",
                    width: "100%",
                    zIndex: 1000,
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div onClick={handleLogoClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="Logo" style={{ width: 80, height: 80 }} />
                </div>

                <div style={{ flex: 1, padding: "0 20px" }}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm..."
                        style={{ width: "100%", borderRadius: 8 }}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ShoppingCartOutlined style={{ fontSize: 24, color: "#fff", cursor: "pointer" }} />
                    <Dropdown overlay={menu} trigger={['hover']}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                border: "2px solid #fff",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                        >
                            <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    </Dropdown>
                </div>
            </Header>

            <Layout style={{ marginTop: 64 }}>
                <Sider
                    width={200}
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedMenu]}
                        onClick={({ key }) => setSelectedMenu(key)}
                        style={{ height: "100%", paddingTop: 20 }}
                    >
                        <Menu.Item key="home">
                            <Link to="/">Trang chủ</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about">Giới thiệu</Link>
                        </Menu.Item>
                        <Menu.Item key="products">
                            <Link to="/product-list">Danh sách sản phẩm</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Content style={{ padding: "20px", minHeight: "calc(100vh - 64px)" }}>
                    <Breadcrumb style={{ marginBottom: 16 }}>
                        {generateBreadcrumb()}
                    </Breadcrumb>
                    {children}
                </Content>
            </Layout>

            <FloatButton
                icon={<MessageOutlined />}
                type="primary"
                tooltip="Chat trợ lý"
                onClick={toggleChatModal}
            />

            <Modal
                open={chatVisible}
                onCancel={toggleChatModal}
                footer={null}
                width={350}
                closable
                mask={false}
                style={{
                    position: "fixed",
                    bottom: 100,
                    right: 30,
                    top: "auto",
                    margin: 0,
                    padding: 0,
                    transform: "none",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    borderRadius: 12,
                    overflow: "hidden"
                }}
                bodyStyle={{
                    maxHeight: 400,
                    overflowY: "auto",
                    position: "relative",
                }}
                title="Trợ lý ảo"
            >
                <List
                    dataSource={chatMessages}
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
                            style={{
                                justifyContent: item.role === "user" ? "flex-end" : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: 16,
                                    maxWidth: "80%",
                                }}
                            >

                                {item.content}
                            </div>
                        </List.Item>
                    )}
                />

                <div style={{
                    position: "sticky",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "white",
                    padding: "10px",
                    zIndex: 1,
                }}>
                    <Input.TextArea
                        rows={2}
                        placeholder="Nhập tin nhắn..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        type="primary"
                        style={{ marginTop: 8, width: "100%" }}
                        onClick={handleSendMessage}
                    >
                        Gửi
                    </Button>
                </div>
            </Modal>
            <Footer style={{ background: "#c18a60", color: "#f5f0e6", padding: "40px 60px" }}>
                <Row gutter={[24, 24]}>
                    {/* Cột 1: Thông tin doanh nghiệp */}
                    <Col xs={24} md={8}>
                    <h3 style={{ color: "#ffffff" }}>Thông tin doanh nghiệp</h3>
                    <img src="logo_ak.png" alt="Logo AK" style={{ height: 50, margin: "10px 0" }} />
                    <p><strong>Công Ty TNHH General AK</strong></p>
                    <p>Mã số thuế: 0316936902</p>
                    <p>VP: 96/17 Đường 18B, P. Bình Hưng Hòa A, Q. Bình Tân, Tp HCM</p>
                    <p>XSX: Đường DT633 Cát Minh Phù Cát, Bình Định</p>
                    <p>Điện thoại: 0935 360 738</p>
                    <p>Mail: <a href="mailto:akhandmade.info@gmail.com" style={{ color: "#ffe7c4" }}>akhandmade.info@gmail.com</a></p>
                    </Col>

                    {/* Cột 2: Các nhóm thông tin */}
                    <Col xs={24} md={16}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={8}>
                        <h4 style={{ color: "#ffffff" }}>Giới thiệu</h4>
                        <ul style={{ padding: 0, listStyle: "none" }}>
                            {["Về HandmadeAk", "Liên hệ", "Tuyển dụng"].map(item => (
                            <li key={item}><a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>{item}</a></li>
                            ))}
                        </ul>
                        <h4 style={{ color: "#ffffff", marginTop: 16 }}>Giờ làm việc</h4>
                        <p style={{ margin: 0, color: "#f5f0e6" }}>
                            Thứ 2 - Thứ 7: 8:00 - 17:00
                        </p>
                        </Col>

                        <Col xs={12} sm={8}>
                        <h4 style={{ color: "#ffffff" }}>Sản phẩm</h4>
                        <ul style={{ padding: 0, listStyle: "none" }}>
                            {["Nhóm tre", "Nhóm cói", "Nhóm lá buông", "Nhóm lục bình", "Nhóm mây tre"].map(item => (
                            <li key={item}><a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>{item}</a></li>
                            ))}
                        </ul>

                        <h4 style={{ color: "#ffffff", marginTop: 16 }}>Bài viết nổi bật</h4>
                        </Col>

                        <Col xs={12} sm={8}>
                        <h4 style={{ color: "#ffffff" }}>Chính sách</h4>
                        <ul style={{ padding: 0, listStyle: "none" }}>
                            {[
                            "Chính sách bảo mật", "Chính sách vận chuyển",
                            "Chính sách đổi trả", "Chính sách bảo hành", "Chính sách thanh toán"
                            ].map(item => (
                            <li key={item}><a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>{item}</a></li>
                            ))}
                        </ul>

                        <h4 style={{ color: "#ffffff", marginTop: 16 }}>Đăng ký email</h4>
                        <p style={{ color: "#f5f0e6" }}>
                            Nhận khuyến mãi, voucher và các bài viết hay về nội thất hàng tháng.
                        </p>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default MainLayout;
