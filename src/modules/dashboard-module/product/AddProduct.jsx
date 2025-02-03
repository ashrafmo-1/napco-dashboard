import { useState, useCallback } from "react";
import { Button, Form, Row } from "antd";
import { useAddProductHook } from "./hook/useAddProductHook";
import { UploadImages } from "./components/create/UploadImages";
import { SelectisActive } from "./components/create/SelectisActive";
import { useTranslation } from "react-i18next";
import { BackwardFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {MAINPATH} from "../../../constant/MAINPATH.js";
import {InputName} from "./components/create/InputName.jsx";
import {Description} from "../../../common/modules/create-edit/Description.jsx";
import {TextEditorInput} from "../../../common/modules/create-edit/TextEditorInput.jsx";
import {Slug} from "../all-careers/components/Slug.jsx";
import {MetaDataEn} from "../../../common/modules/create-edit/MetaDataEn.jsx";
import {MetaDataAr} from "../../../common/modules/create-edit/MetaDataAr.jsx";

const AddProduct = () => {
  const { t, i18n } = useTranslation();
  const { addProduct } = useAddProductHook();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(() => {
    setIsPending(true);
    form.validateFields().then(async (form_data) => {
        const formData = new FormData();

        if (form_data.images.fileList && form_data.images.fileList.length > 0) {
          form_data.images.fileList.forEach((image, index) => {
            formData.append(`images[${index}][path]`, image.originFileObj);
          });
        } else {
          formData.append("images", "");
        }

        formData.append("nameEn", form_data.nameEn || "");
        formData.append("nameAr", form_data.nameAr || "");
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

        formData.append("isActive", form_data.isActive ? 1 : 0);

        addProduct(formData, {
          onSuccess: () => {
            setIsPending(false);
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              for (const [field, messages] of Object.entries(errorMessage)) {
                messages.forEach((msg) => {
                  console.error(`${field}: ${msg}`);
                });
              }
            } else {
              setIsPending(false);
              toast.error(
                errorMessage || "Failed to send form. Please try again."
              );
            }
          },
        });
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
  }, [addProduct, form]);

  return (
    <div className="add-product-page">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl capitalize">
          {t("products.add.title")} new product
        </h1>
        <Link to={`/${MAINPATH}/${i18n.language}/products`}>
          <Button type="primary">
            <BackwardFilled />
            all products
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <InputName />
        <Description />
        <TextEditorInput />
        <Slug />

        <Row gutter={[16, 16]}>
          <MetaDataEn />
          <MetaDataAr />
        </Row>

        <UploadImages />
        <SelectisActive />
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          disabled={isPending}
          className="mb-10"
        >
          {isPending ? t("loading") : t("products.add.title")}
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
