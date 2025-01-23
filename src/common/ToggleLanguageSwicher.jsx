import { Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ToggleLanguageSwicher = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleChangeLanguage = (newLanguage) => {
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <div>
            <Select
                className={"w-[80px]"}
                defaultValue="en"
                onChange={handleChangeLanguage}
                value={currentLanguage}
            >
                <Select.Option value={"ar"}>Arabic</Select.Option>
                <Select.Option value={"en"}>English</Select.Option>
            </Select>
        </div>
    );
};
