import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useEditProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ productCategoryId, values }) => {
      await axios.put(
        `${i18n.language}/admin/product-categories/update?productCategoryId=${productCategoryId}`,
        values
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("productsCategory");
        toast.success("User edited successfully.");
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
          toast.error(errorMessage || "Failed to edit product category.");
        }
      },
    }
  );
  return { editProductCategory: mutation.mutate };
};
