import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteuser = async (userId) => {
    try {
      await axios.delete(
        `/${i18n.language}/admin/users/delete?userId=${userId}`
      );
      queryClient.invalidateQueries("users");
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete user.");
      console.log(error);
    }
  };

  return { deleteuser };
};