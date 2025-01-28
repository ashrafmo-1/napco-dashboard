import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import  { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useEditUserHook } from "./Hooks/useEditUserHook";
import { useGetSingleUserHook } from "./Hooks/useGetSingleUserHook";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {useSelectsHook} from "../../../hooks/useSelectsHook.jsx";

// eslint-disable-next-line react/prop-types
export const EditUser = ({ userId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { editUser } = useEditUserHook();
  const [loading, setLoading] = useState(false);
  const { type } = useSelectsHook();
  const { data } = useGetSingleUserHook(isModalVisible ? userId : null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setLoading(true);
    form.validateFields().then((values) => {
        editUser({ usersId: userId, values },{
            onSuccess: () => {
              setLoading(false);
              setIsModalVisible(false);
            },
            onError: (error) => {
              setLoading(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              }
            },
            onSettled: () => {
              setLoading(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setLoading(false);
        console.log('Validate Failed:', errorInfo);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        roleId: data.roleId,
        status: data.status !== undefined ? String(data.status) : "",
        address: data.address,
        description: data.description,
        password: ""
      });
    }
  }, [data, form]);

  return (
    <div>
      <Button className="edit border-green-900" outline="true" onClick={showModal}> <EditOutlined /> </Button>
      <Modal
        title="Edit Admin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required." }]}>
                <Input placeholder="Enter name" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Username" name="username" rules={[{ required: true, message: "User Name is required." }]}>
                <Input placeholder="Enter username" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter email" allowClear />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ pattern: /^[0-9]+$/, message: "Phone number must contain only numbers." }]}>
            <Input placeholder="Enter phone number" allowClear />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder="Enter address" allowClear />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status is required." }]}>
                <Select placeholder="Select status">
                  <Select.Option value="1">
                    <div className="flex items-center gap-1">
                      <span className="bg-green-600 p-1 rounded-full"></span>
                      <span>{t("globals.status.active")}</span>
                    </div>
                  </Select.Option>
                  <Select.Option value="0">
                    <div className="flex items-center gap-1">
                      <span className="bg-red-600 p-1 rounded-full"></span>
                      <span>{t("globals.status.inActive")}</span>
                    </div>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: "Role is required." }]}
              >
                <Select placeholder="Select role">
                  {type.map((item, index) => (
                    <Select.Option value={item.value} key={index}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="password"
            name="password"
          >
            <Input placeholder="change your password" allowClear />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            {t("globals.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
