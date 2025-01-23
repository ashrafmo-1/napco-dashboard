import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteBlogHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(
        `/${i18n.language}/admin/blogs/delete?blogId=${blogId}`
      );
      queryClient.invalidateQueries("blogs");
      toast.success("Blog deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete blog")
    }
  };

  return { deleteBlog };
};