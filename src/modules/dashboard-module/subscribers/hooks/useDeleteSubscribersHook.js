import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

const useDeleteSubscribers = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteSubscribers = async (faqId) => {
    try {
      await axios.delete(
        `/${i18n.language}/admin/subscribers/delete?subscriberId=${faqId}`
      );
      queryClient.invalidateQueries("subscribers");
      toast.success("Subscriber deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete subscriber");
    }
  };

  return { deleteSubscribers };
};

export default useDeleteSubscribers;
