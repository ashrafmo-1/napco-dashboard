import {useTranslation} from "react-i18next";
import {useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export const useDeleteSliderHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();

    const deleteSlider = async (slideId) => {
        try {
            await axios.delete(`/${i18n.language}/admin/sliders/delete?slideId=${slideId}`);
            queryClient.invalidateQueries("sliders");
            toast.success("deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete sliders.");
        }
    };

    return { deleteSlider };
}