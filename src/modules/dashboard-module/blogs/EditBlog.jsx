import { FastBackwardOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useEditBlogHook } from "./hooks/useEditBlogHook";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useGetBlogsHook } from "./hooks/useGetBlogsHook";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import {Slug} from "../../../common/modules/create-edit/Slug.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {MAINPATH} from "../../../constant/MAINPATH.js";
import {TextEditorInput} from "../../../common/modules/create-edit/TextEditorInput.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {Title} from "../../../common/modules/create-edit/Title.jsx";

export const EditBlog = () => {
  const { t, i18n } = useTranslation();
  const { blogId } = useParams();
  const { editBlog } = useEditBlogHook();
  const { blogCategories } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetBlogsHook(blogId);
  const [fileList, setFileList] = useState([]);

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
        formData.append("slugAr", values.slugAr || "");
        formData.append("slugEn", values.slugEn || "");
        formData.append("descriptionAr", values.descriptionAr || "");
        formData.append("descriptionEn", values.descriptionEn || "");
        formData.append("contentAr", values.contentAr || "");
        formData.append("contentEn", values.contentEn || "");
        formData.append("isPublished", values.isPublished || "0");
        formData.append("categoryId", values.categoryId || "");
  
        formData.append("descriptionEn", values.descriptionEn || "");
        formData.append("descriptionAr", values.descriptionAr || "");
        formData.append("slugEn", values.slugEn || "");
        formData.append("slugAr", values.slugAr || "");
        formData.append("contentEn", values.contentEn || "");
        formData.append("contentAr", values.contentAr || "");
        formData.append("metaDataEn[title]", values.metaDataEn?.title || "");
        formData.append("metaDataEn[description]", values.metaDataEn?.description || "");
        if ( values.metaDataEn?.keywords && values.metaDataEn.keywords.length > 0) {
          values.metaDataEn.keywords.forEach((keyword, index) => {
            formData.append(`metaDataEn[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataEn[keywords]", "");
        }
        formData.append("metaDataAr[title]", values.metaDataAr?.title || "");
        formData.append("metaDataAr[description]", values.metaDataAr?.description || "");
        if ( values.metaDataAr?.keywords && values.metaDataAr.keywords.length > 0) {
          values.metaDataAr.keywords.forEach((keyword, index) => {
            formData.append(`metaDataAr[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataAr[keywords]", "");
        }
  

        editBlog({ blogId: blogId, formData },
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        thumbnail: data.thumbnail ? [{ url: data.thumbnail }] : [],
        categoryId: data.categoryId,
        isPublished:
          data.isPublished !== undefined ? String(data.isPublished) : "",
      });
      setFileList(data.thumbnail ? [{ url: data.thumbnail }] : []);
    }
  }, [data, form]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ thumbnail: fileList });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl capitalize">{t("blogs.edit")}</h1>
        <Link to={`/${MAINPATH}/${i18n.language}/blogs`}>
          <Button type="primary">
            <FastBackwardOutlined /> {t("all blog")}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title
          LabletitleAr="blog arabic title"
          LabletitleEn={"blog english title"}
        />
        <Description />
        <Slug />

        <TextEditorInput />

        <Row gutter={[16, 16]}>
          <MetaDataEn />
          <MetaDataAr />
        </Row>
        <Form.Item
          label={t("blogs.edit.labels.thumbnail")}
          name="thumbnail"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[
            {
              required: true,
              message: t("blogs.edit.labels.thumbnail") + " is required.",
            },
          ]}
        >
          <Upload listType="picture" beforeUpload={() => false} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>
              {t("blogs.edit.placeholder.EnterThumbnail")}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label={t("blogs.add.lables.isPublished")} name="isPublished">
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

        <Form.Item label={t("blogs.add.lables.categoryId")} name="categoryId">
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
        >
          {t("blogs.edit")}
        </Button>
      </Form>
    </div>
  );
};