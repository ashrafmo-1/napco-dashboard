import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { useReplayMessageHook } from "../hooks/useReplayMessageHook";
import { useTranslation } from "react-i18next";

export const ReplayForm = ({ contactUsId }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { addNewReplay, isLoading } = useReplayMessageHook();

  const handleSubmit = async (values) => {
    const replayData = {
      contactUsId: contactUsId,
      message: values.message,
      isAdmin: 0,
      isRead: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    try {
      await addNewReplay(replayData);
      form.resetFields();
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  return (
    <div>
      <Divider>{t("contactUs.replayTitle")}</Divider>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={t("contactUs.replayForm.yourMessage")}
          name="message"
          rules={[{ required: true, message: t("contactUs.replayForm.pleaseInputMessage") }]}
        >
          <Input.TextArea rows={4} placeholder={t("contactUs.replayForm.typeMessagePlaceholder")} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>{t("contactUs.replayForm.sendReply")}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
