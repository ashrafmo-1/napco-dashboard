import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const useSingleSliderHook = (slideId) => {
  const { i18n } = useTranslation();
  const fetchSingleSlider = async () => {
    const { data } = await axios.get(`/${i18n.language}/admin/sliders/edit`, { params: { slideId }});
    return data;
  };

  return useQuery(["sliders", slideId], fetchSingleSlider, {
    enabled: !!slideId,
    staleTime: 300000,
  });
};
