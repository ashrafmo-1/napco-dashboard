import { Button, Form, Row, Col, Select, Upload } from "antd";
import { useState } from "react";
import { BackwardFilled, UploadOutlined } from "@ant-design/icons";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useAddNewBlog } from "./hooks/useAddNewBlog";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {Slug} from "../../../common/modules/create-edit/Slug.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {MAINPATH} from "../../../constant/MAINPATH.js";
import {TextEditorInput} from "../../../common/modules/create-edit/TextEditorInput.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {Title} from "../../../common/modules/create-edit/Title.jsx";

export const AddBlog = () => {
  const { t, i18n } = useTranslation();
  const { addNewBlog } = useAddNewBlog();
  const { blogCategories } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      const form_data = await form.validateFields();
      const formData = new FormData();

      if (form_data.thumbnail) {
        formData.append("thumbnail", form_data.thumbnail.file || form_data.thumbnail);
      } else {
        formData.append("thumbnail", "");
      }

      formData.append("titleEn", form_data.titleEn || "");
      formData.append("titleAr", form_data.titleAr || "");
      formData.append("slugAr", form_data.slugAr || "");
      formData.append("slugEn", form_data.slugEn || "");
      formData.append("descriptionAr", form_data.descriptionAr || "");
      formData.append("descriptionEn", form_data.descriptionEn || "");
      formData.append("contentAr", form_data.contentAr || "");
      formData.append("contentEn", form_data.contentEn || "");
      formData.append("isPublished", form_data.isPublished || "0");
      formData.append("categoryId", form_data.categoryId || "");

      formData.append("descriptionEn", form_data.descriptionEn || "");
      formData.append("descriptionAr", form_data.descriptionAr || "");
      formData.append("slugEn", form_data.slugEn || "");
      formData.append("slugAr", form_data.slugAr || "");
      formData.append("contentEn", form_data.contentEn || "");
      formData.append("contentAr", form_data.contentAr || "");
      formData.append("metaDataEn[title]", form_data.metaDataEn?.title || "");
      formData.append("metaDataEn[description]", form_data.metaDataEn?.description || "");
      if ( form_data.metaDataEn?.keywords && form_data.metaDataEn.keywords.length > 0) {
        form_data.metaDataEn.keywords.forEach((keyword, index) => {
          formData.append(`metaDataEn[keywords][${index}]`, keyword);
        });
      } else {
        formData.append("metaDataEn[keywords]", "");
      }
      formData.append("metaDataAr[title]", form_data.metaDataAr?.title || "");
      formData.append("metaDataAr[description]", form_data.metaDataAr?.description || "");
      if ( form_data.metaDataAr?.keywords && form_data.metaDataAr.keywords.length > 0) {
        form_data.metaDataAr.keywords.forEach((keyword, index) => {
          formData.append(`metaDataAr[keywords][${index}]`, keyword);
        });
      } else {
        formData.append("metaDataAr[keywords]", "");
      }

      addNewBlog(formData, {
        onSuccess: () => {
          setIsPending(false);
          toast.success("Blog added successfully.");
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
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl capitalize">
          {t("blogs.add.title")} {"new blog"}
        </h1>
        <Link to={`/${MAINPATH}/${i18n.language}/blogs`}>
          <Button type="primary">
            <BackwardFilled />
            {"all blogs"}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title
          LabletitleAr={"blog arabic title"}
          LabletitleEn={"blog english title"}
        />
        <Slug />
        <Description />
        <TextEditorInput />

        <Row gutter={[16, 16]}>
          <MetaDataAr />
          <MetaDataEn />
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
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
          </Col>
        </Row>

        <Form.Item
          label={t("blogs.add.lables.isPublished")}
          name="isPublished"
          rules={[
            {
              required: true,
              message: t("blogs.add.lables.isPublished") + " is required.",
            },
          ]}
        >
          <Select placeholder={t("blogs.add.placeholder.isPublished")}>
            <Select.Option value="1">
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
          label={t("blogs.add.lables.categoryId")}
          name="categoryId"
          rules={[
            {
              required: true,
              message: t("blogs.add.lables.categoryId") + " is required.",
            },
          ]}
        >
          <Select placeholder={t("blogs.add.placeholder.SelectCategory")}>
            {blogCategories.map((category, index) => (
              <Select.Option value={category.blogCategoryId} key={index}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="mb-8"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? t("loading") : t("blogs.add.title")}
        </Button>
      </Form>
    </div>
  );
};
