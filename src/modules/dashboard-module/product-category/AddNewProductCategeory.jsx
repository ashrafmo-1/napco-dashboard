import { PlusSquareFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useState } from "react";
// import { checkPermission } from "../../helpers/checkPermission";
import { useAddProductCategoryHook } from "./hooks/useAddProductCategoryHook";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const AddNewProductCategeory = () => {
  const { t } = useTranslation();
  const { addProductCategory } = useAddProductCategoryHook();
  // const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields()
      .then((formData) => {
        addProductCategory(formData, {
          onSuccess: () => {
            setIsPending(false);
            handleCancel();
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              for (const [ messages ] of Object.entries(errorMessage)) {
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
        console.log('Validate Failed:', errorInfo);
      });
  };

  return (
    <div>
      {/*{hasCreateUserPermission && (*/}
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled />
          {t("productCategory.add.title")}
        </Button>
      {/*// )}*/}

      <Modal
        title={t("productCategory.add.title")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ isActive: "1" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("productCategory.add.lables.nameEN")}
                name="nameEn"
                rules={[
                  {
                    required: true,
                    message:
                      t("productCategory.add.lables.nameEN") + " is required.",
                  },
                ]}
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("productCategory.add.lables.nameAR")}
                name="nameAr"
                rules={[
                  {
                    required: true,
                    message: t("lables.nameAR") + " is required.",
                  },
                ]}
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("globals.status.checkActive")}
            name="isActive"
            rules={[
              {
                required: true,
                message:
                  t("productCategory.add.lables.isActive") + " is required.",
              },
            ]}
          >
            <Select placeholder={t("globals.status.checkActive")}>
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

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          >
            {t("productCategory.add.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
