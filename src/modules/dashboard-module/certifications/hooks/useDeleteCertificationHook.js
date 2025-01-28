import {useTranslation} from "react-i18next";
import {useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useDeleteCertificationHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();

    const deleteCertification = async (certificationId) => {
        try {
            await axios.delete(
                `/${i18n.language}/admin/certifications/delete?certificationId=${certificationId}`
            );
            queryClient.invalidateQueries("certifications");
            toast.success("deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete certification")
        }
    };

    return { deleteCertification };
}