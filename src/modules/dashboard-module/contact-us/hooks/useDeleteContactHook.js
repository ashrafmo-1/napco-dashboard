import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteContactHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (ContactUSID) => {
    try {
      await axios.delete(`/${i18n.language}/admin/contact-us/delete?contactUsId=${ContactUSID}`);
      queryClient.invalidateQueries("contactUs");
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete contact");
    }
  };

  return { deleteBlog };
};