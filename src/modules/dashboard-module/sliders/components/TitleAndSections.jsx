import { Col, Form, Input, Row, Select } from "antd";
import { useGetAllSectionsSelectHook } from "../hooks/useGetAllSectionsSelectHook";
import { useTranslation } from "react-i18next";

export const TitleAndSections = () => {
  const { selectType } = useGetAllSectionsSelectHook();
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: "title is required." }]}
        >
          <Input placeholder={t("enter title")} allowClear />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          initialValue={selectType[0]?.value}
          label={t("select section")}
          name="frontPageSectionId"
          rules={[
            {
              type: "select section",
              message: "Please enter a valid select section",
            },
          ]}
        >
          <Select mode="tags" placeholder="Enter sections">
            {selectType.map((item, index) => (
              <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

// <Select placeholder="Select role">
// {selectType.map((item, index) => (<Select.Option value={item.value} key={index}>{item.label}</Select.Option>))}
// </Select>

//                       <Form.Item
//                       label="Contact"
//                       name="contact"
//                       rules={[
//                         { required: true, message: "Please enter the portfolio contact" },
//                       ]}
//                       >

//                       </Form.Item>
