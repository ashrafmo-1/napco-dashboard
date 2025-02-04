import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const UploadMedia = ({ restField, fieldKey, name }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  return (
    <div>
      <Form.Item
        {...restField}
        label={t("media")}
        name={[name, "media"]}
        fieldKey={[fieldKey, "media"]}
        valuePropName="file"
        getValueFromEvent={(e) => e && e.file}
        rules={[
          {
            required: true,
            message: t("media") + " is required.",
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
                form.setFieldsValue({
                  [name]: {
                    ...form.getFieldValue(name),
                    media: reader.result,
                  },
                });
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
