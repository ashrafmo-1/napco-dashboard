import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useAddNewBlogCategory = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewBlogCategories = async (blogData) => {
    await axios.post(`/${i18n.language}/admin/blog-categories/create`, blogData);
  };

  const mutation = useMutation(addNewBlogCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries("blog-categories");
      toast.success("add blog successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add blog category.");
      }
    },
  });

  return { addNewBlogCategories: mutation.mutate };
};
