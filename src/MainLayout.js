import {
    MessageOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {
    Button,
    Dropdown,
    FloatButton,
    Input,
    Layout,
    List,
    Menu,
    Modal
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserHook from "./main/login/index.ts";
import avatar from './picture/avatar.png';
import logo from './picture/logo.png';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState("home");
    const [collapsed, setCollapsed] = useState(false);

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
        </Layout>
    );
};

export default MainLayout;
