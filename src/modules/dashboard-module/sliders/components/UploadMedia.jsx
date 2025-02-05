import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

export const UploadMedia = ({ restField, fieldKey, name }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Form.Item
        {...restField}
        label={t("media")}
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
          listType="picture"
          beforeUpload={() => false}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: true,
          }}
          onChange={({ file }) => {
            if (file.status === "done") {
              const reader = new FileReader();
              reader.onload = () => {
                restField.onChange(reader.result);
              };
              reader.readAsDataURL(file.originFileObj);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>{t("media")}</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

// Prop types validation
UploadMedia.propTypes = {
  restField: PropTypes.object.isRequired,
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
