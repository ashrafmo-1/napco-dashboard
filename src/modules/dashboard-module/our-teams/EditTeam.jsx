import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
import { EditFilled, MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useEditTeamsHook } from "./hooks/useEditTeamHook.js";
import PropTypes from "prop-types";
import { useGetSingleTeamHook } from "./hooks/useGetSingleTeamHook.js";

export const EditTeam = ({ companyTeamId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { editTeam } = useEditTeamsHook();
  const { data } = useGetSingleTeamHook(companyTeamId);

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
        
        formData.append("name", values.name || "");
        formData.append("jobTitle", values.jobTitle || "");
        formData.append("isActive", values.isActive || "0");
        formData.append("_method", "PUT");

        if (values.socialLinks) {
          formData.append("socialLinks", JSON.stringify(values.socialLinks));
        }
  

        editTeam(
          { companyTeamId: companyTeamId, formData },
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
        name: data.name,
        jobTitle: data.jobTitle,
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
        image: data.image ? [{ url: data.image }] : [],
        socialLinks: data.socialLink ? JSON.parse(data.socialLink) : []
        });
    }
  }, [data, form, isModalVisible]);

    const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ thumbnail: fileList });
  };

  return (
    <div>
      <Button onClick={showModal} className="text-green-800">
        <EditFilled />
      </Button>

      <Modal
        title={t("edit")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name={"name"} label={t("name")} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"jobTitle"} label={t("jop title")} rules={[{ required: true }]}>
            <Input />
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
          label={t("photo")}
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[
            {
              required: true,
              message: " is required.",
            },
          ]}
        >
          <Upload listType="picture" beforeUpload={() => false} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>
              {t("blogs.edit.placeholder.EnterThumbnail")}
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
            {t("blogCategory.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

EditTeam.propTypes = {
  companyTeamId: PropTypes.number.isRequired,
};
