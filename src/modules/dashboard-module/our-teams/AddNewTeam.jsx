import { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, Space } from "antd";
import { useTranslation } from "react-i18next";
import { PlusSquareFilled, UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useAddNewTeamHook } from "./hooks/useAddNewTeamHook.js";
import { toast } from "react-toastify";

export const AddNewTeam = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { addNewTeam } = useAddNewTeamHook();

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

      formData.append("name", form_data.name || "");
      formData.append("jobTitle", form_data.jobTitle || "");
      formData.append("isActive", form_data.isActive);

      if (form_data.socialLinks) {
        formData.append("socialLinks", JSON.stringify(form_data.socialLinks));
      }

      addNewTeam(formData, {
        onSuccess: () => {
          setIsPending(false);
          handleCancel();
          toast.success("Team member added successfully.");
        },
        onError: (error) => {
          setIsPending(false);
          const errorMessage = error.response?.data?.message;
          if (typeof errorMessage === "object") {
            Object.entries(errorMessage).forEach(([, messages]) => {
              messages.forEach((msg) => {
                toast.error(msg);
              });
            });
          } else {
            toast.error(errorMessage || "Failed to add team member.");
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
          <Form.Item name={"name"} label={t("name")} rules={[{ required: true }]}>
            <Input placeholder="enter name" />
          </Form.Item>
          <Form.Item name={"jobTitle"} label={t("jop title")} rules={[{ required: true }]}>
            <Input placeholder="enter jop title" />
          </Form.Item>

          <Form.Item
            label={t("isActive")}
            name="isActive"
            rules={[
              {
                required: true,
                message: "required.",
              },
            ]}
          >
            <Select placeholder={t("is active")}>
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
            label={t("blogs.add.lables.image")}
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => e && e.file}
            rules={[
              {
                required: true,
                message: t("image") + " is required.",
              },
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>
                {t("image")}
              </Button>
            </Upload>
          </Form.Item>

          {/* Social Links Field */}
          <Form.List name="socialLinks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "platform"]}
                      rules={[{ required: true, message: "Platform is required" }]}
                    >
                      <Input placeholder="Platform (e.g., Twitter, LinkedIn)" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      rules={[{ required: true, message: "URL is required" }]}
                    >
                      <Input placeholder="URL" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Social Link
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

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