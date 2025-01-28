import {useTranslation} from "react-i18next";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useEditCertificationHook = () => {
    const {i18n} = useTranslation();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async ({certificationId, formData}) => {
            const url = `${i18n.language}/admin/certifications/update?certificationId=${certificationId}`;
            const response = await axios.post(url, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("certifications");
                toast.success("Edited successfully.");
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message;
                if (typeof errorMessage === "object") {
                    Object.entries(errorMessage).forEach(([field, messages]) => {
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

    return {editCertification: mutation.mutate};
};