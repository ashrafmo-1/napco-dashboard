import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";

export const MediaType = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      label="Media Type"
      name="MediaType"
      rules={[
        {
          required: true,
          message: "Media Type is required.",
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
