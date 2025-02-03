import { useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useQuery } from "react-query";
import axios from "axios";

export const useShowPgaesHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPortfolioPages = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };

    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axios.get(`${language}/admin/front-pages?page=${page}&pageSize=10&${queryString}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    [
      "PortfolioPages",
      {
        search: searchTerm,
        page: currentPage,
        language: i18n.language,
      },
    ],
    fetchPortfolioPages,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const PortfolioPages = data?.result?.frontPages || [];
  const pageCount = data?.pagination || {};

  return { PortfolioPages, error, isLoading, pageCount, setCurrentPage, setSearchTerm };
};