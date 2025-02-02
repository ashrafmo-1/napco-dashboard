import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDeleteTeamHook } from "./hooks/useDeleteTeamHook.js";

export const DeleteTeam = ({ teamId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { t } = useTranslation();
  const { deleteTeam } = useDeleteTeamHook();

  return (
    <div>
      <Button
        danger
        className="del"
        onClick={() => setIsModalVisible(teamId)}
      >
        <DeleteOutlined />
      </Button>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible === teamId}
        onOk={async () => {
          setIsPending(true);
          await deleteTeam(teamId);
          setIsPending(false);
          setIsModalVisible(null);
        }}
        onCancel={() => setIsModalVisible(null)}
        confirmLoading={isPending}
      >
        <p>{t("blog.delete")}</p>
      </Modal>
    </div>
  );
};

DeleteTeam.propTypes = {
  teamId: PropTypes.number.isRequired,
};
