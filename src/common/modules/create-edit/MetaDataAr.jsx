import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

export const MetaDataAr = () => {
  const { t } = useTranslation();
  return (
    <div className="w-[50%]">
        <Form.Item label="title arabic" name={["metaDataAr", "title"]}>
          <Input placeholder={t("title arabic")} className="metadata-input" />
        </Form.Item>
        <Form.Item label={"description arabic"} name={["metaDataAr", "description"]}>
          <Input.TextArea
            placeholder={"title description"}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item label={"keywords"} name={["metaDataAr", "keywords"]}>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder={"keyword"}
            className="metadata-input"
          />
        </Form.Item>
    </div>
  );
};
