import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

const useDeleteNewsLetterHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteNewsletter = async (newsletterId) => {
    try {
      await axios.delete(`/${i18n.language}/admin/newsletters/delete?newsletterId=${newsletterId}`);
      queryClient.invalidateQueries('newsletters');
      toast.success("Newsletter deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete newsletter");
    }
  };

  return { deleteNewsletter };
};

export default useDeleteNewsLetterHook;