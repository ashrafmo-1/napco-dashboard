import { EyeFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { useShowCandidatesHook } from "./hooks/useShowCandidatesHook";

export const ShowCandidates = ({ candidateId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { candidates } = useShowCandidatesHook(candidateId);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button onClick={showModal}>
        <EyeFilled />
      </Button>

      <Modal
        title="Candidate Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Name (English)"
                name="name"
                rules={[
                  { required: true, message: "Name in English is required." },
                ]}
              >
                <Input placeholder="Enter name in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Name (Arabic)"
                name="nameAr"
                rules={[
                  { required: true, message: "Name in Arabic is required." },
                ]}
              >
                <Input placeholder="Enter name in Arabic" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
