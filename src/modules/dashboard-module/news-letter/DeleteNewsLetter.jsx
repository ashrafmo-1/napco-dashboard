import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import useDeleteNewsLetterHook from "./hooks/useDeleteNewsLetterHook";

const DeleteNewsLetter = ({newsletterId}) => {
  const {deleteNewsletter} = useDeleteNewsLetterHook()

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    await deleteNewsletter(newsletterId);
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div>
      <Button danger className="del" onClick={showModal}>
        <DeleteOutlined />
      </Button>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this News letter?</p>
      </Modal>
    </div>
  );
};

export default DeleteNewsLetter;
