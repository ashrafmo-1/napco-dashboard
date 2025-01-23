import { Col, Form, Input, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const MetaDataEn = () => {
  const { t } = useTranslation();

  return (
    <Col span={12}>
      <Space direction="vertical" size="large" className="metadata-space">
        <Form.Item
          label={t("careers.labels.metaDataEn.title")}
          name={["metaDataEn", "title"]}
        >
          <Input
            placeholder={t("careers.placeholders.metaDataEn.title")}
            className="metadata-input"
          />
        </Form.Item>
        <Form.Item
          label={t("careers.labels.metaDataEn.description")}
          name={["metaDataEn", "description"]}
        >
          <Input.TextArea
            placeholder={t("careers.placeholders.metaDataEn.description")}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item
          label={t("careers.labels.metaDataEn.keywords")}
          name={["metaDataEn", "keywords"]}
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
