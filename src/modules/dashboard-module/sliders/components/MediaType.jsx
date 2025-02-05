import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const MediaType = ({ restField, fieldKey, name }) => {
  const { t } = useTranslation();
  return (
    <Form.Item
    className="w-full"
      {...restField}
      label={t("mediaType")}
      name={[name, "MediaType"]}
      fieldKey={[fieldKey, "MediaType"]}
      rules={[
        {
          required: true,
          message: t("mediaType") + " is required.",
        },
      ]}
    >
      <Select placeholder="Select Media Type">
        <Select.Option value="1">
          <div className="flex items-center gap-1">
            <span className="bg-green-600 p-1 rounded-full"></span>
            <span>{t("vedio")}</span>
          </div>
        </Select.Option>
        <Select.Option value="0">
          <div className="flex items-center gap-1">
            <span className="bg-blue-600 p-1 rounded-full"></span>
            <span>{t("photo")}</span>
          </div>
        </Select.Option>
      </Select>
    </Form.Item>
  );
};
