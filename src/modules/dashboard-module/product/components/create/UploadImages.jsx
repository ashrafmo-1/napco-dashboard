import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteProductImageHook } from "../../hook/useDeleteProductImageHook";

// eslint-disable-next-line react/prop-types
export const UploadImages = ({ isEdit }) => {
  const { t } = useTranslation();
  const { deleteProductPhoto } = useDeleteProductImageHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  
  const normFile = (e) => {
    if (!e || !e.fileList) {
      return [];
    }

    return e.fileList;
  };

  const handleRemove = (file) => {
    if (isEdit) {
      setFileToDelete(file);
      setIsModalVisible(true);
    }
    return false;
  };

  const handleConfirmDelete = async () => {
    if (fileToDelete) {
      try {
        await deleteProductPhoto(fileToDelete.uid);
        setIsModalVisible(false);
        setFileToDelete(null);
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setFileToDelete(null);
  };

  return (
    <>
      <Form.Item
        name="images"
        label={t("Upload Images")}
        {...(isEdit ? { valuePropName: "fileList" } : "")}
        {...(isEdit ? { getValueFromEvent: normFile } : "")}
        rules={[
          {
            required: true,
            message: `${t("Images")} ${t("is required")}.`,
          },
        ]}
      >
        <Upload
          name="file"
          action="/upload"
          listType="picture"
          multiple
          maxCount={2}
          onRemove={handleRemove}
          onChange={(info) => {
            if (info.file.status === "done") {
              console.log(`${info.file.name} ${t("file uploaded successfully")}.`);
            } else if (info.file.status === "error") {
              console.error(`${info.file.name} ${t("file upload failed")}.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>{t("Upload Images")}</Button>
        </Upload>
      </Form.Item>

      {isEdit && (
        <Modal
          title={t("Confirm Delete")}
          visible={isModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText={t("Delete")}
          cancelText={t("Cancel")}
        >
          <p>{t("Are you sure you want to delete this image?")}</p>
        </Modal>
      )}
    </>
  );
};