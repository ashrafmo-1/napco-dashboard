import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

export const useReplayMessageHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewReplay = async (contactData) => {
    await axios.post(`/${i18n.language}/admin/contact-us-messages/create`, contactData);
  };

  const mutation = useMutation(addNewReplay, {
    onSuccess: () => {
      queryClient.invalidateQueries("contactUs");
      toast.success("add contact successfully.");
    },
    onError: () => {
      toast.error("Failed to add contact.");
    },
  });

  return { 
    addNewReplay: mutation.mutate,
    isLoading: mutation.isLoading
  };
};