import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import useEditSubscibersHook from "./hooks/useEditSubscibersHook";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export const EditSubscriper = ({ initialValues, subscriberId }) => {
  const { editSubsciber } = useEditSubscibersHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue(initialValues);
    }
  }, [isModalVisible, initialValues, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsPending(true);
    try {
      await editSubsciber(subscriberId, values);
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Failed to edit FAQ.", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="Edit FAQ"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="email" name="email" rules={[{ required: true, message: "email is required." }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="is subscribed"
            name="isSubscribed"
            rules={[{ required: true, message: "is isSent is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">yes</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            Edit FAQ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
