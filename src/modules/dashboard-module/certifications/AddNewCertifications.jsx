import { useState } from "react";
import { Button, Form, Modal, Select, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { Title } from "../../../common/modules/create-edit/Title.jsx";
import { Description } from "../../../common/modules/create-edit/Description.jsx";
import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import { useAddNewCertifications } from "./hooks/useAddNewCertificationsHook.js";
import { toast } from "react-toastify";

export const AddNewCertifications = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { addNewCertifications } = useAddNewCertifications();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      const form_data = await form.validateFields();
      const formData = new FormData();

      if (form_data.image) {
        formData.append("image", form_data.image.file || form_data.image);
      } else {
        formData.append("image", "");
      }

      console.log(form_data.image);

      formData.append("titleEn", form_data.titleEn || "");
      formData.append("titleAr", form_data.titleAr || "");
      formData.append("descriptionAr", form_data.descriptionAr || "");
      formData.append("descriptionEn", form_data.descriptionEn || "");
      formData.append("isPublished", form_data.isPublished || "0");

      addNewCertifications(formData, {
        onSuccess: () => {
          setIsPending(false);
          handleCancel();
          toast.success("certifications added successfully.");
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
            toast.error(errorMessage || "Failed to add certifications.");
          }
        },
      });
    } catch (errorInfo) {
      setIsPending(false);
      console.log("Validate Failed:", errorInfo);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        {t("globals.add")}
        <PlusSquareFilled />
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
            initialValue={"1"}
            rules={[
              {
                required: true,
                message: t("blogs.add.lables.categoryId") + " is required.",
              },
            ]}
          >
            <Select value={"1"} placeholder={t("blogs.add.placeholder.SelectCategory")}>
              <Select.Option value={"1"}>
                <div className="flex items-center gap-1">
                  <span className="bg-green-600 p-1 rounded-full"></span>
                  <span>{"Published"}</span>
                </div>
              </Select.Option>
              <Select.Option value="0">
                <div className="flex items-center gap-1">
                  <span className="bg-red-600 p-1 rounded-full"></span>
                  <span>{"draft"}</span>
                </div>
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={"image"}
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => e && e.file}
            rules={[
              {
                required: true,
                message: "image" + " is required.",
              },
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
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
