import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useGetSingleMessageHook = (contactUsId) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/contact-us/edit`,
      { params: { contactUsId } }
    );
    return data;
  };

  return useQuery(["contactUs", contactUsId], fetchSingleEvents, {
    enabled: !!contactUsId,
    staleTime: 300000,
  });
};
