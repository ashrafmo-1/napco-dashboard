import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteProductCategoryHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProductsCategory = async (productCategoryId) => {
    try {
      await axios.delete(
        `/${i18n.language}/admin/product-categories/delete?productCategoryId=${productCategoryId}`
      );
      queryClient.invalidateQueries("productsCategory");
      toast.success("Product category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product category");
    }
  };

  return { deleteProductsCategory };
};
