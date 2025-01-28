import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {useDeleteCertificationHook} from "./hooks/useDeleteCertificationHook.js";

export const DeleteCertifications = ({certificationId}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { t } = useTranslation();
    const { deleteCertification } = useDeleteCertificationHook()


    return (
        <div>
            <Button danger className="del" onClick={() => setIsModalVisible(certificationId)}>
                <DeleteOutlined />
            </Button>

            <Modal
                title="Confirm Deletion"
                visible={isModalVisible === certificationId}
                onOk={async () => {
                    setIsPending(true);
                    await deleteCertification(certificationId);
                    setIsPending(false);
                    setIsModalVisible(null);
                }}
                onCancel={() => setIsModalVisible(null)} confirmLoading={isPending}
            >
                <p>{t("blog.delete")}</p>
            </Modal>
        </div>
    )
}

DeleteCertifications.propTypes = {
    certificationId: PropTypes.number.isRequired,
};