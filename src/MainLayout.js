import {
  CloseOutlined,
  HistoryOutlined,
  MessageOutlined,
  MinusOutlined,
  RobotOutlined,
  SearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons"

import {
  Avatar,
  Badge,
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
  Row,
  Spin,
  Typography,
} from "antd"

import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserHook from "./main/login/index.ts"
import EmployeeUpdate from "./main/login/update-user-info.tsx"
import avatar from "./picture/avatar.png"
import logo from "./picture/logo.png"


const { Header, Content, Sider, Footer } = Layout
const { TextArea } = Input
const { Text } = Typography

const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const [selectedMenu, setSelectedMenu] = useState("home")
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { Logout, ChatBotReply } = UserHook()

  // Enhanced chatbot state
  const [chatVisible, setChatVisible] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý ảo của bạn. Bạn cần trợ giúp gì hôm nay? 😊",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Focus input when chat opens
  useEffect(() => {
    if (chatVisible && !chatMinimized && chatInputRef.current) {
      setTimeout(() => chatInputRef.current.focus(), 100)
    }
  }, [chatVisible, chatMinimized])

  const handleLogoClick = () => navigate("/")
  const handleLogout = () => Logout()

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <span onClick={() => handleOpenUpdate()}>Sửa thông tin</span>
      </Menu.Item>
      <Menu.Item key="order-history" icon={<HistoryOutlined />}>
        <span onClick={() => handleOpenOrderHistory()}>Lịch sử mua hàng</span>
      </Menu.Item>
      <Menu.Item key="logout" icon={<UserOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  const toggleChatModal = () => {
    setChatVisible(!chatVisible)
    setChatMinimized(false)
  }

  const minimizeChat = () => setChatMinimized(true)
  const maximizeChat = () => setChatMinimized(false)
  const closeChat = () => setChatVisible(false)

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return

    const userMessage = {
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    }

    // Add user message
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Add typing indicator
    const typingMessage = {
      role: "assistant",
      content: "Đang soạn tin nhắn...",
      timestamp: new Date(),
      isTyping: true,
    }
    setChatMessages((prev) => [...prev, typingMessage])

    try {
      const response = await ChatBotReply({ message: userMessage.content })

      // Simulate typing delay for better UX
      setTimeout(
        () => {
          setChatMessages((prev) => [
            ...prev.slice(0, -1), // Remove typing indicator
            {
              role: "assistant",
              content: response.payload.reply,
              timestamp: new Date(),
            },
          ])
          setIsTyping(false)
        },
        1000 + Math.random() * 1000,
      ) // Random delay between 1-2 seconds
    } catch (error) {
      console.error("Error:", error)
      setChatMessages((prev) => [
        ...prev.slice(0, -1), // Remove typing indicator
        {
          role: "assistant",
          content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau. 😔",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const generateBreadcrumb = () => {
    const pathSnippets = location.pathname.split("/").filter((i) => i)
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Trang chủ</Link>
      </Breadcrumb.Item>,
    ]

    if (pathSnippets.length === 2 && pathSnippets[0] === "product") {
      breadcrumbItems.push(
        <Breadcrumb.Item key="product-list">
          <Link to="/product-list">Danh sách sản phẩm</Link>
        </Breadcrumb.Item>,
      )
      breadcrumbItems.push(<Breadcrumb.Item key="product-detail">Chi tiết sản phẩm</Breadcrumb.Item>)
      return breadcrumbItems
    }

    const pathNameMap = {
      about: "Giới thiệu",
      "product-list": "Danh sách sản phẩm",
      profile: "Sửa thông tin",
    }

    pathSnippets.forEach((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`
      const name = pathNameMap[snippet] || decodeURIComponent(snippet)
      breadcrumbItems.push(
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>,
      )
    })

    return breadcrumbItems
  }

  const handleOpenUpdate = () => setVisibleUpdate(true)
  const handleCloseUpdate = () => setVisibleUpdate(false)

  const handleOpenOrderHistory = () => {
    navigate("/order-history")
  }

  const handleEnter = () => {
    navigate("/product-list", { state: { name: searchValue.trim() } })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const TypingIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#1890ff",
          borderRadius: "50%",
          animation: "bounce 1.4s ease-in-out infinite both",
        }}
      />
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#1890ff",
          borderRadius: "50%",
          animation: "bounce 1.4s ease-in-out 0.16s infinite both",
        }}
      />
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#1890ff",
          borderRadius: "50%",
          animation: "bounce 1.4s ease-in-out 0.32s infinite both",
        }}
      />
    </div>
  )

  return (
    <>
      {/* CSS Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* Update Modal */}
      <Modal title="Chỉnh sửa thông tin" onCancel={handleCloseUpdate} width={1500} open={visibleUpdate} footer={null}>
        <EmployeeUpdate handleCloseModal={handleCloseUpdate} />
      </Modal>

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
            <img src={logo || "/placeholder.svg"} alt="Logo" style={{ width: 80, height: 80 }} />
          </div>

          <div style={{ flex: 1, padding: "0 20px" }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={handleEnter}
              onClear={handleEnter}
              allowClear
              style={{ width: "100%", borderRadius: 8 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ShoppingCartOutlined
              style={{ fontSize: 24, color: "#fff", cursor: "pointer" }}
              onClick={() => navigate("/order-list")}
            />

            <Dropdown overlay={menu} trigger={["hover"]}>
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
                  cursor: "pointer",
                }}
              >
                <img
                  src={avatar || "/placeholder.svg"}
                  alt="Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Dropdown>
          </div>
        </Header>

        <Layout style={{ marginTop: 64 }}>
          <Sider width={200} collapsed={collapsed} onCollapse={setCollapsed}>
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
            <Breadcrumb style={{ marginBottom: 16 }}>{generateBreadcrumb()}</Breadcrumb>
            {children}
          </Content>
        </Layout>

        {/* Enhanced Float Button */}
        <Badge dot={chatMessages.length > 1} offset={[-8, 8]}>
          <FloatButton
            icon={<MessageOutlined />}
            type="primary"
            tooltip="Chat trợ lý"
            onClick={toggleChatModal}
            style={{
              width: 60,
              height: 60,
              fontSize: 24,
              boxShadow: "0 4px 12px rgba(24, 144, 255, 0.4)",
            }}
          />
        </Badge>

        {/* Enhanced Chat Modal */}
        {chatVisible && (
          <div
            style={{
              position: "fixed",
              bottom: 100,
              right: 30,
              width: 380,
              height: chatMinimized ? 60 : 520,
              backgroundColor: "white",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid #f0f0f0",
              zIndex: 1001,
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                color: "white",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Badge dot color="#52c41a" offset={[-4, 4]}>
                  <Avatar
                    icon={<RobotOutlined />}
                    style={{
                      backgroundColor: "#fff",
                      color: "#1890ff",
                      border: "2px solid rgba(255,255,255,0.3)",
                    }}
                    size="small"
                  />
                </Badge>
                <div>
                  <Text strong style={{ color: "white", fontSize: 14 }}>
                    Trợ lý ảo
                  </Text>
                  <div style={{ fontSize: 11, opacity: 0.9 }}>Đang hoạt động</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  size="small"
                  onClick={chatMinimized ? maximizeChat : minimizeChat}
                  style={{ color: "white", border: "none" }}
                />
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={closeChat}
                  style={{ color: "white", border: "none" }}
                />
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Messages Area */}
                <div
                  style={{
                    height: 360,
                    overflowY: "auto",
                    padding: "16px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <List
                    dataSource={chatMessages}
                    renderItem={(message, index) => (
                      <List.Item
                        key={index}
                        style={{
                          border: "none",
                          padding: "8px 0",
                          justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            maxWidth: "85%",
                            flexDirection: message.role === "user" ? "row-reverse" : "row",
                          }}
                        >
                          <Avatar
                            icon={message.role === "user" ? <UserOutlined /> : <RobotOutlined />}
                            size="small"
                            style={{
                              backgroundColor: message.role === "user" ? "#1890ff" : "#52c41a",
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              backgroundColor: message.role === "user" ? "#1890ff" : "white",
                              color: message.role === "user" ? "white" : "#333",
                              padding: "12px 16px",
                              borderRadius: 16,
                              borderBottomRightRadius: message.role === "user" ? 4 : 16,
                              borderBottomLeftRadius: message.role === "user" ? 16 : 4,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              position: "relative",
                              animation: "slideIn 0.3s ease",
                            }}
                          >
                            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                              {message.isTyping ? <TypingIndicator /> : message.content}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                opacity: 0.7,
                                marginTop: 4,
                                textAlign: message.role === "user" ? "right" : "left",
                              }}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "white",
                    borderTop: "1px solid #f0f0f0",
                    borderRadius: "0 0 16px 16px",
                  }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                    <TextArea
                      ref={chatInputRef}
                      placeholder="Nhập tin nhắn của bạn..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onPressEnter={handleKeyPress}
                      disabled={isTyping}
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      style={{
                        flex: 1,
                        borderRadius: 20,
                        resize: "none",
                        border: "1px solid #d9d9d9",
                      }}
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isTyping}
                      style={{
                        borderRadius: 20,
                        height: 32,
                        width: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                      }}
                    />
                  </div>
                  {isTyping && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 8,
                        fontSize: 12,
                        color: "#999",
                      }}
                    >
                      <Spin size="small" />
                      Trợ lý đang soạn tin nhắn...
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <Footer style={{ background: "#c18a60", color: "#f5f0e6", padding: "40px 60px" }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <h3 style={{ color: "#ffffff" }}>Thông tin doanh nghiệp</h3>
              <img src="logo_ak.png" alt="Logo AK" style={{ height: 50, margin: "10px 0" }} />
              <p>
                <strong>Công Ty TNHH General AK</strong>
              </p>
              <p>Mã số thuế: 0316936902</p>
              <p>VP: 96/17 Đường 18B, P. Bình Hưng Hòa A, Q. Bình Tân, Tp HCM</p>
              <p>XSX: Đường DT633 Cát Minh Phù Cát, Bình Định</p>
              <p>Điện thoại: 0935 360 738</p>
              <p>
                Mail:{" "}
                <a href="mailto:akhandmade.info@gmail.com" style={{ color: "#ffe7c4" }}>
                  akhandmade.info@gmail.com
                </a>
              </p>
            </Col>

            <Col xs={24} md={16}>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={8}>
                  <h4 style={{ color: "#ffffff" }}>Giới thiệu</h4>
                  <ul style={{ padding: 0, listStyle: "none" }}>
                    {["Về HandmadeAk", "Liên hệ", "Tuyển dụng"].map((item) => (
                      <li key={item}>
                        <a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <h4 style={{ color: "#ffffff", marginTop: 16 }}>Giờ làm việc</h4>
                  <p style={{ margin: 0, color: "#f5f0e6" }}>Thứ 2 - Thứ 7: 8:00 - 17:00</p>
                </Col>
                <Col xs={12} sm={8}>
                  <h4 style={{ color: "#ffffff" }}>Sản phẩm</h4>
                  <ul style={{ padding: 0, listStyle: "none" }}>
                    {["Nhóm tre", "Nhóm cói", "Nhóm lá buông", "Nhóm lục bình", "Nhóm mây tre"].map((item) => (
                      <li key={item}>
                        <a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <h4 style={{ color: "#ffffff", marginTop: 16 }}>Bài viết nổi bật</h4>
                </Col>
                <Col xs={12} sm={8}>
                  <h4 style={{ color: "#ffffff" }}>Chính sách</h4>
                  <ul style={{ padding: 0, listStyle: "none" }}>
                    {[
                      "Chính sách bảo mật",
                      "Chính sách vận chuyển",
                      "Chính sách đổi trả",
                      "Chính sách bảo hành",
                      "Chính sách thanh toán",
                    ].map((item) => (
                      <li key={item}>
                        <a href="#" style={{ color: "#ffe7c4", textDecoration: "none" }}>
                          {item}
                        </a>
                      </li>
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
    </>
  )
}

export default MainLayout
