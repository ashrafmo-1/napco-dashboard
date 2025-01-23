import {Col, Form, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {useTranslation} from "react-i18next";

export const Description = () => {
    const {t} = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Form.Item label={t("products.add.lables.DescriptoinEN")} name="descriptionEn" rules={[
                    {
                        required: true,
                        message:
                            t("value") + " is required.",
                    },
                ]}>
                    <TextArea placeholder={t("products.add.placeholder.EnterDescriptoinEN")} autoSize={{minRows: 6}}/>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={t("products.add.lables.DescriptoinAR")} name="descriptionAr" rules={[
                    {
                        required: true,
                        message:
                            t("value") + " is required.",
                    },
                ]}>
                    <TextArea placeholder={t("products.add.placeholder.EnterDescriptoinAR")} autoSize={{minRows: 6}}/>
                </Form.Item>
            </Col>
        </Row>
    );
};