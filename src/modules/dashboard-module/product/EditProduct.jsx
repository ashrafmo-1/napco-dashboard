import { Button, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { UploadImages } from "./components/create/UploadImages";
import { SelectisActive } from "./components/create/SelectisActive";
import { useTranslation } from "react-i18next";
import { useEditProductHook } from "./hook/useEditProductHook";
import { useGetSingleProduct } from "./hook/useGetSingleProduct";
import { BackwardFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MAINPATH } from "../../../constant/MAINPATH.js";
import { InputName } from "./components/create/InputName.jsx";
// import { Description } from "../../../common/modules/create-edit/Description.jsx";
import { TextEditorInput } from "../../../common/modules/create-edit/TextEditorInput.jsx";
import { Slug } from "../all-careers/components/Slug.jsx";
import { MetaDataEn } from "../../../common/modules/create-edit/MetaDataEn.jsx";
import { MetaDataAr } from "../../../common/modules/create-edit/MetaDataAr.jsx";
import TextArea from "antd/es/input/TextArea.js";
import { useProductsCategoryHook } from "../product-category/hooks/useProductsCategoryHook.js";

const EditProduct = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const { editProduct } = useEditProductHook();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleProduct(productId);
  const { productCategories } = useProductsCategoryHook();

  const handleSubmit = async () => {
    setIsPending(true);
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            if (value && value.length > 0) {
              value.forEach((file, index) => {
                if (file.originFileObj) {
                  formData.append(`images[${index}][path]`, file.originFileObj);
                } else {
                  formData.append(`images[${index}][path]`, file.path);
                }
              });
            }
          } else {
            formData.append(key, value);
          }
        });

        formData.append("metaDataEn[title]", values.metaDataEn?.title || "");
        formData.append(
          "metaDataEn[description]",
          values.metaDataEn?.description || ""
        );
        if (
          values.metaDataEn?.keywords &&
          values.metaDataEn.keywords.length > 0
        ) {
          values.metaDataEn.keywords.forEach((keyword, index) => {
            formData.append(`metaDataEn[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataEn[keywords]", "");
        }
        formData.append("metaDataAr[title]", values.metaDataAr?.title || "");
        formData.append(
          "metaDataAr[description]",
          values.metaDataAr?.description || ""
        );
        if (
          values.metaDataAr?.keywords &&
          values.metaDataAr.keywords.length > 0
        ) {
          values.metaDataAr.keywords.forEach((keyword, index) => {
            formData.append(`metaDataAr[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataAr[keywords]", "");
        }

        editProduct(
          { productId, values: formData },
          {
            onSuccess: () => {
              setIsPending(false);
              toast.success("Product updated successfully!");
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
      data.images.forEach((image) => {
        console.log(image);
      });

      form.setFieldsValue({
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        contentEn: data.contentEn,
        contentAr: data.contentAr,
        slugEn: data.slugEn,
        slugAr: data.slugAr,
        metaDataEn: data.metaDataEn,
        metaDataAr: data.metaDataAr,
        productCategoryId: data.productCategoryId,
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
        images: data?.images?.map((image) => ({
          uid: image.imageId,
          name: image.path.split("/").pop(),
          status: "done",
          url: image.path,
          imageId: image.imageId,
          path: image.path,
        })),
      });
    }
  }, [data, form]);

  return (
    <div className="edit-product-page">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl capitalize">{t("globals.edit")} Product</h1>
        <Link to={`/${MAINPATH}/${i18n.language}/products`}>
          <Button type="primary">
            <BackwardFilled />
            {"all products"}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <InputName />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label={t("products.add.lables.DescriptoinEN")}
              name="descriptionEn"
              rules={[]}
            >
              <TextArea
                placeholder={t("products.add.placeholder.EnterDescriptoinEN")}
                autoSize={{ minRows: 6 }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t("products.add.lables.DescriptoinAR")}
              name="descriptionAr"
              rules={[]}
            >
              <TextArea
                placeholder={t("products.add.placeholder.EnterDescriptoinAR")}
                autoSize={{ minRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <TextEditorInput />
        <Slug />

        <Row gutter={[16, 16]}>
          <MetaDataEn
            value={form.getFieldValue("metaDataEn")}
            onChange={(updatedValue) =>
              form.setFieldsValue({ metaDataEn: updatedValue })
            }
          />
          <MetaDataAr />
        </Row>

        <UploadImages isEdit={true} />

        <SelectisActive />
        {/* <product category /> */}
        <Form.Item
          label="product category"
          name="productCategoryId"
          rules={[{ required: true, message: t("value") + " is required." }]}
        >
          <Select placeholder="Select status">
            {productCategories.map((product, index) => (
              <Select.Option value={product.productCategoryId} key={index}>
                {product.name}
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
          {t("globals.edit")}
        </Button>
      </Form>
    </div>
  );
};

export default EditProduct;
