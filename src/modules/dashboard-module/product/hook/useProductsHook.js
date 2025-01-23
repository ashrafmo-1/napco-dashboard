import { useState } from "react";
import { useQuery } from "react-query";
import qs from "qs";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useProductsHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFaqs = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };
    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axios.get(
      `/${language}/admin/products?page=${page}&pageSize=10&${queryString}`
    );
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    [
      "products",
      { search: searchTerm, page: currentPage, language: i18n.language },
    ],
    fetchFaqs,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const products = data?.result?.products || [];
  const pageCount = data?.pagination || {};

  return {
    products,
    pageCount,
    setSearchTerm,
    error,
    isLoading,
    currentPage,
    setCurrentPage,
    refetch,
  };
};