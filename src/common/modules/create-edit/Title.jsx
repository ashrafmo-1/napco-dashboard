import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export const Title = ({LabletitleAr, LabletitleEn}) => {
  const { t } = useTranslation();
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={LabletitleEn}
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
          label={LabletitleAr}
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
