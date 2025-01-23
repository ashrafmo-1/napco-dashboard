import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CareerContent } from "./components/CareerContent";
import { Slug } from "./components/Slug";
import { CareerIsActive } from "./components/CareerIsActive";
import { useEditCareer } from "./hooks/useEditCareer";
import { useGetSingleCareerHook } from "./hooks/useGetSingleCareerHook";
import { toast } from "react-toastify";
import {Title} from "../../../common/modules/create-edit/Title.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {CareerExtraDetailsEn} from "./components/CareerExtraDetailsEn.jsx";
import {CareerExtraDetailsAr} from "./components/CareerExtraDetailsAr.jsx";

// eslint-disable-next-line react/prop-types
const EditAllCareers = ({ careerId }) => {
  const { editCareer } = useEditCareer();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleCareerHook(careerId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsPending(true);
    try {
      await editCareer(careerId, values);
      toast.success("career edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Failed to edit career.", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        extraDetailsAr: data.extraDetailsAr,
        extraDetailsEn: data.extraDetailsEn,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="edit career"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={850}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title
            LabletitleAr={"career arabic title"}
            LabletitleEn={"career english title"}
          />
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
            {"Add New career"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAllCareers;
