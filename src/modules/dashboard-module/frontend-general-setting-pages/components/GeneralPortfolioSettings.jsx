import { useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGeneralSettingPagesHook } from "../hooks/useGeneralSettingsPortfolioHook.js";
import { useEditGeneralSettingsPortfolio } from "../hooks/useEditGeneralSettingsPortfolio.js";
import { toast } from "react-toastify";

export const GeneralPortfolioSettings = () => {
  const { data } = useGeneralSettingPagesHook("1");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { editGeneralSettingsPortfolio } = useEditGeneralSettingsPortfolio();

  const handleSubmit = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        const { logo, favicon, ...restValues } = values;

        const formData = new FormData();
        formData.append("content", JSON.stringify(restValues));

        if (logo?.[0]?.originFileObj) {
          formData.append("logo", logo[0].originFileObj);
        } else {
          formData.append("logo", "");
        }

        if (favicon?.[0]?.originFileObj) {
          formData.append("favicon", favicon[0].originFileObj);
        } else {
          formData.append("favicon", "");
        }

        editGeneralSettingsPortfolio(
          { values: formData },
          {
            onSuccess: () => {
              setLoading(false);
              toast.success("Portfolio settings updated successfully!");
            },
            onError: (error) => {
              setLoading(false);
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
              setLoading(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setLoading(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  console.log(data);
  useEffect(() => {
    if (data) {
      console.log();
      let newData;
      try {
        newData = JSON.parse(data.data.content);
      } catch (e) {
        console.error("Invalid JSON data:", e);
        newData = {};
      }
      form.setFieldsValue({
        title: newData?.title,
        description: newData.description,
        address: newData.address || [],
        contact: newData.contact || [],
        socialMedia: {
          facebook: newData.socialMedia?.facebook || "",
          instagram: newData.socialMedia?.instagram || "",
          linkedin: newData.socialMedia?.linkedin || "",
          youtube: newData.socialMedia?.youtube || "",
          x: newData.socialMedia?.x || "",
        },
        logo: data?.data?.logo
          ? [
              {
                uid: "-1",
                name: "logo.png",
                status: "done",
                url: data?.data?.logo,
              },
            ]
          : [],
        favicon: data?.data?.favicon
          ? [
              {
                uid: "-2",
                name: "favicon.ico",
                status: "done",
                url: data?.data?.favicon,
              },
            ]
          : [],
      });
    }
  }, [data, form]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Portfolio Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the portfolio title" },
          ]}
        >
          <Input placeholder="Enter portfolio title" />
        </Form.Item>

        <Form.Item
          label="Portfolio Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the portfolio description",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter portfolio description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please enter the portfolio address" },
          ]}
        >
          <Select mode="tags" placeholder="Enter portfolio address">
            {data?.data?.content?.address?.map((address, index) => (
              <Select.Option key={index} value={address}>
                {address}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            { required: true, message: "Please enter the portfolio contact" },
          ]}
        >
          <Select mode="tags" placeholder="Enter portfolio contact">
            {data?.data?.content?.contact?.map((contact, index) => (
              <Select.Option key={index} value={contact}>
                {contact}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Facebook URL"
          name={["socialMedia", "facebook"]}
          rules={[{ required: true, message: "Please enter Facebook URL" }]}
        >
          <Input placeholder="Facebook URL" />
        </Form.Item>

        <Form.Item
          label="Instagram URL"
          name={["socialMedia", "instagram"]}
          rules={[{ required: true, message: "Please enter Instagram URL" }]}
        >
          <Input placeholder="Instagram URL" />
        </Form.Item>

        <Form.Item
          label="LinkedIn URL"
          name={["socialMedia", "linkedin"]}
          rules={[{ required: true, message: "Please enter LinkedIn URL" }]}
        >
          <Input placeholder="LinkedIn URL" />
        </Form.Item>

        <Form.Item
          label="YouTube URL"
          name={["socialMedia", "youtube"]}
          rules={[{ required: true, message: "Please enter YouTube URL" }]}
        >
          <Input placeholder="YouTube URL" />
        </Form.Item>

        <Form.Item
          label="X URL"
          name={["socialMedia", "x"]}
          rules={[{ required: true, message: "Please enter x URL" }]}
        >
          <Input placeholder="X URL" />
        </Form.Item>

        <div className="flex gap-8">
          <Form.Item
            label={"logo"}
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              {
                required: true,
                message: "logo is required.",
              },
            ]}
          >
            <Upload listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>{"edit"}</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            className="w-[200px]"
            label="Upload Favicon"
            name="favicon"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              name="favicon"
              listType="picture"
              maxCount={1}
              accept=".ico"
              // onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
