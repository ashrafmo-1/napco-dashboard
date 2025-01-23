import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const Slug = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={t("products.add.lables.slugEN")}
          name="slugEn"
          rules={[{ required: true, message: t("slug english is requires") }]}
        >
          <Input placeholder={t("products.add.placeholder.EnterslugEN")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={t("products.add.lables.slugAR")}
          name="slugAr"
          rules={[{ required: true, message: t("slug arabic is requires") }]}
        >
          <Input placeholder={t("products.add.placeholder.EnterslugAR")} />
        </Form.Item>
      </Col>
    </Row>
  );
};
