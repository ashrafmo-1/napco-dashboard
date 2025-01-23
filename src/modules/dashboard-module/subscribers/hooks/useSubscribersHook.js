import { useState } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import { useTranslation } from "react-i18next";
import axios from "axios";

const useSubscribersHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchsubscribers = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };
    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axios.get(
      `/${language}/admin/subscribers?page=${page}&pageSize=10&${queryString}`
    );
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    [
      "subscribers",
      { search: searchTerm, page: currentPage, language: i18n.language },
    ],
    fetchsubscribers,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const subscribers = data?.result?.subscribers || [];
  const pageCount = data?.pagination || {};


  return {
    subscribers,
    pageCount,
    setSearchTerm,
    error,
    isLoading,
    currentPage,
    setCurrentPage,
    refetch
  };
};

export default useSubscribersHook;
