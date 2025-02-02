import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export const useGetSingleCertificationHook = (certificationId) => {
  const { i18n } = useTranslation();
  const fetchSingleEvents = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/certifications/edit`,
      { params: { certificationId } }
    );
    return data;
  };

  return useQuery(["certifications", certificationId], fetchSingleEvents, {
    enabled: !!certificationId,
    staleTime: 300000,
  });
};
