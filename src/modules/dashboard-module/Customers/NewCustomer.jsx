import { Button, Col, Form, Input, Modal, Row } from "antd";
import  { useState } from "react";
import { useAddCustomerHook } from "./Hooks/useAddCustomerHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

export const AddNewCustomer = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addNewCustomer } = useAddCustomerHook();
  const [isPending, setIsPending] = useState(false);

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
        addNewCustomer(formData, {
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
              toast.error(errorMessage || "Failed to add customer.");
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
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled /> {t("customers.add")}
        </Button>

      <Modal
        title={t("customers.add")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("customers.name")}
                name="name"
                rules={[{ required: true, message: "Name is required." }]}
              >
                <Input
                  placeholder={t("customers.placeholder.EnterName")}
                  allowClear
                />
              </Form.Item>
            </Col>
            {/* // { required: true, message: "Email is required." }, */}
            <Col span={12}>
              <Form.Item
                label={t("customers.email")}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                ]}
              >
                <Input
                  placeholder={t("customers.placeholder.EnterEmail")}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={t("customers.phone")}
            name="phone"
            rules={[
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must contain only numbers.",
              },
            ]}
          >
            <Input
              placeholder={t("customers.placeholder.EnterPhone")}
              allowClear
            />
          </Form.Item>
          <Form.Item label={t("customers.address")} name="address">
            <Input
              placeholder={t("customers.placeholder.EnterAddress")}
              allowClear
            />
          </Form.Item>
          <Form.Item label={t("customers.description")} name="description">
            <TextArea
              placeholder={t("customers.placeholder.EnterDescriptoin")}
              aria-label="description"
              allowClear
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={isPending}
          >
            {t("customers.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
