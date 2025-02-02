import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteEventHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(
                `/${i18n.language}/admin/events/delete?eventId=${eventId}`
            );
            queryClient.invalidateQueries("events");
            toast.success(i18n.t("event delete success"));
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteEvent };
}