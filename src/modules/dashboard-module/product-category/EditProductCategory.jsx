import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Select,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useEditProductCategoryHook } from "./hooks/useEditProductCategoryHook";
import { useGetProductCategory } from "./hooks/useGetProductCategory";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export const EditProductCategory = ({ productCategoryId }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { editProductCategory } = useEditProductCategoryHook();
  const { data } = useGetProductCategory(productCategoryId);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
        setLoading(true);
        editProductCategory({ productCategoryId: productCategoryId, values },{
            onSuccess: () => {
              setIsModalVisible(false);
            },
            onError: (error) => {
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(`${field} ${msg}`);
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
        console.log('Validate Failed:', errorInfo);
      });
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
        <Button className="edit" onClick={showModal}>
          <EditOutlined />
        </Button>

      <Modal
        title={t("productCategory.edit.title")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("productCategory.add.lables.nameEN")}
                name="nameEn"
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="name arabic" name="nameAr">
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label={t("globals.status.checkActive")} name="isActive">
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

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("productCategory.edit.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
