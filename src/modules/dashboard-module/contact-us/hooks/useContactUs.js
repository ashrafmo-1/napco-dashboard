import { useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useQuery } from "react-query";
import axios from "axios";

export const useContactUs = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchContactUs = async ({ queryKey }) => {
    const [, { search, page, language }] = queryKey;
    const customFilters = {};
    const combinedFilters = { search, ...customFilters };

    const queryString = qs.stringify({ filter: combinedFilters }, { encode: false });

    const response = await axios.get(`/${language}/admin/contact-us?page=${page}&pageSize=10&${queryString}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ["contactUs", { search: searchTerm, page: currentPage, language: i18n.language }],
    fetchContactUs,
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const contactUs = data?.result?.contactUs || [];
  const pageCount = data?.pagination || {};

  return {contactUs, pageCount, setSearchTerm, error, isLoading, setCurrentPage};
};
