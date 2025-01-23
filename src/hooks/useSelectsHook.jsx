import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosConfig";
import {useTranslation} from "react-i18next";

export const useSelectsHook = (selectType) => {
    const [type, setType] = useState([]);
    const {i18n} = useTranslation();
    const getSelect = async () => {
        try {
            const response = await axiosInstance.get(`/${i18n.language}/admin/selects?allSelects=roles`);
            setType(response.data[0].options);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSelect();
    }, []);

    return {type};
};