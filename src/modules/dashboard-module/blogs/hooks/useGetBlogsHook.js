import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetBlogsHook = (blogId) => {
  const { i18n } = useTranslation();
  const fetchSingleCustomer = async () => {
    const { data } = await axios.get(`/${i18n.language}/admin/blogs/edit`, {
      params: { blogId },
    });
    return data;
  };

  return useQuery(["blogs", blogId], fetchSingleCustomer, {
    enabled: !!blogId,
    staleTime: 300000,
  });
};
