import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import axios from "axios";

export const useEditCareer = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const editCareer = async (careerId, values) => {
    try {
      await axios.put(`${i18n.language}/admin/careers/update?careerId=${careerId}`, values);
      queryClient.invalidateQueries("careers");
    } catch (error) {
      console.error("Error editing users:", error.response ? error.response.data : error.message);
    }
  };

  return { editCareer };
}