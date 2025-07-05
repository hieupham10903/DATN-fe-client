import {
  CloseOutlined,
  LockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import UserHook from "./index.ts";

function ChangePassword({ handleCloseModal }) {
  const [form] = Form.useForm();

  const { userInfo, ChangePassword, changePasswordSuccess } = UserHook();

  const onFinish = (values) => {
    if (!userInfo?.username) return;
    ChangePassword({
      username: userInfo.username,
      password: values.oldPassword,
      newPassword: values.newPassword,
    });
  };

  useEffect(() => {
    if (changePasswordSuccess) {
      form.resetFields();
      handleCloseModal();
    }
  }, [changePasswordSuccess]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      name="change-password-form"
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Space>
          <Button
            className="ant-btn delete"
            icon={<CloseOutlined />}
            onClick={handleCloseModal}
          >
            Đóng
          </Button>
          <Button
            className="ant-btn new"
            htmlType="submit"
            type="primary"
            icon={<SettingOutlined />}
          >
            Đổi mật khẩu
          </Button>
        </Space>
      </Row>
    </Form>
  );
}

export default ChangePassword;
