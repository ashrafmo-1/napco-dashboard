import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export const UploadMedia = ({ restField, fieldKey, name, isEdit }) => {
  const { t } = useTranslation();

  const normFile = (e) => {
    if (!e || !e.fileList) {
      return [];
    }
    return e.fileList.map((file) => ({
      ...file,
      url: file.response?.url,
    }));
  };

  return (
    <Form.Item
      {...restField}
      label={t("media")}
      {...(isEdit ? { valuePropName: "fileList" } : "")}
      {...(isEdit ? { getValueFromEvent: normFile } : "")}
      name={[name, "media"]}
      fieldKey={[fieldKey, "media"]}
      rules={[
        {
          required: true,
          message: `${t("media")} is required.`,
        },
      ]}
    >
        <Upload
          name="file"
          action="/upload"
          listType="picture"
          multiple
          maxCount={1}
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
  );
};

// Prop types validation
UploadMedia.propTypes = {
  restField: PropTypes.object.isRequired,
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
};
