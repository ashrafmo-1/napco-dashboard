import {useTranslation} from "react-i18next";
import { useState } from "react";
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Upload} from "antd";
import {PlusSquareFilled, UploadOutlined} from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import {Title} from "../../../common/modules/create-edit/Title.jsx";
import {Slug} from "../../../common/modules/create-edit/Slug.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {useAddNewEventHook} from "./hooks/addEventHook.js";

export  const AddNewEvent = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { addNewEvent } = useAddNewEventHook();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            setIsPending(true);
            const form_data = await form.validateFields();
            const formData = new FormData();

            if (form_data.thumbnail) {
                formData.append( "thumbnail", form_data.thumbnail.file || form_data.thumbnail
                );
            } else {
                formData.append("thumbnail", "");
            }

            formData.append("titleEn", form_data.titleEn || "");
            formData.append("titleAr", form_data.titleAr || "");
            formData.append("descriptionEn", form_data.descriptionEn || "");
            formData.append("descriptionAr", form_data.descriptionAr || "");
            formData.append("slugEn", form_data.slugEn || "");
            formData.append("slugAr", form_data.slugAr || "");
            formData.append("metaDataEn[title]", form_data.metaDataEn?.title || "");
            formData.append(
                "metaDataEn[description]",
                form_data.metaDataEn?.description || ""
            );
            formData.append("location", form_data.location || "");
            formData.append("time", form_data.time.format("HH:mm"));
            formData.append("date", moment(form_data.date).format("YYYY-MM-DD"));

            if (form_data.metaDataEn?.keywords && form_data.metaDataEn.keywords.length > 0) {form_data.metaDataEn.keywords.forEach((keyword, index) => {
                formData.append(`metaDataEn[keywords][${index}]`, keyword)});
            } else {
                formData.append("metaDataEn[keywords]", "");
            }
            formData.append("metaDataAr[title]", form_data.metaDataAr?.title || "");
            formData.append("metaDataAr[description]", form_data.metaDataAr?.description || "");
            if (form_data.metaDataAr?.keywords && form_data.metaDataAr.keywords.length > 0) {
                form_data.metaDataAr.keywords.forEach((keyword, index) => {
                    formData.append(`metaDataAr[keywords][${index}]`, keyword);
                });
            } else {
                formData.append("metaDataAr[keywords]", "");
            }
            formData.append("isPublished", form_data.isPublished ? 1 : 0);
            addNewEvent(formData, {
                onSuccess: () => {
                    toast.success("Blog added successfully.");
                    setIsPending(false);
                    handleCancel()
                },
                onError: (error) => {
                    setIsPending(false);
                    const errorMessage = error.response?.data?.message;
                    if (typeof errorMessage === "object") {
                        Object.entries(errorMessage).forEach(([messages]) => {
                            messages.forEach((msg) => {
                                toast.error(msg);
                            });
                        });
                    } else {
                        toast.error(errorMessage || "Failed to add blog.");
                    }
                },
            });
        } catch (errorInfo) {
            setIsPending(false);
            console.log("Validate Failed:", errorInfo);
        }
    };

    return (
        <>
            <Button onClick={() => showModal(true)} type="primary">
                <PlusSquareFilled />
                <span>{t("globals.add")}</span>
            </Button>

            <Modal
                title={t("globals.add")}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <Form
                    layout="vertical"
                    className="mt-6"
                    onFinish={handleSubmit}
                    form={form}
                >
                    <Title
                        LabletitleAr={"event arabic title"}
                        LabletitleEn={"event english title"}
                    />
                    <Slug />
                    <Description />
                    <Row gutter={[16, 16]}>
                        <MetaDataAr />
                        <MetaDataEn />
                    </Row>

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

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label={t("date")}
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: t("events.validation.dateRequired"),
                                    },
                                ]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="time"
                                label={t("time")}
                                rules={[
                                    {
                                        required: true,
                                        message: t("events.validation.timeRequired"),
                                    },
                                ]}
                            >
                                <TimePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label={t("events.labels.location")}
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: t("events.validation.locationRequired"),
                            },
                        ]}
                    >
                        <Input type="text" placeholder="enter location" />
                    </Form.Item>

                    <Form.Item
                        label={t("globals.isPublished")}
                        name="isPublished"
                        rules={[
                            {
                                required: true,
                                message: t("events.validation.isPublishedRequired"),
                            },
                        ]}
                    >
                        <Select placeholder={t("globals.isPublished")}>
                            <Select.Option value="1">
                                <div className="flex items-center gap-1">
                                    <span className="bg-green-600 p-1 rounded-full"></span>
                                    <span>{t("globals.status.published")}</span>
                                </div>
                            </Select.Option>
                            <Select.Option value="0">
                                <div className="flex items-center gap-1">
                                    <span className="bg-red-600 p-1 rounded-full"></span>
                                    <span>{t("globals.status.draft")}</span>
                                </div>
                            </Select.Option>
                        </Select>
                    </Form.Item>

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
        </>
    )
}