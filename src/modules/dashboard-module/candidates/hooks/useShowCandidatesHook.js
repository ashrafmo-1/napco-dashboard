import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";

export const useShowCandidatesHook = (candidateId) => {
  const { i18n } = useTranslation();

  const fetchCandidates = async ({ queryKey }) => {
    const [language, id] = queryKey;
    const response = await axios.get(`/${language}/admin/candidates/edit?candidateId=${id}`);
    return response;
  };
  
  const { data = { result: { candidates: [] } }, error, isLoading } = useQuery(
    [i18n.language, candidateId],
    fetchCandidates,
    {
      enabled: !!candidateId,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );


  const candidates = data;

  return { candidates, error, isLoading };
};