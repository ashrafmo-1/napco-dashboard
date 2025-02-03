import React, { useState } from "react";
import { Modal, Button, Form, Input, Col, Select, Row } from "antd";
import { PlusSquareFilled } from "@ant-design/icons";
import { useAddUserHook } from "./Hooks/useAddUserHook";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelectsHook } from "../../../hooks/useSelectsHook.jsx";

export const AddNewUser = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  // const hasCreateUserPermission = checkPermission("create_user");
  const { addNewUser } = useAddUserHook();
  const { type } = useSelectsHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setIsPending(true);
    form
      .validateFields()
      .then((formData) => {
        addNewUser(formData, {
          onSuccess: () => {
            setIsPending(false);
            handleCancel();
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              for (const [messages] of Object.entries(errorMessage)) {
                messages.forEach((msg) => {
                  toast.error(msg);
                });
              }
            } else {
              toast.error(errorMessage || "Failed to add user.");
            }
          },
        });
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  return (
    <div>
      {/*{hasCreateUserPermission ? (*/}
      <React.Fragment>
        <Button type="primary" onClick={showModal}>
          {" "}
          <PlusSquareFilled /> {t("users.add")}{" "}
        </Button>

        <Modal
          title={t("users.add")}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ status: "1" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Name is required." }]}
                >
                  <Input placeholder="Enter name" allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Username is required." }]}
                >
                  <Input placeholder="Enter username" allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter email" allowClear />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Phone number must contain only numbers.",
                },
              ]}
            >
              <Input placeholder="Enter phone number" allowClear />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter address" allowClear />
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  initialValue={"1"}
                  rules={[{ required: true, message: "Status is required." }]}
                >
                  <Select placeholder="Select status" defaultValue="1">
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
                  initialValue={type[0]?.value}
                  name="roleId"
                  rules={[{ required: true, message: "Role is required." }]}
                >
                  <Select placeholder="Select role" >
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
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required." }]}
            >
              <Input.Password placeholder="Enter password" allowClear />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
            >
              {t("users.add")}
            </Button>
          </Form>
        </Modal>
      </React.Fragment>
      {/*) : null}*/}
    </div>
  );
};
