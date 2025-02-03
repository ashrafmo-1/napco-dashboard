import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {MAINPATH} from "../../../../constant/MAINPATH.js";

export const useAddProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addProduct = async (productData) => {
    await axios.post(`/${i18n.language}/admin/products/create`, productData, {
      config: {
        "Content-Type": "multipart/form-data"
      }
    });
  };
  
  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success("product added successfully.");
      navigate(`/${MAINPATH}/${i18n.language}/products`)
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add user.");
      }
    },
  });
  
  return {addProduct: mutation.mutate};
}