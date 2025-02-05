import { Button, Col, Form, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSingleSliderHook } from "./hooks/useSingleSliderHook";
import { useEditSliderHook } from "./hooks/useEditSliderHook";
import {
  EditFilled,
  MinusCircleOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { TitleAndSections } from "./components/TitleAndSections";
import { ArabicContant } from "./components/ArabicContant";
import { EnglishContent } from "./components/EnglishContent";
import { StatusSlider } from "./components/Status";
import { MediaType } from "./components/MediaType";
import { UploadMedia } from "./components/UploadMedia";

// eslint-disable-next-line react/prop-types
export const EditSlider = ({ slideId, sliderItemId }) => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useSingleSliderHook(slideId);
  const { editSlider } = useEditSliderHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then((values) => {
        console.log(values);
      
        const formData = new FormData();
        formData.append("title", values.title || "");
        const frontPageSectionIds = Array.isArray(values.frontPageSectionId) ? values.frontPageSectionId: [values.frontPageSectionId];
        frontPageSectionIds.forEach((id) => {
          formData.append("frontPageSectionId[]", id);
        });
        values.sliderItems.forEach((item, index) => {
          formData.append(`sliderItems[${index}][media]`, new Blob([item.media], { type: "application/octet-stream" }));
          formData.append(`sliderItems[${index}][isActive]`, item.isActive);
          formData.append(`sliderItems[${index}][MediaType]`, item.MediaType);
          formData.append(`sliderItems[${index}][sliderItemId]`, sliderItemId);
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

        editSlider(
          { slideId: slideId, formData },
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
        frontPageSectionId: data.frontPageSections?.[0]?.frontPageSectionId,
        sliderItems:
          data.sliderItem?.map((item) => ({
            isActive: item.isActive !== undefined ? String(item.isActive) : "",
            MediaType:
              item.mediaType !== undefined ? String(item.mediaType) : "",
            media: item.media ? item.media : "",
            contentEn: {
              title: item.contentEn?.title || "",
              description: item.contentEn?.description || "",
            },
            contentAr: {
              title: item.contentAr?.title || "",
              description: item.contentAr?.description || "",
            },
          })) || [],
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
        width={800}
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
                    <ArabicContant
                      restField={restField}
                      fieldKey={fieldKey}
                      name={name}
                    />
                    <EnglishContent
                      restField={restField}
                      fieldKey={fieldKey}
                      name={name}
                    />
                    <div className="flex justify-between">
                      <StatusSlider
                        restField={restField}
                        fieldKey={fieldKey}
                        name={name}
                      />
                      <MediaType
                        restField={restField}
                        fieldKey={fieldKey}
                        name={name}
                      />
                    </div>
                    <UploadMedia restField={restField} fieldKey={fieldKey} name={name} />
                    <MinusCircleOutlined
                      className="dynamic-delete-button mb-10"
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
