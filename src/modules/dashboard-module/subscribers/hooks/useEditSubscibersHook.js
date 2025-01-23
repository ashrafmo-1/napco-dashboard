import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";

const useEditSubscibersHook = () => {
    const { i18n } = useTranslation();
    const queryClient = useQueryClient();
    const editSubsciber = async (subscriberId, values) => {
      try {
        await axios.put(
          `${i18n.language}/admin/subscribers?subscriberId=${subscriberId}`,
          values
        );
        queryClient.invalidateQueries('subscribers');
      } catch (error) {
        console.error(
          "Error editing subscriber:",
          error.response ? error.response.data : error.message
        );
      }
    };
  
    return { editSubsciber };
}

export default useEditSubscibersHook