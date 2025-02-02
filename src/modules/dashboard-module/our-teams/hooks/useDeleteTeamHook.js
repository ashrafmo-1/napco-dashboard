import {useTranslation} from "react-i18next";
import {useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useDeleteTeamHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();

    const deleteTeam = async (companyTeamId) => {
        try {
            await axios.delete(
                `/${i18n.language}/admin/company-teams/delete?companyTeamId=${companyTeamId}`
            );
            queryClient.invalidateQueries("teams");
            toast.success("deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete team")
        }
    };

    return { deleteTeam };
}