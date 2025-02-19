import {useTranslation} from "react-i18next";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useAddNewCertifications = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();


    const addNewCertifications = async (blogData) => {
        await axios.post(`/${i18n.language}/admin/certifications/create`, blogData);
    };

    const mutation = useMutation(addNewCertifications, {
        onSuccess: () => {
            queryClient.invalidateQueries("certifications");
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
                for (const [messages] of Object.entries(errorMessage)) {
                    messages.forEach((msg) => {
                        toast.error(msg);
                    });
                }
            } else {
                toast.error(errorMessage || "Failed to add certification.");
            }
        },
    });

    return { addNewCertifications: mutation.mutate };
}