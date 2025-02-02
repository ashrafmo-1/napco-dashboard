import {useTranslation} from "react-i18next";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useAddNewTeamHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();


    const addNewTeam = async (teamData) => {
        await axios.post(`/${i18n.language}/admin/company-teams/create`, teamData);
    };

    const mutation = useMutation(addNewTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries("teams");

            toast.success("add blog successfully.");
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
                for (const [field, messages] of Object.entries(errorMessage)) {
                    messages.forEach((msg) => {
                        toast.error(msg);
                    });
                }
            } else {
                toast.error(errorMessage || "Failed to add certification.");
            }
        },
    });

    return { addNewTeam: mutation.mutate };
}