import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeleteCareer = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const deleteCareer = async (careerId) => {
    try {
      await axios.delete(
        `/${i18n.language}/admin/careers/delete?careerId=${careerId}`
      );
      queryClient.invalidateQueries("careers");
      toast.success("Career deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete career")
    }
  };


  return {deleteCareer};
};
