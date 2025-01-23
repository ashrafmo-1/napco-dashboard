import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useEditBolgCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ blogCategoryId, values }) => {
      await axios.put(`${i18n.language}/admin/blog-categories/update?blogCategoryId=${blogCategoryId}`, values );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("blog-categories");
        toast.success("blog category edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              console.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Failed to edit blog category.");
        }
      },
    }
  );

  return { editblogCategory: mutation.mutate };
};