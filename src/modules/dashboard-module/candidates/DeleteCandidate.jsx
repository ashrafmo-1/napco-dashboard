import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeleteCandidatesHook } from "./hooks/useDeleteCandidatesHook";

export const DeleteCandidate = ({candidateId}) => {
  const { deleteCandidate } = useDeleteCandidatesHook();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
      await deleteCandidate(candidateId);
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
        <p>Are you sure you want to delete this candidate?</p>
      </Modal>
    </div>
  );
};
