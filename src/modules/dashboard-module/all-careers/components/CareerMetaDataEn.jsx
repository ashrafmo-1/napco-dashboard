import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const CareerMetaDataEn = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      className="form_item_Metadata_career"
      name={["metaDataEn", 0]}
      label={t("careers.labels.metaDataEn.title")}
      rules={[{ required: true, message: t("careers.labels.metaDataEn.required.global") }]}
    >
      <Form.List name="metaDataEn">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  fieldKey={[fieldKey, "title"]}
                  rules={[{ required: true, message: t("careers.labels.metaDataEn.required.title") }]}
                >
                  <Input placeholder={t("careers.placeholders.EnterMetaDataEn.title")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  fieldKey={[fieldKey, "value"]}
                  rules={[{ required: true, message: t("careers.labels.metaDataEn.required.value") }]}
                >
                  <Input placeholder={t("careers.placeholders.EnterMetaDataEn.value")} />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                {t("globals.add")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
