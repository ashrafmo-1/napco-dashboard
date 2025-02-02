import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useQuery} from "react-query";

export const useGeneralSettingPagesHook = ({mainSettingId}) => {
    const {i18n} = useTranslation();
    const fetchSingleUser = async () => {
        const {data} = await axios.get(`/${i18n.language}/admin/main-settings/edit`, {
                params: {mainSettingId},
            }
        );
        return data;
    };

    return useQuery(["front-pages-settings", mainSettingId], fetchSingleUser, {
        enabled: !!mainSettingId,
        staleTime: 300000,
    });
}

useGeneralSettingPagesHook.propTypes = {
    mainSettingId: PropTypes.number.isRequired,
};