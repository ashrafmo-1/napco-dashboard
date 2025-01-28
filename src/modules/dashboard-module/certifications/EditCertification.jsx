import {Button, Form, Modal, Select, Upload} from "antd";
import {EditFilled, UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Title} from "../../../common/modules/create-edit/Title.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {useEditCertificationHook} from "./hooks/useEditCertificationHook.js";
import PropTypes from "prop-types";

export const EditCertification = ({certificationId}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const {editCertification} = useEditCertificationHook()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = () => {
        setIsPending(true);
        form.validateFields().then((values) => {
            const formData = new FormData();
            if (values.thumbnail && values.thumbnail[0]?.originFileObj) {
                formData.append("thumbnail", values.thumbnail[0].originFileObj);
            } else {
                formData.append("thumbnail", "");
            }
            formData.append("titleEn", values.titleEn || "");
            formData.append("titleAr", values.titleAr || "");
            formData.append("descriptionAr", values.descriptionAr || "");
            formData.append("descriptionEn", values.descriptionEn || "");
            formData.append("isPublished", values.isPublished || "0");
            formData.append("_method", "PUT");

            editCertification({ certificationId: certificationId, formData },
                {
                    onSuccess: () => {
                        setIsPending(false);
                    },
                    onError: (error) => {
                        setIsPending(false);
                        const errorMessage = error.response?.data?.message;
                        if (typeof errorMessage === "object") {
                            Object.entries(errorMessage).forEach(([field, messages]) => {
                                messages.forEach((msg) => {
                                    toast.error(msg);
                                });
                            });
                        } else {
                            toast.error(errorMessage || "Failed to edit blog.");
                        }
                    },
                    onSettled: () => {
                        setIsPending(false);
                    },
                }
            );
        })
            .catch((errorInfo) => {
                setIsPending(false);
                console.log("Validate Failed:", errorInfo);
            });
    };


    return (
        <div>
            <Button onClick={showModal} className="text-green-800">
                <EditFilled />
            </Button>

            <Modal
                title={t("blogCategory.add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Title
                        LabletitleAr={"blog arabic title"}
                        LabletitleEn={"blog english title"}
                    />
                    <Description/>

                    <Form.Item
                        label={t("isPublished")}
                        name="isPublished"
                        rules={[
                            {
                                required: true,
                                message: t("blogs.add.lables.categoryId") + " is required.",
                            },
                        ]}
                    >
                        <Select placeholder={t("blogs.add.placeholder.SelectCategory")}>
                            <Select.Option value={"1"}>
                                <div className="flex items-center gap-1">
                                    <span className="bg-green-600 p-1 rounded-full"></span>
                                    <span>{t("globals.status.active")}</span>
                                </div>
                            </Select.Option>
                            <Select.Option value="0">
                                <div className="flex items-center gap-1">
                                    <span className="bg-red-600 p-1 rounded-full"></span>
                                    <span>{t("globals.status.inActive")}</span>
                                </div>
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={t("blogs.add.lables.thumbnail")}
                        name="thumbnail"
                        valuePropName="file"
                        getValueFromEvent={(e) => e && e.file}
                        rules={[
                            {
                                required: true,
                                message: t("blogs.add.lables.thumbnail") + " is required.",
                            },
                        ]}
                    >
                        <Upload listType="picture" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>
                                {t("blogs.add.placeholder.EnterThumbnail")}
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        loading={isPending}
                    >
                        {t("blogCategory.add")}
                    </Button>
                </Form>
            </Modal>
        </div>
    )
}


EditCertification.propTypes = {
    certificationId: PropTypes.number.isRequired,
};