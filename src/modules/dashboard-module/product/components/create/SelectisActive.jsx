import {Form, Select} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

export const SelectisActive = () => {
    const {t} = useTranslation();

    return (
        <Form.Item label="is active" name="isActive" rules={[
            {
                required: true,
                message:
                    t("value") + " is required.",
            },
        ]}>
            <Select placeholder="Select status">
                <Select.Option value="1">
                    <div className="flex items-center gap-1">
                        <span className="bg-green-600 p-1 rounded-full"></span>
                        <span>{t("globals.status.active")}</span>
                    </div>
                </Select.Option>
                <Select.Option value="0">
                    <div className="flex items-center gap-1">
                        <span className="bg-red-600 p-1 rounded-full"></span>
                        <span>{t("globals.status.inActive")}</span>
                    </div>
                </Select.Option>
            </Select>
        </Form.Item>
    );
};
