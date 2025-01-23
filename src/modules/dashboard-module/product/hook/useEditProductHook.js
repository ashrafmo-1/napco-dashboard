import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {MAINPATH} from "../../../../constant/MAINPATH.js";

export const useEditProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    async ({ productId, values }) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      for (const [key, value] of values.entries()) {
        formData.append(key, value);
      }
      await axios.post(
        `${i18n.language}/admin/products/update?productId=${productId}`,
        formData
      );
    },
    {
      onSuccess: () => {
        toast.success("Product updated successfully.");
        queryClient.invalidateQueries("products");
        navigate(`/${MAINPATH}/${i18n.language}/products`);
      },
      onError: (error) => {
        console.error(
          "Error editing product:",
          error.response ? error.response.data : error.message
        );
      },
    }
  );

  return { editProduct: mutation.mutate };
};
