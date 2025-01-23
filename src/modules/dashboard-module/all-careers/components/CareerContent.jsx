import { Form, Col, Row } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";

export const CareerContent = () => {
  const form = Form.useFormInstance();
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]} className="mb-5">
      <Col span={12}>
        <Form.Item
          label={t("careers.labels.contentEn")}
          name="contentEn"
          rules={[
            {
              required: true,
              message: t("careers.labels.contentEn") + " is required.",
            },
          ]}
        >
          <ReactQuill
            className="h-60"
            theme="snow"
            placeholder={t("careers.placeholders.EnterContentEn")}
            onChange={(value) => {
              form.setFieldValue("contentEn", value);
            }}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label={t("careers.labels.contentAr")}
          name="contentAr"
          rules={[
            {
              required: true,
              message: t("careers.labels.contentAr") + " is required.",
            },
          ]}
        >
          <ReactQuill
            className="h-60"
            theme="snow"
            placeholder={t("careers.placeholders.EnterContentAr")}
            onChange={(value) => {
              form.setFieldValue("contentAr", value);
            }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
