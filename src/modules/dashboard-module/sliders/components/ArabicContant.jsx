import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const ArabicContant = ({ restField, fieldKey, name }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between">
      <Form.Item
      className="w-full mr-3"
        {...restField}
        label={t("arabicTitle")}
        name={[name, "contentAr", "title"]}
        fieldKey={[fieldKey, "contentAr", "title"]}
        rules={[
          { required: true, message: t("arabicTitle") + " is required." },
        ]}
      >
        <Input placeholder={t("enterArabicTitle")} />
      </Form.Item>

      <Form.Item
      className="w-full"
        {...restField}
        label={t("arabicDescription")}
        name={[name, "contentAr", "description"]}
        fieldKey={[fieldKey, "contentAr", "description"]}
        rules={[
          {
            required: true,
            message: t("arabicDescription") + " is required.",
          },
        ]}
      >
        <Input.TextArea placeholder={t("enterArabicDescription")} />
      </Form.Item>
    </div>
  );
};
