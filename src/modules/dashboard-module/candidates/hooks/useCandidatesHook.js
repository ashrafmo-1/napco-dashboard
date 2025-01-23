import { useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useQuery } from "react-query";
import axios from "axios";

export const useCandidatesHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCandidates = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };
    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axios.get(`/${language}/admin/candidates?page=${page}&pageSize=10&${queryString}`);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    [
      "candidates",
      { search: searchTerm, page: currentPage, language: i18n.language },
    ],
    fetchCandidates,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const candidates = data?.result?.candidates || [];
  const pageCount = data?.pagination || {};

  return {
    pageCount,
    setSearchTerm,
    error,
    isLoading,
    currentPage,
    candidates,
    setCurrentPage,
    refetch,
  };
};
