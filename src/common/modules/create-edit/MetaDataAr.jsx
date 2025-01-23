import { Col, Form, Input, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const MetaDataAr = () => {
  const { t } = useTranslation();
  return (
    <Col span={12}>
      <Space direction="vertical" size="large" className="metadata-space">
        <Form.Item
          label={t("careers.labels.metaDataAr.title")}
          name={["metaDataAr", "title"]}
        >
          <Input
            placeholder={t("careers.placeholders.metaDataAr.title")}
            className="metadata-input"
          />
        </Form.Item>
        <Form.Item
          label={t("careers.labels.metaDataAr.description")}
          name={["metaDataAr", "description"]}
        >
          <Input.TextArea
            placeholder={t("careers.placeholders.metaDataAr.description")}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item
          label={t("careers.labels.metaDataEn.keywords")}
          name={["metaDataAr", "keywords"]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder={t("careers.placeholders.metaDataEn.keywords")}
            className="metadata-input"
          />
        </Form.Item>
      </Space>
    </Col>
  );
};
