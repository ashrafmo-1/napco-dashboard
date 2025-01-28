import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useQuery} from "react-query";

export const useGeneralSettingPages = ({mainSettingId}) => {
    const {i18n} = useTranslation();
    const fetchSingleUser = async () => {
        const {data} = await axios.get(`/${i18n.language}/admin/main-settings/edit`, {
                params: {mainSettingId},
            }
        );
        return data;
    };

    return useQuery(["users", mainSettingId], fetchSingleUser, {
        enabled: !!mainSettingId,
        staleTime: 300000,
    });
}

useGeneralSettingPages.propTypes = {
    mainSettingId: PropTypes.number.isRequired,
};