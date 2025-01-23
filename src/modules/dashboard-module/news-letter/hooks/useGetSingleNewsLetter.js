import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetSingleNewsLetter = (newsletterId) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/newsletters/edit`,
      { params: { newsletterId } }
    );
    return data;
  };

  return useQuery(["newsletters", newsletterId], fetchSingleEvents, {
    enabled: !!newsletterId,
    staleTime: 300000,
  });
};