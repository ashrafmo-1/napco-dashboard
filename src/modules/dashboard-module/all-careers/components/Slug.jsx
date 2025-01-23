import { Input, Form, Row, Col } from "antd";
import React from "react";
import { useTranslation } from 'react-i18next';

export const Slug = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={t("globals.slugEn")}
          name="slugEn"
          rules={[{ required: true, message: t("globals.slugEn") }]}
        >
          <Input placeholder={t("globals.slugEn")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={t("globals.slugAr")}
          name="slugAr"
          rules={[{ required: true, message: t("globals.slugAr") }]}
        >
          <Input placeholder={t("globals.slugAr")} />
        </Form.Item>
      </Col>
    </Row>
  );
};
