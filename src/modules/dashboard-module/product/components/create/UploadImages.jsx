import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const UploadImages = () => {
  const { t } = useTranslation();

  const normFile = (e) => {
    if (!e || !e.fileList) {
      return [];
    }

    return e.fileList.map((file) => ({
      file: file.originFileObj,
      path: file.response?.url || file.name,
    }));
  };

  return (
    <Form.Item
      name="images"
      label={t("Upload Images")}
      valuePropName="fileList"
      getValueFromEvent={normFile}
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
        onChange={(info) => {
          if (info.file.status === "done") {
            toast.success(`${info.file.name} ${t("file uploaded successfully")}.`);
          } else if (info.file.status === "error") {
            toast.error(`${info.file.name} ${t("file upload failed")}.`);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>{t("Upload Images")}</Button>
      </Upload>
    </Form.Item>
  );
};
