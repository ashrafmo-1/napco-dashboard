import {useTranslation} from "react-i18next";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {toast} from "react-toastify";

export  const useAddNewEventHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();

    const addNewEvent = async (eventsData) => {
        await axios.post(`/${i18n.language}/admin/events/create`, eventsData);
    };

    const mutation = useMutation(addNewEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries("events");
            toast.success("add customer successfully.");
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
                for (const [field, messages] of Object.entries(errorMessage)) {
                    messages.forEach((msg) => {
                        toast.error(msg);
                    });
                }
            }
        },
    });

    return {addNewEvent: mutation.mutate};
}