import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export const useGetSingleTeamHook = (companyTeamId) => {
  const { i18n } = useTranslation();
  const fetchSingleTeam = async () => {
    const { data } = await axios.get(
      `/${i18n.language}/admin/company-teams/edit`,
      { params: { companyTeamId } }
    );
    return data;
  };

  return useQuery(["teams", companyTeamId], fetchSingleTeam, {
    enabled: !!companyTeamId,
    staleTime: 300000,
  });
};
