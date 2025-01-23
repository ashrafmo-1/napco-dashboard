import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
// import { useDeleteFaqHook } from "./hooks/useDeleteFaqHook";
import { useDeleteCareer } from "./hooks/useDeleteCareer";

const DeleteCareer = ({ careerId }) => {
  const { deleteCareer } = useDeleteCareer();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    setLoading(true);
    await deleteCareer(careerId);
    setLoading(false);
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
        <p>Are you sure you want to delete this career?</p>
      </Modal>
    </div>
  );
};

export default DeleteCareer;
