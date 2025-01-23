import { useState } from "react";
import qs from "qs";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";

export const useBlogHook = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlogs = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };

    const queryString = qs.stringify(
      { filter: combinedFilters },
      { encode: false }
    );

    const response = await axios.get(
      `/${language}/admin/blogs?page=${page}&pageSize=10&${queryString}`
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    [
      "blogs",
      {
        search: searchTerm,
        page: currentPage,
        language: i18n.language,
      },
    ],
    fetchBlogs,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const blogs = data?.result?.blogs || [];
  const pageCount = data?.pagination || {};

  return {
    pageCount,
    setSearchTerm,
    setCurrentPage,
    error,
    isLoading,
    currentPage,
    blogs,
  };
};
