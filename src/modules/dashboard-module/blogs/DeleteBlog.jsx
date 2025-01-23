import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeleteBlogHook } from "./hooks/useDeleteBlogHook";
import { useTranslation } from "react-i18next";

export const DeleteBlog = ({ BlogId }) => {
  const { deleteBlog } = useDeleteBlogHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { t } = useTranslation();
  
  return (
    <div>
      <Button danger className="del" onClick={() => setIsModalVisible(BlogId)}>
        <DeleteOutlined />
      </Button>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible === BlogId}
        onOk={async () => {
          setIsPending(true);
          await deleteBlog(BlogId);
          setIsPending(false);
          setIsModalVisible(null);
        }}
        onCancel={() => setIsModalVisible(null)} confirmLoading={isPending}
      >
        <p>{t("blog.delete")}</p>
      </Modal>
    </div>
  );
};
