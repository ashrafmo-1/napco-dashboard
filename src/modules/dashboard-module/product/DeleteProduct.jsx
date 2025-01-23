import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeleteProductHook } from "./hook/useDeleteProductHook";
const DeleteProduct = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {deleteProducts} = useDeleteProductHook()
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    await deleteProducts(productId);
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
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
