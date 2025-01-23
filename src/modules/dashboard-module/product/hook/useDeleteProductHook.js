import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteProductHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProducts = async (faqId) => {
    try {
      await axios.delete(`/${i18n.language}/admin/products/delete?productId=${faqId}`);
      queryClient.invalidateQueries('products');
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return { deleteProducts };
};