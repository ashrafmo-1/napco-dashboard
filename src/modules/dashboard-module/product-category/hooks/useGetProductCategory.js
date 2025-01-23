import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetProductCategory = (productCategoryId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/product-categories/edit`,
      {
        params: { productCategoryId },
      }
    );
    return data;
  };

  return useQuery(
    ["productsCategory", productCategoryId],
    fetchSingleCustomer,
    {
      enabled: !!productCategoryId,
      staleTime: 300000,
    }
  );
};
