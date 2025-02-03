import {useTranslation} from "react-i18next";
import {useState} from "react";
import qs from "qs";
import axios from "axios";
import {useQuery} from "react-query";

export const useSliderHook = () => {
    const { i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSlider = async ({ queryKey }) => {
        const [, { search, page, language }] = queryKey;
        const customFilters = {};
        const combinedFilters = { search, ...customFilters };

        const queryString = qs.stringify(
            { filters: combinedFilters },
            { encode: false }
        );

        const response = await axios.get(`/${language}/admin/sliders?page=${page}&pageSize=10&${queryString}`);
        return response.data;
    };

    const { data, error, isLoading } = useQuery(
        [
            "sliders",
            {
                search: searchTerm,
                page: currentPage,
                language: i18n.language,
            },
        ],
        fetchSlider,
        {
            keepPreviousData: true,
            staleTime: 5000,
        }
    );

    const sliders = data?.result?.sliders || [];
    const pageCount = data?.pagination || {};

    return {
        pageCount,
        setSearchTerm,
        setCurrentPage,
        error,
        isLoading,
        currentPage,
        sliders,
    };
}
