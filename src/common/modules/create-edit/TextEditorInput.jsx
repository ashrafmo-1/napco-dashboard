import { Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

export const TextEditorInput = () => {
  const form = Form.useFormInstance();
  const { t } = useTranslation();
  return (
    <div>
      <Form.Item label={t("products.add.lables.ContentEN")} name="contentEn" className="mb-16" rules={[{ required: true, message: t("value") + " is required." }]}>
        <ReactQuill className="h-60" theme="snow" placeholder={t("products.add.placeholder.EnterContentEN")}
          onChange={(value) => { form.setFieldValue("contentEn", value)}} />
      </Form.Item>

      <Form.Item label={t("products.add.lables.ContentAR")} name="contentAr" className="mb-16" rules={[{required: true, message: t("value") + " is required."}]}>
        <ReactQuill className="h-60" theme="snow" placeholder={t("products.add.placeholder.EnterContentAR")}
          onChange={(value) => { form.setFieldValue("contentAr", value) }}
        />
      </Form.Item>
    </div>
  );
};
