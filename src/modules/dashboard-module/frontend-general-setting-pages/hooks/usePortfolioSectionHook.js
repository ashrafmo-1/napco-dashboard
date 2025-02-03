import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";

export const usePortfolioSectionHook = (frontPageId) => {
  const { i18n } = useTranslation();

  const fetchSingleCustomer = async () => {
    const { data } = await axios.get(
      `${i18n.language}/admin/front-page-sections`,
      { params: { frontPageId } }
    );

    return data;
  };

  return useQuery(["PortfolioPages", frontPageId], fetchSingleCustomer, {
    enabled: !!frontPageId,
    staleTime: 300000,
    onError: (error) => {
      console.error("Error fetching portfolio section data:", error);
    },
  });
};