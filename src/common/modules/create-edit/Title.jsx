import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const Title = ({LabletitleAr, LabletitleEn}) => {
  const { t } = useTranslation();
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={LabletitleAr}
          name="titleEn"
          rules={[
            {
              required: true,
              message: t("careers.placeholders.EnterJobTitleEn"),
            },
          ]}
        >
          <Input placeholder={t("careers.placeholders.EnterJobTitleEn")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={LabletitleEn}
          name="titleAr"
          rules={[
            {
              required: true,
              message: t("careers.placeholders.EnterJobTitleAr"),
            },
          ]}
        >
          <Input placeholder={t("careers.placeholders.EnterJobTitleAr")} />
        </Form.Item>
      </Col>
    </Row>
  );
};
