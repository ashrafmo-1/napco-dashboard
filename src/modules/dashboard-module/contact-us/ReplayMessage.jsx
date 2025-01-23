import { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Modal, Descriptions, Typography, Divider } from "antd";
import React from "react";
import { useGetSingleMessageHook } from "./hooks/useGetSingleMessageHook";
// import { useReadMessage } from "./hooks/useReadMessage";
import { Status } from "../../components/Status";
import { ReplayForm } from "./components/ReplayForm";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

export const ReplayMessage = ({ contactUsId, contactUsMessageId }) => {
  const { t } = useTranslation();
  const { data } = useGetSingleMessageHook(contactUsId);
  // const { markMessageAsRead } = useReadMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpen = async () => {
    try {
      //   await markMessageAsRead(contactUsMessageId);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  return (
    <div>
      <Button className="replay-button" type="primary" onClick={handleOpen}>
        <MessageOutlined />
      </Button>

      <Modal title="Message Details" footer={null} visible={isModalVisible} onCancel={handleCancel}>
        {data ? (
          <div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label={t("contactUs.labels.subject")}>{data.subject}</Descriptions.Item>
              <Descriptions.Item label={t("contactUs.labels.name")}>{data.name}</Descriptions.Item>
              <Descriptions.Item label={t("contactUs.labels.email")}>{data.email}</Descriptions.Item>
              <Descriptions.Item label={t("contactUs.labels.phone")}>{data.phone}</Descriptions.Item>
              <Descriptions.Item label={t("contactUs.labels.status")}>
                <Status value={data.status} activeText={t("globals.status.active")} inactiveText={t("globals.status.inActive")} />
              </Descriptions.Item>
            </Descriptions>

            <Divider>{t("contactUs.messagesTitle")}</Divider>
            {data.messages.length > 0 ? (data.messages.map((msg) => (
                <div key={msg.contactUsMessageId} style={{ marginBottom: "10px" }}>
                  <div><Text strong>{t("contactUs.messages.from")}: </Text> <Text>{data.name}</Text></div>
                  <div><Text strong>{t("contactUs.messages.message")}: </Text> <Text>{msg.message}</Text></div>
                  <Text type="secondary" style={{ fontSize: "12px" }}>{t("contactUs.messages.sentAt")}: {msg.sentAt}</Text>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                {t("contactUs.messages.noMessages")}
              </p>
            )}
          </div>
        ) : (
          <Text type="secondary">Loading...</Text>
        )}

        <ReplayForm contactUsId={contactUsId} />
      </Modal>
    </div>
  );
};