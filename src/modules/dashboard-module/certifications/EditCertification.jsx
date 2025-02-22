import { Button, Form, Modal, Select, Upload } from "antd";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Title } from "../../../common/modules/create-edit/Title.jsx";
import { Description } from "../../../common/modules/create-edit/Description.jsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useEditCertificationHook } from "./hooks/useEditCertificationHook.js";
import PropTypes from "prop-types";
import { useGetSingleCertificationHook } from "./hooks/useGetSingleCertificationHook.js";

export const EditCertification = ({ certificationId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { editCertification } = useEditCertificationHook();
  const { data } = useGetSingleCertificationHook(certificationId);

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
      .then((values) => {
        const formData = new FormData();
        if (values.image && values.image[0]?.originFileObj) {
          formData.append("image", values.image[0].originFileObj);
        } else {
          formData.append("image", "");
        }

        formData.append("titleEn", values.titleEn || "");
        formData.append("titleAr", values.titleAr || "");
        formData.append("descriptionAr", values.descriptionAr || "");
        formData.append("descriptionEn", values.descriptionEn || "");
        formData.append("isPublished", values.isPublished || "0");
        formData.append("_method", "PUT");

        editCertification(
          { certificationId: certificationId, formData },
          {
            onSuccess: () => {
              setIsPending(false);
              handleCancel();
            },
            onError: (error) => {
              setIsPending(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              } else {
                toast.error(errorMessage || "Failed to edit blog.");
              }
            },
            onSettled: () => {
              setIsPending(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        image: data.image ? [{ uid: '-1', url: data.image, name: 'image.png', status: 'done' }] : [],
        isPublished: data.isPublished !== undefined ? String(data.isPublished) : "",
      });
    }
  }, [data, form, isModalVisible]);

  const handleChange = ({ fileList }) => {
    form.setFieldsValue({ image: fileList });
  };

  return (
    <div>
      <Button onClick={showModal} className="text-green-800">
        <EditFilled />
      </Button>

      <Modal
        title={t("blogCategory.add")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title
            LabletitleAr={"arabic title"}
            LabletitleEn={"english title"}
          />
          <Description />

          <Form.Item
            label={t("isPublished")}
            name="isPublished"
            rules={[
              {
                required: true,
                message: t("blogs.add.lables.categoryId") + " is required.",
              },
            ]}
          >
            <Select placeholder={t("blogs.add.placeholder.SelectCategory")}>
              <Select.Option value={"1"}>
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

          <Form.Item
            label={"image"}
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: "image" + " is required.",
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>{"image"}</Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("blogCategory.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

EditCertification.propTypes = {
  certificationId: PropTypes.number.isRequired,
};
