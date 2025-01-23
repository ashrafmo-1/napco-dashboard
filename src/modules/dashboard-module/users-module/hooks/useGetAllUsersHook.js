import { useState } from "react";
import { useTranslation } from "react-i18next";
import qs from "qs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsersHook = () => {
    const { i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusTerm, setStatusTerm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async ({ queryKey }) => {
        const { search, page, language, status } = queryKey;
        const customFilters = {
            status: status,
        };
        const combinedFilters = { search, ...customFilters };

        const queryString = qs.stringify(
            { filter: combinedFilters },
            { encode: false }
        );

        const response = await axios.get(`/${language}/admin/users?page=${page}&pageSize=10&${queryString}`);
        return response.data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: {
            query: "users",
            search: searchTerm,
            page: currentPage,
            language: i18n.language,
            status: statusTerm
        },
        queryFn: fetchUsers,
        keepPreviousData: true,
        staleTime: 5000,
    });

    const users = data?.result?.users || [];
    const pageCount = data?.pagination || {};

    return {
        pageCount,
        setSearchTerm,
        setStatusTerm,
        error,
        isLoading,
        currentPage,
        users,
        setCurrentPage,
    };
};