import { DeleteFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import {useDeleteEventHook} from "./hooks/deleteEventHook.js";

export const DeleteEvent = ({ eventId }) => {
    const { deleteEvent } = useDeleteEventHook();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setLoading(true);
        await deleteEvent(eventId);
        setLoading(false);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button onClick={showModal} danger>
                <DeleteFilled/>
            </Button>
            <Modal
                title="Confirm Deletion"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <p>Are you sure you want to delete this Event?</p>
            </Modal>
        </div>
    )

}