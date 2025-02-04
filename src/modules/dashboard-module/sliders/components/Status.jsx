import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const StatusSlider = ({ restField, fieldKey, name }) => {
  const { t } = useTranslation();
  return (
    <Form.Item
      {...restField}
      label={t("status")}
      name={[name, "isActive"]}
      fieldKey={[fieldKey, "isActive"]}
      rules={[
        {
          required: true,
          message: t("status") + " is required.",
        },
      ]}
    >
      <Select placeholder="Select status">
        <Select.Option value="1">
          <div className="flex items-center gap-1">
            <span className="bg-green-600 p-1 rounded-full"></span>
            <span>{t("globals.status.active")}</span>
          </div>
        </Select.Option>
        <Select.Option value="0">
          <div className="flex items-center gap-1">
            <span className="bg-red-600 p-1 rounded-full"></span>
            <span>{t("globals.status.inActive")}</span>
          </div>
        </Select.Option>
      </Select>
    </Form.Item>
  );
};
