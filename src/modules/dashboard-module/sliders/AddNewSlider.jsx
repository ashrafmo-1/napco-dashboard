import {
  PlusSquareFilled,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAddNewSliderHook } from "./hooks/useAddNewSliderHook";
import { TitleAndSections } from "./components/TitleAndSections";

export const AddNewSlider = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addNewSlider } = useAddNewSliderHook();
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
    console.log("request ...");

    form
      .validateFields()
      .then(async (form_data) => {
        console.log("Form Data:", form_data);
        const formData = new FormData();

        formData.append("title", form_data.title);

        const frontPageSectionIds = Array.isArray(form_data.frontPageSectionId)
          ? form_data.frontPageSectionId
          : [form_data.frontPageSectionId];
        frontPageSectionIds.forEach((id) => {
          formData.append("frontPageSectionId[]", id);
        });

        form_data.sliderItems.forEach((item, index) => {
          formData.append(`sliderItems[${index}][media]`, item.media);
          formData.append(`sliderItems[${index}][isActive]`, item.isActive);
          formData.append(`sliderItems[${index}][MediaType]`, item.MediaType);

          formData.append(
            `sliderItems[${index}][contentAr][title]`,
            item.contentAr?.title || ""
          );
          formData.append(
            `sliderItems[${index}][contentAr][description]`,
            item.contentAr?.description || ""
          );

          formData.append(
            `sliderItems[${index}][contentEn][title]`,
            item.contentEn?.title || ""
          );
          formData.append(
            `sliderItems[${index}][contentEn][description]`,
            item.contentEn?.description || ""
          );
        });

        addNewSlider(formData, {
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
              toast.error(errorMessage || "Failed to add slider.");
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ sliderItems: [{}] }}
        >
          {/* Title and Sections */}
          <TitleAndSections />
          {/* Slider Items */}
          <Form.List name="sliderItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Form.Item
                      {...restField}
                      label={t("arabicTitle")}
                      name={[name, "contentAr", "title"]}
                      fieldKey={[fieldKey, "contentAr", "title"]}
                      rules={[
                        {
                          required: true,
                          message: t("arabicTitle") + " is required.",
                        },
                      ]}
                    >
                      <Input placeholder={t("enterArabicTitle")} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label={t("arabicDescription")}
                      name={[name, "contentAr", "description"]}
                      fieldKey={[fieldKey, "contentAr", "description"]}
                      rules={[
                        {
                          required: true,
                          message: t("arabicDescription") + " is required.",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder={t("enterArabicDescription")}
                      />
                    </Form.Item>

                    {/* English Content */}
                    <Form.Item
                      {...restField}
                      label={t("englishTitle")}
                      name={[name, "contentEn", "title"]}
                      fieldKey={[fieldKey, "contentEn", "title"]}
                      rules={[
                        {
                          required: true,
                          message: t("englishTitle") + " is required.",
                        },
                      ]}
                    >
                      <Input placeholder={t("enterEnglishTitle")} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label={t("englishDescription")}
                      name={[name, "contentEn", "description"]}
                      fieldKey={[fieldKey, "contentEn", "description"]}
                      rules={[
                        {
                          required: true,
                          message: t("englishDescription") + " is required.",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder={t("enterEnglishDescription")}
                      />
                    </Form.Item>
                    {/* Status Slider */}
                    <Form.Item
                      {...restField}
                      label={t("status")}
                      name={[name, "isActive"]}
                      fieldKey={[fieldKey, "isActive"]}
                      rules={[
                        {
                          required: true,
                          message: t("status") + " is required.",
                        },
                      ]}
                    >
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

                    {/* Media Type */}
                    <Form.Item
                      {...restField}
                      label={t("mediaType")}
                      name={[name, "MediaType"]}
                      fieldKey={[fieldKey, "MediaType"]}
                      rules={[
                        {
                          required: true,
                          message: t("mediaType") + " is required.",
                        },
                      ]}
                    >
                      <Select placeholder="Select Media Type">
                        <Select.Option value="1">
                          <div className="flex items-center gap-1">
                            <span className="bg-green-600 p-1 rounded-full"></span>
                            <span>{t("vedio")}</span>
                          </div>
                        </Select.Option>
                        <Select.Option value="0">
                          <div className="flex items-center gap-1">
                            <span className="bg-blue-600 p-1 rounded-full"></span>
                            <span>{t("photo")}</span>
                          </div>
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    {/* Media Upload */}
                    <Form.Item
                      {...restField}
                      label={t("blogs.add.lables.thumbnail")}
                      name={[name, "media"]}
                      fieldKey={[fieldKey, "media"]}
                      valuePropName="file"
                      getValueFromEvent={(e) => e && e.file}
                      rules={[
                        {
                          required: true,
                          message:
                            t("blogs.add.lables.thumbnail") + " is required.",
                        },
                      ]}
                    >
                      <Upload listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>
                          {t("blogs.add.placeholder.EnterThumbnail")}
                        </Button>
                      </Upload>
                    </Form.Item>

                    {/* Remove Button */}
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}

                {/* Add New Slider Item Button */}
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Space>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusSquareFilled />}
                      >
                        {t("add slider item")}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>

          <Button
            className="mt-10"
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
