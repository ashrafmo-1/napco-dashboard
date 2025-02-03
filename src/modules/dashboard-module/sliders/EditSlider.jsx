import { Button, Col, Form, Input, Modal, Row, Select, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSingleSliderHook } from "./hooks/useSingleSliderHook";
import { useEditSliderHook } from "./hooks/useEditSliderHook";
import {
  EditFilled,
  MinusCircleOutlined,
  PlusSquareFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { TitleAndSections } from "./components/TitleAndSections";

// eslint-disable-next-line react/prop-types
export const EditSlider = ({ slideId }) => {
  const { t, i18n } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { data } = useSingleSliderHook(slideId);
  console.log(data);
  
  const { editSlider } = useEditSliderHook();
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
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();

        formData.append("title", values.title || "");
        formData.append("frontPageSectionId", values.frontPageSectionId);
        values.sliderItems.forEach((item, index) => {
          if (item.media && item.media.file) {
            formData.append(`sliderItems[${index}][media]`, item.media.file);
          }
          formData.append(
            `sliderItems[${index}][isActive]`,
            item.isActive || 0
          );
          formData.append(
            `sliderItems[${index}][MediaType]`,
            item.MediaType || 0
          );
        });

        editSlider(
          { slideId: slideId, formData },
          {
            onSuccess: () => {
              setIsPending(false);
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
                toast.error(errorMessage || "Failed to edit slider.");
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
        title: data.title,
        frontPageSectionId: data.frontPageSectionId,
        sliderItems: data.sliderItem?.map((item) => ({
          media: item.media,
          isActive: item.isActive,
          MediaType: item.mediaType,
          contentEn: {
            title: item.content?.title || "",
            description: item.content?.description || "",
          },
        })),
      });
    }
  }, [data, form, isModalVisible]);
  

  return (
    <div>
      <Button className="text-green-900" onClick={showModal}>
        <EditFilled className="text-green-900" />
      </Button>

      <Modal
        title={t("globals.edit")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          className="mt-6"
          onFinish={handleSubmit}
          form={form}
        >
          {/* Title and Sections */}
          <TitleAndSections />

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
                              message:
                                t("englishDescription") + " is required.",
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
                                t("blogs.add.lables.thumbnail") +
                                " is required.",
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
            type="primary"
            htmlType="submit"
            className="w-full mt-10"
            loading={isPending}
          >
            {t("globals.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
