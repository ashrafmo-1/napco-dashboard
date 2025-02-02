import {useTranslation} from "react-i18next";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useEditTeamsHook = () => {
    const {i18n} = useTranslation();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async ({companyTeamId, formData}) => {
            const url = `${i18n.language}/admin/company-teams/update?companyTeamId=${companyTeamId}`;
            const response = await axios.post(url, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("teams");
                toast.success("Edited successfully.");
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message;
                if (typeof errorMessage === "object") {
                    Object.entries(errorMessage).forEach(([messages]) => {
                        messages.forEach((msg) => {
                            toast.error(msg);
                        });
                    });
                } else {
                    toast.error(errorMessage || "Failed to edit certification.");
                }
            },
        }
    );

    return {editTeam: mutation.mutate};
};