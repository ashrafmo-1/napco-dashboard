import React from "react";
import { Button, Typography, Space, Tooltip } from "antd";
import { FilePdfOutlined } from "@ant-design/icons"; // استيراد الأيقونة المناسبة

const { Link } = Typography;

const CandidateRow = ({ candidate }) => {
  return (
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >
      {candidate.cv ? (
        <Tooltip title="Click to view or download the CV">
          <Space align="center">
            <FilePdfOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />{" "}
            {/* الشعار */}
            <Link
              href={candidate.cv} // رابط ملف الـ PDF
              target="_blank" // فتح الرابط في نافذة جديدة
              rel="noopener noreferrer" // أمان إضافي
            >
              <Button type="link" style={{ color: "#1890ff", padding: 0 }}>
                View CV (PDF)
              </Button>
            </Link>
          </Space>
        </Tooltip>
      ) : (
        <Tooltip title="No CV available">
          <span style={{ color: "#a9a9a9" }}>No CV available</span>
        </Tooltip>
      )}
    </th>
  );
};

export default CandidateRow;