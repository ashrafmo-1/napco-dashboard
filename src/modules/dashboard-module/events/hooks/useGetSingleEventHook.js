import axios from 'axios';
import { useQuery } from "react-query";
import { useTranslation } from 'react-i18next';

export const useGetSingleEventHook = (eventId) => {
    const { i18n } = useTranslation();
    const fetchSingleEvents = async () => {
      const { data } = await axios.get(
        `/${i18n.language}/admin/events/edit`,
        { params: { eventId } }
      );
      return data;
    };
  
    return useQuery(["Events", eventId], fetchSingleEvents, {
      enabled: !!eventId,
      staleTime: 300000,
    });
}