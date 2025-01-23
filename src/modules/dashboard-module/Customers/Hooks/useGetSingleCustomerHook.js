import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetSingleCustomerHook = (customerId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/customers/edit`,
      {
        params: { customerId },
      }
    );
    return data;
  };

  return useQuery(["customers", customerId], fetchSingleCustomer, {
    enabled: !!customerId,
    staleTime: 300000,
  });
};