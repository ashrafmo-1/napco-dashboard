import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetBlogCategoryHook = (blogCategoryId) => {
  const { i18n } = useTranslation();
  const fetchBlogCategory = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/blog-categories/edit`,
      {
        params: { blogCategoryId },
      }
    );
    return data;
  };

  return useQuery(["blog-categories", blogCategoryId], fetchBlogCategory, {
    enabled: !!blogCategoryId,
    staleTime: 300000,
  });
};
