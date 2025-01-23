import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetSingleUserHook = (userId) => {
  const { i18n } = useTranslation();
  const fetchSingleUser = async () => {
    const { data } = await axios.get(`/${i18n.language}/admin/users/edit`, {
      params: { userId },
    });
    return data;
  };

  return useQuery(["users", userId], fetchSingleUser, {
    enabled: !!userId,
    staleTime: 300000,
  });
};
