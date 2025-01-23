import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteContactHook } from "./hooks/useDeleteContactHook";

const DeleteContactUs = ({ contactUsId }) => {
  const { deleteBlog } = useDeleteContactHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <Button
        danger
        className="del"
        onClick={() => setIsModalVisible(contactUsId)}
      >
        <DeleteOutlined />
      </Button>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible === contactUsId}
        onOk={async () => {
          setIsPending(true);
          await deleteBlog(contactUsId);
          setIsPending(false);
          setIsModalVisible(null);
        }}
        onCancel={() => setIsModalVisible(null)}
        confirmLoading={isPending}
      >
        <p>{t("contactUs.confirmDeletion")}</p>
      </Modal>
    </div>
  );
};

export default DeleteContactUs;
