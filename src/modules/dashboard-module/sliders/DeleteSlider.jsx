import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeleteSliderHook } from "./hooks/useDeleteSliderHook";
import PropTypes from "prop-types";

export const DeleteSlider = ({ slideId }) => {
  const { deleteSlider } = useDeleteSliderHook();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = async () => {
    setLoading(true);
    await deleteSlider(slideId);
    setLoading(false);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button danger className="del" onClick={showModal}>
        <DeleteOutlined />
      </Button>

      <Modal title="Confirm Deletion" visible={isModalVisible} onOk={handleOk}
        onCancel={handleCancel} confirmLoading={loading}
      >
        <p>Are you sure you want to delete this slider?</p>
      </Modal>
    </div>
  );
};

DeleteSlider.propTypes = {
    slideId: PropTypes.string.isRequired,
};