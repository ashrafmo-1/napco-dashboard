import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

export const MetaDataEn = () => {
  const { t } = useTranslation();

  return (
    <div className="w-[50%]">
        <Form.Item label={t("english title")} name={["metaDataEn", "title"]}>
          <Input placeholder={"english title"} className="metadata-input" />
        </Form.Item>
        <Form.Item
          label={"english description"}
          name={["metaDataEn", "description"]}
        >
          <Input.TextArea
            placeholder={"english description"}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item label={"english keywords"} name={["metaDataEn", "keywords"]}>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder={"english keywords"}
            className="metadata-input"
          />
        </Form.Item>
    </div>
  );
};