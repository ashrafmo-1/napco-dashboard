import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { useAddNewCareer } from "./hooks/useAddNewCareer";
import { CareerContent } from "./components/CareerContent";
import { Slug } from "./components/Slug";
import { CareerIsActive } from "./components/CareerIsActive";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {Title} from "../../../common/modules/create-edit/Title.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {CareerExtraDetailsEn} from "./components/CareerExtraDetailsEn.jsx";
import {CareerExtraDetailsAr} from "./components/CareerExtraDetailsAr.jsx";

const AddNewCareer = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addCareer } = useAddNewCareer();
  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addCareer(formData);
      toast.success("Career added successfully.");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        toast.error("The selected status is invalid.");
      } else {
        toast.error("Failed to send form. Please try again.", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled />
          {t("globals.add")}
        </Button>
      <Modal
        title={t("globals.add")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={900}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title LabletitleAr={"career arabic title"} LabletitleEn={"career english title"} />
          <Description />
          <CareerContent />

          <Row gutter={[16, 16]}>
            <MetaDataAr />
            <MetaDataEn />
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CareerExtraDetailsEn />
            </Col>
            <Col span={12}>
              <CareerExtraDetailsAr />
            </Col>
          </Row>

          <Slug />
          <CareerIsActive />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("globals.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewCareer;
