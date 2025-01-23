import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetSingleProduct = (productId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/products/edit`,
      {
        params: { productId },
      }
    );
    return data;
  };

  return useQuery(["products", productId], fetchSingleCustomer, {
    enabled: !!productId,
    staleTime: 300000,
  });
};
