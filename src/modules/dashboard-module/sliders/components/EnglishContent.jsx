import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const EnglishContent = ({ restField, fieldKey, name }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between">
      <Form.Item
      className="w-full mr-3"
        {...restField}
        label={t("englishTitle")}
        name={[name, "contentEn", "title"]}
        fieldKey={[fieldKey, "contentEn", "title"]}
        rules={[
          {
            required: true,
            message: t("englishTitle") + " is required.",
          },
        ]}
      >
        <Input placeholder={t("enterEnglishTitle")} />
      </Form.Item>

      <Form.Item
      className="w-full"
        {...restField}
        label={t("englishDescription")}
        name={[name, "contentEn", "description"]}
        fieldKey={[fieldKey, "contentEn", "description"]}
        rules={[
          {
            required: true,
            message: t("englishDescription") + " is required.",
          },
        ]}
      >
        <Input.TextArea placeholder={t("enterEnglishDescription")} />
      </Form.Item>
    </div>
  );
};
