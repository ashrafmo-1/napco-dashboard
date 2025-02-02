import {  useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useQuery } from "react-query";
import axios from "axios";

export const useEventsHook = () => {
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
            `/${language}/admin/events?page=${page}&pageSize=10&${queryString}`
        );
        return response.data;
    };

    const { data, error, isLoading } = useQuery(
        [
            "events",
            {
                search: searchTerm,
                page: currentPage,
                language: i18n.language,
            },
        ],
        fetchFaqs, { keepPreviousData: true, staleTime: 5000 }
    );

    const events = data?.result?.events || [];
    const pageCount = data?.pagination || {};

    return {
        pageCount,
        setSearchTerm,
        error,
        isLoading,
        currentPage,
        events,
        setCurrentPage,
    };
};
