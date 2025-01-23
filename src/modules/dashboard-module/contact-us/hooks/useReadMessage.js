import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useReadMessage = () => {
  const { i18n } = useTranslation();

  const markMessageAsRead = async (contactUsMessageId) => {
    const { data } = await axios.put(
      `/${i18n.language}/admin/contact-us-messages/read-message`,
      { contactUsMessageId }
    );
    return data;
  };

  const mutation = useMutation(markMessageAsRead, {
    onSuccess: (data) => {
      console.log("Message marked as read successfully:", data);
    },
    onError: (error) => {
      console.error("Error marking message as read:", error);
    },
  });

  return {
    markMessageAsRead: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};