import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const CareermetaDataAr = () => {
  const { t } = useTranslation();
  return (
    <Form.Item
      name="metaDataAr"
      label={t("careers.labels.metaDataAr.title")}
      rules={[{ required: true, message: t("careers.labels.metaDataEn.required.global") }]}
    >
      <Form.List
        name="metaDataAr"
      >
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
                  <Input placeholder={t("careers.placeholders.EnterMetaDataAr")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  fieldKey={[fieldKey, "value"]}
                  rules={[{ required: true, message: t("careers.labels.metaDataEn.required.value") }]}
                >
                  <Input placeholder={t("careers.placeholders.EnterMetaDataAr")} />
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