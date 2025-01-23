import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import useAddNewNewsLetterHook from "./hooks/useAddNewNewsLetterHook";
import { useTranslation } from "react-i18next";
import { PlusSquareFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const AddNewsLetter = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { addNewsletter } = useAddNewNewsLetterHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then((formData) => {
      addNewsletter(formData, {
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
                  console.error(msg);
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
          <PlusSquareFilled />
          {t("globals.add")}
        </Button>

      <Modal
        title={t("globals.add")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={t("NewsLetter.labels.subject")}
            name="subject"
            rules={[
              { required: true, message: t("validation.titleEnRequired") },
            ]}
          >
            <Input placeholder={t("NewsLetter.placeholders.EnterSubject")} />
          </Form.Item>

          <Form.Item
            label={t("NewsLetter.labels.content")}
            name="content"
            rules={[
              {
                required: true,
                message: t("validation.descriptionEnRequired"),
              },
            ]}
          >
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          <Form.Item
            label={t("NewsLetter.labels.isSent")}
            name="isSent"
            rules={[
              { required: true, message: t("validation.isPublishedRequired") },
            ]}
          >
            <Select placeholder={t("NewsLetter.placeholders.SelectStatus")}>
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
            {t("globals.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewsLetter;
